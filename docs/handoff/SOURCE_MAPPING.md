# Source mapping and provenance

## Sources and boundaries

- Sole scientific source: local `Cause_Fault_Punishment_Handoff` working tree, supplied by David, read only.
- Source HEAD: `4a87dc707b45c16885b6cd9356c1cbff18af5922`, dated `2026-09-12T04:57:33+00:00`; working tree clean at inspection.
- Template: `explanation-lab/research-project-template` at `c641b4570691bb05ccd99d414d9b2b3fd6e89a1b`.
- Existing organization convention checked read only: `explanation-lab/cookie-task` at `320637e4c7431756c3f5e5e86fa216d423492880`.
- Destination: `explanation-lab/causal-verbs`, initially empty, branch `handoff-import`.
- The older `Cause_Fault_Punishment` repository was not inspected or imported. No other workspace repository was modified.

## Directory routing

| Source | Destination |
| --- | --- |
| `CURRENT/01_study1_causal_chains_verbal/` | `current/study1_baseline_causal_chains/` |
| `CURRENT/02_study2_causal_chains_intention_verbal/` | `current/study2_intention_causal_chains/` |
| `CURRENT/04_study3_nonverbal_looking_time/` | `current/study3_nonverbal_looking_time/` |
| `CURRENT/03_single_cause_verbal/` | `current/single_cause/` |
| `PREVIOUS_ARCHIVE/study1_verbal_archive/` | `archive/study1_verbal/` |
| `PREVIOUS_ARCHIVE/study2_verbal_archive/` | `archive/study2_verbal/` |
| `PREVIOUS_ARCHIVE/study3_nonverbal_archive/04_non_verbal_single_cause_standalone_pilot/` | `archive/single_cause/nonverbal_standalone_pilot/` |
| Other `PREVIOUS_ARCHIVE/study3_nonverbal_archive/` content | `archive/study3_nonverbal/` |
| `PREVIOUS_ARCHIVE/adult_pilot_early_handcoded/` | `archive/adult_pilot_early_handcoded/` |
| `reference_literature/` | Same path |
| `presentation_assets_conference_talk/` | Same path |
| Root `README.md`, `.gitignore` | `docs/handoff/source/README.md`, `docs/handoff/source/original.gitignore` |

Top-level current-study source READMEs become `HANDOFF_README.md`, alongside new navigation READMEs. Current `data/raw_data/` paths become `data/analysis_data/`, because these are sanitized derivatives, not raw exports. Other internal paths remain historical unless privacy required a renamed file. The combined nonverbal chain/single-cause experiment remains intact. Archive placement is inherited from the handoff and does not independently validate the theoretical classification of every older pilot.

## File accounting

[source_manifest.csv](source_manifest.csv) accounts for all **2,817** source working-tree files outside `.git`: **2,806 imported**, **11 excluded**. Imported files include **378 transformed files**; remaining imports are byte-for-byte copies. Data transformations and their row counts are listed in [data_transformations.json](data_transformations.json).

Each row records source/destination checksums and sizes, disposition and transformation. For participant-bearing filenames, `source_path` uses opaque codes so the public manifest does not disclose the original identity-bearing filename. `source_path_sha256` identifies the exact original relative path for authorized verification against the source. It is not a participant lookup table. Original bytes remain in the read-only source; transformed files are never described as original raw data.

The source `.git` directory (28 files, including a large unscreened history pack) is excluded wholesale, outside the working-tree count. No source Git hooks/configuration/history were copied. The external ZIP was not imported. The original screened import used Git LFS. The ordinary-Git rebuild retains the approved media bytes without stimulus re-encoding; checksums refer to complete file contents, not historical LFS pointer text. The screened baseline was commit `98476cb106e89d1b4e9be24139d6ea4751d22e94`; rebuilding storage and history does not constitute scientific handoff acceptance.

## Exclusions

Six CHS session JSON exports were withheld, including the less-obviously named `pilot1_exp1.json`. They contain identifiers, dates, consent and device/session metadata. Supplied scientific response CSV derivatives are retained after sanitization. `pilot1_participants.csv` is a lookup table with parent IDs/session UUIDs/test dates and is withheld. One Office lock file is non-scientific metadata. Three generic sample media files (`sample_video.webm`, `sample_1.mp3`, `sample_1.ogg`) are withheld: the video shows a recognizable person, and study relevance/permission were not established. Every excluded file has a manifest entry and remains in the original source.

No known participant recording was imported. Numeric iCatcher frame output is retained after filename de-identification; it is not audio/video. Historical study stimuli, narration, image assets, editable decks, reference PDFs, reports, preregistration documents, code and all supplied non-lookup CSV data are retained.

## Reproducible import process

[import_handoff.py](../../tools/handoff/import_handoff.py) records routing and sanitation rules. A random private HMAC key generates opaque participant/recording codes; the key and any authorized re-identification process stay outside Git. The one-time local audit key is in temporary restricted audit storage, not durable institutional custody. It is not needed to use the imported datasets, and durable custody remains an owner decision if identical future re-imports are required. Source checksums and source-path checksums allow byte-provenance verification without publishing that key.

The historical malformed `exp3_mental_mental_absent/data.json` remains malformed after replacing `participant_id`; its valid CSV counterpart is retained. No scientific repair, data exclusion rule, missing result or claimed registration was invented.
