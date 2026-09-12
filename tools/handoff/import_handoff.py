#!/usr/bin/env python3
"""One-time, source-read-only import. Run only into an empty destination tree.

The private key is required to reproduce the same opaque participant codes.
Never place the key, raw exports, or a re-identification crosswalk in Git.
See docs/handoff/PRIVACY_REVIEW.md before reusing this import-specific policy.
"""
import argparse
import csv
import hashlib
import hmac
import io
import json
import re
from pathlib import Path

ROUTES = {
    'CURRENT/01_study1_causal_chains_verbal': 'current/study1_baseline_causal_chains',
    'CURRENT/02_study2_causal_chains_intention_verbal': 'current/study2_intention_causal_chains',
    'CURRENT/03_single_cause_verbal': 'current/single_cause',
    'CURRENT/04_study3_nonverbal_looking_time': 'current/study3_nonverbal_looking_time',
    'PREVIOUS_ARCHIVE/study1_verbal_archive': 'archive/study1_verbal',
    'PREVIOUS_ARCHIVE/study2_verbal_archive': 'archive/study2_verbal',
    'PREVIOUS_ARCHIVE/study3_nonverbal_archive/04_non_verbal_single_cause_standalone_pilot': 'archive/single_cause/nonverbal_standalone_pilot',
    'PREVIOUS_ARCHIVE/study3_nonverbal_archive': 'archive/study3_nonverbal',
    'PREVIOUS_ARCHIVE/adult_pilot_early_handcoded': 'archive/adult_pilot_early_handcoded',
    'reference_literature': 'reference_literature',
    'presentation_assets_conference_talk': 'presentation_assets_conference_talk',
    'README.md': 'docs/handoff/source/README.md',
    '.gitignore': 'docs/handoff/source/original.gitignore',
}
UUID = re.compile(r'\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b')
TEXT = {'.py', '.sh', '.sbatch', '.js', '.html', '.md', '.txt', '.json', ''}
ID_FIELDS = {'workerid', 'Response UUID', 'ParticipantID', 'uuid', 'response_id', 'participant_hashed_id', 'child_hashed_id', 'participant_id'}
VIDEO_FIELDS = {'Video Filename', 'Annotation File'}


def sha(data):
    return hashlib.sha256(data).hexdigest()


def route(rel):
    for src, dst in sorted(ROUTES.items(), key=lambda x: -len(x[0])):
        if rel == src or rel.startswith(src + '/'):
            result = dst + rel[len(src):]
            if rel.startswith('CURRENT/') and result.endswith('/README.md') and len(Path(rel).parts) == 3:
                result = result[:-9] + 'HANDOFF_README.md'
            return result.replace('/data/raw_data/', '/data/analysis_data/')
    raise ValueError(f'Unmapped source: {rel}')


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--source', type=Path, required=True)
    ap.add_argument('--target', type=Path, required=True)
    ap.add_argument('--private-key', type=Path, required=True)
    args = ap.parse_args()
    source, target = args.source.resolve(), args.target.resolve()
    assert source != target and source not in target.parents
    key = args.private_key.read_bytes()
    assert len(key) >= 32
    files = [p for p in sorted(source.rglob('*')) if p.is_file() and '.git' not in p.relative_to(source).parts]
    assert not any(p.is_symlink() for p in source.rglob('*')), 'Symlinks require manual review'

    def code(value, namespace='id'):
        if not value:
            return value
        # Opaque HMAC values, never an unsalted hash of a platform ID.
        return 'cv_' + hmac.new(key, (namespace + ':' + str(value)).encode(), hashlib.sha256).hexdigest()[:16]

    uuid_values = set()
    video_names = set()
    for p in files:
        uuid_values.update(UUID.findall(p.name))
        if p.suffix == '.csv':
            for row in csv.DictReader(p.open(newline='', encoding='utf8')):
                for k, v in row.items():
                    if v and k in ID_FIELDS:
                        uuid_values.update(UUID.findall(v))
                    if v and k in VIDEO_FIELDS:
                        video_names.add(Path(v).name)
                        uuid_values.update(UUID.findall(v))

    uuid_map = {v: code(v) for v in uuid_values}
    short_map = {v[:8]: code(v) for v in uuid_values}
    name_map = {}
    for name in video_names:
        stem = Path(name).stem
        safe_stem = code(stem, 'recording')
        name_map[name] = safe_stem + Path(name).suffix
        name_map[stem + '.txt'] = safe_stem + '.txt'
    # Full/cropped frame outputs can include recordings absent from a summary.
    for p in files:
        if p.suffix == '.txt' and 'icatcher_output' in str(p):
            name_map.setdefault(p.name, code(p.stem, 'recording') + '.txt')

    def sanitize_text(t):
        for v, replacement in uuid_map.items():
            t = t.replace(v, replacement)
        # A few historical processing examples use truncated actual IDs.
        for v, replacement in short_map.items():
            t = re.sub(r'\b' + re.escape(v) + r'\b', replacement, t)
        return t

    def safe_path(rel):
        parts = []
        for part in Path(rel).parts:
            if part in name_map:
                part = name_map[part]
            else:
                part = sanitize_text(part)
                match = re.fullmatch(r'mediapipe_summary_(\d+)\.csv', part)
                if match:
                    part = 'mediapipe_summary_' + code(match[1], 'adult_gaze') + '.csv'
            parts.append(part)
        return '/'.join(parts)

    manifest = []
    data_review = []
    for p in files:
        rel = str(p.relative_to(source))
        original = p.read_bytes()
        record = {'source_path': safe_path(rel), 'source_path_sha256': sha(rel.encode()),
                  'source_sha256': sha(original), 'source_bytes': len(original),
                  'destination': '', 'disposition': '', 'transformation': '',
                  'destination_sha256': '', 'destination_bytes': ''}
        reason = None
        if p.name == '.DS_Store' or p.name.startswith(('._', '~$')):
            reason = 'Operating-system metadata or Office lock file; no scientific content'
        elif 'identifiable' in p.name or rel.endswith('/pilot1_exp1.json'):
            reason = 'Restricted CHS session export: identifiers, dates, consent, device/session metadata; scientific response derivatives retained where supplied'
        elif p.name == 'pilot1_participants.csv':
            reason = 'Participant linkage table with parent IDs, session UUIDs and test dates; keep outside Git'
        elif rel in {
            'PREVIOUS_ARCHIVE/study1_verbal_archive/webm/sample_video.webm',
            'PREVIOUS_ARCHIVE/study1_verbal_archive/mp3/sample_1.mp3',
            'PREVIOUS_ARCHIVE/study1_verbal_archive/ogg/sample_1.ogg',
        }:
            reason = 'Generic template demonstration media, including a recognizable person; study relevance and permission not established'
        if reason:
            record.update(disposition='EXCLUDED', transformation=reason)
            manifest.append(record)
            continue
        destination = safe_path(route(rel))
        result = original
        changes = []
        if p.suffix == '.csv':
            rows = list(csv.reader(io.StringIO(original.decode('utf8'))))
            header = rows[0]
            keep = [i for i, field in enumerate(header) if field != 'date_created']
            out = io.StringIO(newline='')
            writer = csv.writer(out, lineterminator='\n')
            writer.writerow([header[i] for i in keep])
            for row in rows[1:]:
                assert len(row) == len(header), rel
                transformed = []
                for i in keep:
                    field, value = header[i], row[i]
                    if field in ID_FIELDS:
                        namespace = 'adult_gaze' if field == 'ParticipantID' else 'id'
                        value = code(value, namespace)
                    elif field in VIDEO_FIELDS and value:
                        value = name_map[Path(value).name]
                    transformed.append(value)
                writer.writerow(transformed)
            result = out.getvalue().encode()
            cols = sorted(set(header) & ID_FIELDS)
            if cols: changes.append('Replaced platform/participant identifiers with opaque keyed codes: ' + ', '.join(cols))
            if set(header) & VIDEO_FIELDS: changes.append('Replaced recording/export names and absolute paths with opaque recording codes')
            if 'date_created' in header: changes.append('Removed exact session date_created column')
            changes.append('CSV serialization normalized; all other cells and all rows retained')
            data_review.append({'destination': destination, 'rows': len(rows)-1, 'columns': [header[i] for i in keep], 'transformation': '; '.join(changes)})
        elif rel.endswith('exp3_mental_mental_absent/data.json'):
            # The handoff contains a comma-separated sequence of objects, not valid JSON.
            old = original.decode()
            result = re.sub(r'("participant_id"\s*:\s*")([^"]+)(")',
                            lambda m: m[1] + code(m[2]) + m[3], old).encode()
            changes.append('Replaced participant_id; preserved malformed historical JSON verbatim otherwise; valid CSV counterpart retained')
        elif p.suffix in TEXT:
            old = original.decode('utf8')
            new = sanitize_text(old)
            result = new.encode()
            if old != new: changes.append('Replaced actual participant UUID examples, including shortened forms, with opaque codes')
        if safe_path(rel) != rel: changes.append('Participant/recording identifiers redacted from source and destination filenames')
        q = target / destination
        assert not q.exists() or q.read_bytes() == result, f'Refusing to overwrite different content at {q}'
        q.parent.mkdir(parents=True, exist_ok=True)
        q.write_bytes(result)
        record.update(destination=destination, disposition='TRANSFORMED' if result != original or safe_path(rel) != rel else 'COPIED',
                      transformation='; '.join(changes) or 'Byte-for-byte copy; directory relocation only',
                      destination_sha256=sha(result), destination_bytes=len(result))
        manifest.append(record)
    out = target / 'docs/handoff'
    out.mkdir(parents=True, exist_ok=True)
    with (out / 'source_manifest.csv').open('w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=list(manifest[0])); w.writeheader(); w.writerows(manifest)
    (out / 'data_transformations.json').write_text(json.dumps(data_review, indent=2) + '\n')
    print(json.dumps({'files': len(manifest), 'imported': sum(bool(x['destination']) for x in manifest),
                      'excluded': sum(x['disposition'] == 'EXCLUDED' for x in manifest),
                      'transformed': sum(x['disposition'] == 'TRANSFORMED' for x in manifest),
                      'bytes_imported': sum(int(x['destination_bytes'] or 0) for x in manifest)}, indent=2))


if __name__ == '__main__':
    main()
