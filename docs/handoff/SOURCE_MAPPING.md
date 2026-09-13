# Source mapping and provenance

## Provenance chain

Sunny's original read-only handoff working tree was at `4a87dc707b45c16885b6cd9356c1cbff18af5922` (2026-09-12). The sole scientific source was `Cause_Fault_Punishment_Handoff`; the older `Cause_Fault_Punishment` checkout was ignored. Its unscreened Git history/configuration was not imported.

The initial screened import was `98476cb106e89d1b4e9be24139d6ea4751d22e94`. The subsequently approved ordinary-Git rebuild ended at **`b38896ab5bb5a6649df58701b573612d19f7428e`**, which is the baseline for this organization pass. This pass used only that existing screened working tree: no source re-import, privacy transformation, media conversion, recompression or scientific modification was performed.

Original organizational references were the [Explanation Lab template](https://github.com/explanation-lab/research-project-template) at `c641b4570691bb05ccd99d414d9b2b3fd6e89a1b` and the lab's current/archive convention (`cookie-task` at `320637e4c7431756c3f5e5e86fa216d423492880`). The present code/data/docs/figures separation follows [teleological_properties](https://github.com/cicl-stanford/teleological_properties). No other workspace repository was modified.

## Current destinations

Both `current/` and `archive/` separate `code/experiments/`, `code/python/`, `data/`, `docs/` and `figures/`. Experiments, data, docs and figures use study/population directories. Version names and original scientific filenames are retained; data do not gain raw/processed sublevels.

| Research/source group | Destination guide | Routing qualification |
| --- | --- | --- |
| Baseline verbal chains | [Current Study 1](../../current/docs/study1_baseline_causal_chains/README.md), [archive](../../archive/docs/study1_baseline_causal_chains/README.md) | Current adult preregistered data versus historical adult/child pilots kept distinct |
| Intention × verbal chains | [Current Study 2](../../current/docs/study2_intention_causal_chains/README.md), [archive](../../archive/docs/study2_intention_causal_chains/README.md) | Earlier adult pilots are not the missing current preregistered datasets; every historical version remains separate |
| Nonverbal chains/single cause | [Current Study 3](../../current/docs/study3_nonverbal/README.md), [archive](../../archive/docs/study3_nonverbal/README.md) | Current combined paradigm remains intact; pilot/repilot batches, reports, figures and Python are separated by role |
| Standalone single cause | [Current](../../current/docs/single_cause/README.md), [archive](../../archive/docs/single_cause/README.md) | Current verbal versus historical standalone child nonverbal material |
| Early hand-coded adult pilots 3/4 | [Archived Study 2](../../archive/docs/study2_intention_causal_chains/README.md) | Intentional/accidental chain content inspected in the PPTX sources; pairing with original distribution PDFs retained |
| Unassigned published-style plots/P-card support | [Unclassified historical](../../archive/docs/unclassified_historical/README.md) | No study/population or missing analysis inferred |
| Background literature/shared talk and character assets | [Reference material](../../reference_literature/README.md), [presentation assets](../../presentation_assets_conference_talk/README.md) | Project-wide support retained |
| Original README/source notes | [Project-wide notes](source/README.md) and study docs/source-notes areas | Verbatim bytes under `*.source.txt`, distinct from authoritative new Markdown guides |

The archive's psychological-verb variants retain their inherited Study 1 grouping; exact Study 1/2 assignment remains unresolved. Study-level verbal plots and the archived unclassified images are not assigned to a population without adequate evidence. Operational stimuli stay with experiment implementations; cluster helpers remain together. Moving code does not fix its historical input/output paths.

## File accounting and verification

[source_manifest.csv](source_manifest.csv) accounts for all **2,817** original source working-tree files: **2,806 imported**, including **378 transformed**, and **11 excluded**. Only the destination-path column changed during reorganization. Every source hash, destination hash/size, disposition and transformation is preserved. [data_transformations.json](data_transformations.json) likewise changes destination paths only; its scientific row/column/transformation records are unchanged.

[reorganization_mapping.csv](reorganization_mapping.csv) records each of the 2,806 imported files' old and new repository paths, SHA-256, ordinary-Git blob ID, file mode and size at the pre-reorganization baseline. It includes every original README exhibit, report, dataset, script, stimulus, editable source and archive/supporting file. No duplicate was removed. [REORGANIZATION.md](REORGANIZATION.md) summarizes verification and unresolved routing/dependency issues.

The source manifest uses opaque codes in participant-bearing source filenames, while `source_path_sha256` identifies the actual original relative path for authorized verification. It is not a participant lookup table. Historical source paths and the ledger's old paths are provenance fields, not current navigation.

## Unchanged exclusions and privacy

Six identifiable CHS session JSON exports (including `pilot1_exp1.json`), the `pilot1_participants.csv` participant lookup, one Office lock file, and three generic sample media files (`sample_video.webm`, `sample_1.mp3`, `sample_1.ogg`) remain excluded. The sample video showed a recognizable person; scientific relevance/permission for the generic media was unestablished. Original Git history/configuration and private keys remain outside the working-tree inventory. The original restricted source was not modified or recopied.

No known participant recording was imported. Numeric iCatcher output is gaze coding, not audio/video. Screened experimental narration/materials, all non-lookup CSV data and every numerical result are preserved. Raw nonverbal recordings/identifiable exports still require verified **secure external custody**, not GitHub storage. See [privacy review](PRIVACY_REVIEW.md).

## Historical import policy and remaining gaps

[import_handoff.py](../../tools/handoff/import_handoff.py) is preserved unchanged as the one-time original routing/sanitization policy. Its pre-reorganization paths are historical; do not rerun it into this repository. Opaque codes were generated with a private HMAC key outside Git; durable restricted custody of that key remains unresolved and it is unnecessary for analysis of the retained data. No transformation was rerun here.

[verify_import.py](../../tools/handoff/verify_import.py) reads the updated manifest and checks current imported bytes without scientific execution. Its known-malformed-JSON path was updated to the relocated file; scientific code was not edited. The historical malformed JSON and valid CSV counterpart remain intact. Missing analyses, current verbal datasets, nonverbal protocol/deployment matches, timing/output-path fixes, supplementary asset provenance and hosting dependencies remain in [HANDOFF_STATUS.md](HANDOFF_STATUS.md). Organization and `main` do not constitute scientific handoff acceptance.
