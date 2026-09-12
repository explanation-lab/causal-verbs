# Handoff status

Initial audit date: 2026-09-12. The screened import was prepared on `handoff-import`; the ordinary-Git repository baseline is `main`. Creating this baseline is not scientific handoff acceptance. Import preparation is complete; scientific reproducibility and transfer acceptance remain partial.

The source's description as a “complete handoff” is provenance, not an audit conclusion. The source working tree at `4a87dc707b45c16885b6cd9356c1cbff18af5922` was the sole scientific import source. It was read only. The older `Cause_Fault_Punishment` checkout was ignored.

## Open handoff items

| Item | Evidence/status | Required next input or action |
| --- | --- | --- |
| Downstream nonverbal analyses | **PARTIAL.** `unfair_punishment_analysis.py` exists in two identical locations; the time-course, anticipatory, first-transition, individual-child and other figure-producing scripts are absent despite supplied results/reports. | Recover the original scripts, inputs, exclusions and version/environment information. Do not reverse-engineer them and call them the original analysis. |
| Other study analyses | **MISSING.** Study 1, Study 2 and single-cause verbal have figures and response data but no corresponding statistical/figure scripts. | Obtain original analysis code and raw-to-analysis transformations. |
| Raw nonverbal data custody | **SECURE-EXTERNAL, location/access unverified.** Handoff references a toddler folder on Sunny's Desktop, possible Sherlock copies for other child batches, and an adult base64-video CSV on Proliferate. None is available in this import. | David and Sunny must designate secure institutional custody, verify files and access, record a restricted manifest, and test recovery. Do not use GitHub for recordings. |
| Relative paths | **PARTIAL.** Historical absolute Desktop/session paths remain, including the only downstream nonverbal script; some references still describe the original folder layout. | Perform a separately traceable path cleanup and validate inputs/outputs on a clean checkout. Privacy changes in archived examples are recorded in the manifest. |
| Stimulus output directories | **PARTIAL.** Current generators write/copy to `../materials/`; the supplied output directory is `02_generated_stimuli/`. Copy blocks are conditional on directory existence. | Choose explicit output paths and verify them without overwriting historical stimuli. |
| Timing JSON outputs | **MISSING.** Code emits `chains_timing.json`, `single_cause_timing.json`, `warmup_timing.json`; none is supplied. | Recover/regenerate in a separate output directory and compare actual GIF durations, freeze windows, JS constants and deployed behavior. |
| Intro/outro/warmup/audio production | **PARTIAL.** Generated media, editable verbal PPTX sources and an archived `generate_warmup.py`/audio source are present. A verified source/instruction chain for every current nonverbal intro/outro/warmup MP4 and `punish_cue.mp3` is absent. | Identify exact source projects, narration/audio provenance, export settings, versions and instructions for each asset. |
| Sunny's personal asset hosting | **PARTIAL.** Adult and child code still points to `raw.githubusercontent.com/SunnyZ-cs/...`, with different current nonverbal base paths. | Choose lab-controlled hosting, map all files and preserve exact stimulus versions before a separate validated deployment. Ordinary Git storage does not establish a validated lab-controlled asset deployment. |
| Platform/deployment mapping | **MISSING from this import.** Source code is present; authenticated dashboard IDs/configurations and exact collection revisions are not established. | Obtain CHS/Lookit and Proliferate access and match each cohort to its deployed code and settings. |
| Registration evidence | **PARTIAL.** Six preregistration documents exist; a study-specific immutable OSF registration link/version is not established. Single-cause verbal has none. | Confirm registration records and amendments; distinguish documents/drafts from registered protocols. |
| Child verbal data and cohort identity | **PARTIAL.** Older child pilot derivatives exist; the handoff reports missing current child datasets for the verbal studies. `n80` gaze folder contains 73 coded participants; single-cause verbal has 32 rows, not the reported analytic 30. | Locate secure current exports and document inclusion/exclusion and cohort-to-figure mappings. No rows were dropped here. |
| Software environments | **PARTIAL.** Scripts and setup helpers exist, but no full lockfile/checkpoint manifest. iCatcher setup installs `torch`, `torchvision`, `icatcher` without exact pins; MediaPipe is unpinned. | Record validated Python/package/model/SLURM/ffmpeg versions and commands. |

## Decisions for David

Assign the ongoing owner and backup; confirm institutional secure storage and access responsibility; choose the asset-hosting migration approach; resolve protocol/deployment/cohort questions; and decide when to accept the scientific handoff. These decisions do not prevent pushing the screened import. No invitation, message, platform change or merge is part of this setup.

The generic template media featuring a recognizable person and two sample audio files were withheld because study relevance and permission were not established. They remain in the untouched source if review ever establishes a reason to retain them. They are not substituted for study stimuli.
