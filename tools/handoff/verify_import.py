#!/usr/bin/env python3
"""Verify import bytes, row preservation, and non-executing syntax checks.

Without --source, verifies the hydrated repository against its manifest.
With --source, also reads the original working tree to check provenance,
scientific cell equality and participant-code consistency. It never writes
to the source and never runs study, processing, transfer or analysis code.
"""
import argparse
import ast
import csv
import hashlib
import io
import json
import re
import subprocess
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ID_FIELDS = {'workerid', 'Response UUID', 'ParticipantID', 'uuid', 'response_id', 'participant_hashed_id', 'child_hashed_id', 'participant_id'}
PATH_FIELDS = {'Video Filename', 'Annotation File'}
KNOWN_INVALID_JSON = 'archive/study2_verbal/experiment3_4cases/exp3_mental_mental_absent/data.json'


def digest(p):
    with p.open('rb') as f:
        return hashlib.file_digest(f, 'sha256').hexdigest()


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--source', type=Path)
    args = ap.parse_args()
    rows = list(csv.DictReader((ROOT / 'docs/handoff/source_manifest.csv').open(newline='')))
    errors, syntax_issues = [], []
    counts = Counter()
    expected = set()
    source_index = {}
    codes = {}
    reverse_codes = {}
    source_ids = set()
    if args.source:
        for p in args.source.rglob('*'):
            if p.is_file() and '.git' not in p.relative_to(args.source).parts:
                rel = str(p.relative_to(args.source))
                source_index[hashlib.sha256(rel.encode()).hexdigest()] = p
        if set(source_index) != {r['source_path_sha256'] for r in rows}:
            errors.append('Source inventory differs from the manifest')
    for r in rows:
        counts[r['disposition']] += 1
        src = source_index.get(r['source_path_sha256'])
        if args.source and (src is None or digest(src) != r['source_sha256']):
            errors.append('Original source checksum mismatch: ' + r['source_path'])
        if not r['destination']:
            continue
        expected.add(r['destination'])
        p = ROOT / r['destination']
        if not p.is_file() or digest(p) != r['destination_sha256']:
            errors.append('Import checksum mismatch (check LFS hydration): ' + r['destination'])
            continue
        if p.suffix == '.csv' and src:
            original = list(csv.DictReader(src.open(newline='')))
            imported = list(csv.DictReader(p.open(newline='')))
            if len(original) != len(imported):
                errors.append('Data row loss: ' + r['destination'])
            for a, b in zip(original, imported):
                if set(b) != set(a) - {'date_created'}:
                    errors.append('Unexpected column change: ' + r['destination'])
                for field, value in b.items():
                    if field in ID_FIELDS and a[field]:
                        namespace = 'adult_gaze' if field == 'ParticipantID' else 'id'
                        identity = (namespace, a[field])
                        if not re.fullmatch('cv_[0-9a-f]{16}', value):
                            errors.append('Uncoded identifier: ' + r['destination'])
                        if identity in codes and codes[identity] != value:
                            errors.append('Inconsistent participant code: ' + r['destination'])
                        if value in reverse_codes and reverse_codes[value] != identity:
                            errors.append('Participant code collision: ' + r['destination'])
                        codes[identity] = value; reverse_codes[value] = identity
                        if len(a[field]) >= 8:
                            source_ids.add(a[field])
                    elif field in PATH_FIELDS and value:
                        if not re.fullmatch(r'cv_[0-9a-f]{16}\.[a-z0-9]+', value):
                            errors.append('Uncoded recording path: ' + r['destination'])
                    elif value != a[field]:
                        errors.append('Scientific value changed: ' + r['destination'] + ':' + field)
            counts['csv_compared'] += 1
        if p.suffix == '.py':
            try: ast.parse(p.read_text(), filename=r['destination'])
            except SyntaxError as e: syntax_issues.append({'file': r['destination'], 'line': e.lineno, 'issue': e.msg})
            counts['python_checked'] += 1
        elif p.suffix in {'.sh', '.sbatch'}:
            result = subprocess.run(['bash', '-n', str(p)], capture_output=True, text=True)
            if result.returncode: syntax_issues.append({'file': r['destination'], 'issue': result.stderr.strip()})
            counts['shell_checked'] += 1
        elif p.suffix == '.json':
            try: json.loads(p.read_text())
            except json.JSONDecodeError:
                if r['destination'] != KNOWN_INVALID_JSON: errors.append('Unexpected invalid JSON: ' + r['destination'])
                else: counts['known_historical_invalid_json'] += 1
            counts['json_checked'] += 1
    imported_roots = ['current', 'archive', 'reference_literature', 'presentation_assets_conference_talk', 'docs/handoff/source']
    extra = [str(p.relative_to(ROOT)) for d in imported_roots for p in (ROOT/d).rglob('*')
             if p.is_file() and str(p.relative_to(ROOT)) not in expected and p.name != 'README.md']
    if extra: errors.append('Unmanifested imported-tree files: ' + ', '.join(extra))
    text_ext = {'.csv','.json','.txt','.py','.js','.html','.sh','.sbatch','.md'}
    if source_ids:
        pat = re.compile('|'.join(re.escape(v) for v in sorted(source_ids, key=len, reverse=True)))
        for p in ROOT.rglob('*'):
            if not p.is_file() or '.git' in p.relative_to(ROOT).parts: continue
            rel = str(p.relative_to(ROOT))
            if pat.search(rel): errors.append('Source participant identifier in filename')
            if p.suffix in text_ext and p.name != 'source_manifest.csv' and pat.search(p.read_text()):
                errors.append('Source participant identifier in content: ' + rel)
    result = {'counts': dict(counts), 'errors': errors, 'historical_syntax_issues': syntax_issues,
              'scope': 'Import integrity and static syntax only; no scientific result, deployment or raw-recording reproduction'}
    print(json.dumps(result, indent=2))
    if errors: raise SystemExit(1)


if __name__ == '__main__':
    main()
