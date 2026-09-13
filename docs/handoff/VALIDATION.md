# Import validation

Date: 2026-09-12. Scope: organized handoff preservation and privacy screening, not result reproduction or live-study testing.

## Completed checks

- Accounted for all 2,817 source working-tree files outside `.git`: 2,428 byte-identical copies, 378 transformed imports and 11 exclusions. Imported payload: **4,801,356,753 bytes** before Git overhead. Every imported file matches its manifest SHA-256 checksum.
- Compared all 260 retained CSV files to the original source: row counts and every non-identifier/non-recording-path scientific value are unchanged. The only removed column is exact `date_created` in five child-pilot derivative tables. Participant-code consistency and collision checks pass. No actual source participant identifiers were detected in imported text/filenames by the source-aware check.
- Parsed 108 original Python files and checked 258 original JavaScript files with `node --check`; all pass syntax checks. Checked 20 shell scripts and six SLURM files with `bash -n`; all pass. Eight JSON files were checked: seven are valid; one historical malformed free-response JSON is explicitly preserved and has a valid CSV counterpart. Syntax success is not execution validation.
- Gitleaks found no secrets in the original working tree, imported working tree or extracted Office/PDF text. This was supplemented with structural identifier/export review; credentials scanning alone is insufficient for participant privacy.
- Examined text and metadata from the 43 real PPTX decks, six DOCX documents and 22 PDFs; inventoried embedded assets and confirmed no nested Office embedding objects. Reviewed 1,031 unique standalone/embedded images and three sample frames from 125 unique videos. The recognizable-person template example was excluded along with its unverified generic sample audio counterparts.
- Checked the otherwise ambiguous archived `temp.wav` against the source-linked `warmup_practice_audio.m4a`: decoded mono 16 kHz signals both contain 480,939 samples, correlation greater than 0.9999999. It is retained as a generated warmup-audio intermediate, not participant audio.
- Source working-tree hashes match the recorded source snapshot. The source remains unmodified; original Git history/configuration was not imported. New source-copy checksums refer to hydrated media, not LFS pointer text.

[verify_import.py](../../tools/handoff/verify_import.py) repeats the hash/static checks. Add `--source /path/to/Cause_Fault_Punishment_Handoff` for original-file inventory, checksum, CSV-cell and identifier checks. It writes nothing to the source and never executes experiment, statistical or transfer code.

## Limits and known failures retained

The malformed `archive/data/study2_intention_causal_chains/adults/experiment3_4cases/exp3_mental_mental_absent/data.json` includes historical separators and is not a valid JSON document. Only its participant IDs were replaced. Its valid CSV counterpart is retained.

No new inferential analysis or figures were generated. No raw webcam recording was processed, no Sherlock job was run, and no platform deployment/recruitment state was tested. Missing analysis scripts, output paths, timing JSONs and environment/deployment/cohort matches remain documented in [HANDOFF_STATUS.md](HANDOFF_STATUS.md) and [NONVERBAL_REPRODUCIBILITY.md](../NONVERBAL_REPRODUCIBILITY.md). Original README notes are preserved verbatim as `*.source.txt` exhibits; obsolete paths and historical claims in those exhibits are not current operating instructions. Active Markdown navigation uses the reorganized paths.

Media screening uses samples and source context. Coded data retain analytic ages and demographics; this is a restricted research import, not a public-data anonymization certification. No repository visibility change is authorized here.

## Reorganization validation (2026-09-13)

The original audit above remains a historical record; it was not rerun against Sunny's source. The [reorganization report](REORGANIZATION.md) records checks against pre-reorganization commit `b38896ab5bb5a6649df58701b573612d19f7428e`, with each imported file's new path and unchanged mode/checksum in [reorganization_mapping.csv](reorganization_mapping.csv). No scientific analyses were executed.
