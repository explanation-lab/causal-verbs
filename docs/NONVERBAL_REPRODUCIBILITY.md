# Nonverbal reproducibility

Audited against Sunny's handoff on 2026-09-12. The current Study 3 root is [current/study3_nonverbal_looking_time](../current/study3_nonverbal_looking_time/). Availability is not successful reproduction: original material, current generated files, pilot collection versions and historical analyses are not yet matched end to end.

`AVAILABLE` = supplied and inspected; `PARTIAL` = some components exist but a necessary link/validation is absent; `MISSING` = not supplied; `SECURE-EXTERNAL` = restricted inputs must remain outside GitHub, with custody/access confirmed separately.

```text
stimulus-generation source [PARTIAL]
  → generated stimuli [PARTIAL]
  → experiment code [AVAILABLE; deployment match PARTIAL]
  → raw participant recording/export [SECURE-EXTERNAL]
  → gaze coding [PARTIAL]
  → processed gaze data [AVAILABLE; cohort completeness PARTIAL]
  → statistical analysis [PARTIAL]
  → figures/results [AVAILABLE; regeneration PARTIAL]
```

## Stage-by-stage evidence

| Stage | Status | Supplied evidence and remaining break in the chain |
| --- | --- | --- |
| Stimulus-generation source | **PARTIAL** | [Source folder](../current/study3_nonverbal_looking_time/01_stimulus_source_and_generation_code/) contains `shared_primitives.py`, chain/single-cause test generators and `warmup_single_character_trials.py`. Pillow is required. Current intro/outro MP4s and the sound cue lack a fully established source/instruction chain. Older generators and warmup audio remain in the archive. |
| Generated stimuli | **PARTIAL** | [Generated folder](../current/study3_nonverbal_looking_time/02_generated_stimuli/) contains chain/single-cause standard/reverse GIFs, split GIFs, freeze PNGs, warmup GIFs, intro/outro/warmup MP4s and `punish_cue.mp3`. The files are available, but generator-to-output equivalence and the three timing JSON files are unverified/missing. |
| Experiment code | **AVAILABLE** | [Children CHS code](../current/study3_nonverbal_looking_time/03_study_code_children_CHS/non_verbal_full_study_chs.js) and [adult Proliferate code](../current/study3_nonverbal_looking_time/03_study_code_adults_proliferate/) are preserved, including webcam capture. Deployment configuration and cohort/version matching are **PARTIAL**. The adult preregistration document describes an explicit-rating arm; this must not be silently equated to the supplied webcam pilot. |
| Raw participant recording/export | **SECURE-EXTERNAL** | Child webcam files and CHS session exports, and the adult Proliferate CSV containing base64-encoded recordings, are not supplied for this nonverbal work. Secure location/access/retention is unconfirmed. A CSV containing base64 webcam video is a raw recording, regardless of extension. |
| Gaze coding | **PARTIAL** | [Child iCatcher/Sherlock pipeline](../current/study3_nonverbal_looking_time/04_icatcher_pipeline_children_sherlock/) includes cropped and full-video processing, merge scripts, configuration and SLURM/transfer helpers. [Adult local MediaPipe processor](../current/study3_nonverbal_looking_time/03_study_code_adults_proliferate/process_videos_mediapipe.py) and [Sherlock adaptation](../current/study3_nonverbal_looking_time/05_mediapipe_pipeline_adults_sherlock/) exist. Restricted inputs and exact environments/model checkpoints are absent. Source reports the adult results were generated locally; the Sherlock adaptation was not validated live. |
| Processed gaze data | **AVAILABLE** | [Processed results](../current/study3_nonverbal_looking_time/06_processed_gaze_results/) contain summary CSVs for four batches; batch 3 also has cropped/full numeric frame-level `.txt` output, first-transition and window-comparison CSVs. Original participant/recording IDs are replaced with opaque codes. Completeness is **PARTIAL**: the `n80` label covers 73 supplied participants, and adult frame-level annotation files referenced in summary CSVs are absent. |
| Statistical analysis | **PARTIAL** | [unfair_punishment_analysis.py](../current/study3_nonverbal_looking_time/07_analysis_code_and_reports/unfair_punishment_analysis.py) is supplied, also duplicated in the batch-3 folder. It uses pandas/numpy and a hand-coded t distribution. It reads an obsolete absolute `/sessions/.../Desktop/...` path. Most downstream scripts for the reports, anticipatory windows, time courses, transitions, age analyses and figures are **MISSING**. |
| Figures/results | **AVAILABLE** | Historical plots, `whose_fault_lab_meeting.pptx`, `report_to_david.md`, `report_to_david_anticipatory.md` and `unfair_punishment_feasibility.md` are retained. Regeneration is **PARTIAL** because most generating scripts and some upstream inputs are missing. No reported significance test or audit conclusion was independently reproduced in this import. |

## Batches and counts actually supplied

| Original batch label | Combined CSV rows | Distinct coded participants | Other material |
| --- | ---: | ---: | --- |
| `children_pilot_batch1_n80` | 146 | 73 | Per-participant summaries and plots; label/exclusions need reconciliation |
| `children_pilot_2yo_toddler_batch_n7` | 14 | 7 | Per-participant summaries; no standalone report |
| `children_repilot_batch3_with_single_cause_n29` | 58 | 29 | Cropped/full frame-level output, 57 first-transition rows, window comparisons, reports and plots |
| `adults_pilot_mediapipe_n61` | 122 | 61 | Summary CSVs; referenced annotation files and standalone downstream statistical report not supplied |

These are file counts, not newly established inclusion criteria. Rows, conditions, looking-frame counts and analytic ages are preserved. `Response UUID`, `uuid`, `ParticipantID`, `Video Filename` and `Annotation File` retain historical column names for compatibility, but now contain opaque codes. Recording filenames in tables identify the required secure source type; they do not imply that a recording is present in the repository.

## Secure raw-data custody

The source claims `videos_folder_2yo7/` on Sunny's Desktop contained the toddler videos. It did not establish the presence or exact path of the other child batches; Sherlock locations under a configured `icatcher_pipeline/<RUN_NAME>/` were suggestions, not verified holdings. The adult `looking_time_formal_pilot-videos.csv` would need to be recovered from authorized Proliferate storage/dashboard access. Child CHS session JSONs also need authorized retrieval.

**Custodian, durable institutional location, exact file inventory, access procedure and successful restore: unresolved.** David and Sunny should record those details in approved restricted storage, with a non-identifying access reference here. Do not put recordings, base64 media, session exports, direct download tokens or a participant crosswalk in GitHub. The older identifiable verbal-pilot JSONs found elsewhere in the handoff were excluded from this import; they are not substitutes for the missing nonverbal inputs.

## Generation and timing contract

The source's intended generator order is:

```sh
python3 generate_single_cause_test_trials.py
python3 generate_causal_chains_test_trials.py
python3 warmup_single_character_trials.py
```

These are historical entry points, **not verified checkout-ready reproduction commands**. Run only after a separately recorded path fix in an isolated output directory. Current scripts save local outputs and conditionally copy to `../materials/`; the import's material directory is `02_generated_stimuli/`. Their timing outputs are `single_cause_timing.json`, `chains_timing.json` and `warmup_timing.json`, none supplied. The CHS script contains timing constants and comments referencing timing JSONs; its live behavior has not been matched to regenerated assets.

The detailed original animation README records rotation-only cue shakes, dither/frame-collapse handling, settled freeze frames, removal of circles/pink from tests and a single-cause bystander hop. Preserve these design decisions during a path fix. It also calls GIF `loop=1` “play once”; this wording needs correction/verification because the GIF loop extension represents a repeat count. Check actual browser playback, total duration and freeze swaps rather than accepting the original statement as a guarantee.

Present assets alone do not establish which stimulus version was used for each historical cohort. In particular, batch-3 anticipatory analysis describes an uncropped re-run of older recordings, whereas current split-GIF assets encode a later design. No new timing files were generated or substituted during the import.

## Gaze-to-analysis recovery

The child pipeline's documented sequence is configure a run, transfer secure JSON/video inputs, prepare the environment, create the participant list, submit the appropriate SLURM array, inspect failures, merge results, and retrieve outputs. It requires authorized Sherlock access and GPU resources for iCatcher. The adult version splits encoded exports into per-participant inputs and uses CPU MediaPipe processing. These helpers were preserved, not executed against a cluster or dashboard.

The supplied setup scripts do not fully pin package versions or model checkpoints. The original README's stronger claim of pinned reproducibility is not supported by `setup_env.sh`. Processing side labels, frame timing, crop/full selection, counterbalancing/direction and invalid-frame handling must be matched to the actual collected experiment before rerunning. Replacing a missing original statistical script with a new analysis would require a clearly labeled new analytic decision.

Reports describe post-punishment preference for the unpunished character and a more nuanced anticipatory pattern. They also identify a limit of left/right/away coding: star-specific and character-specific looking cannot be separated when the star occupies the same screen region. Those are historical report claims and limitations, not findings recomputed here.

## Hosting and supplementary assets

Child code points to Sunny's `non_verbal_full_study_updated/materials/`; adult code points to `pilot_kids_version/materials/`, both in `SunnyZ-cs/non_verbal_adults` on personal GitHub hosting. Archived versions preserve additional URLs. Local copies are retained, but URLs have not been redirected and no experiment was deployed. A lab-hosting migration must establish an asset/version manifest and verify playback, CORS, timing, recording and submission behavior. LFS hydration is needed for local files; Git LFS does not by itself make these paths suitable for browser hosting.

Verbal PPTX sources and the archived child `materials/generate_warmup.py` plus `warmup_practice_audio.m4a` provide some production provenance. They do not close the missing sources/instructions for every current nonverbal intro/outro/warmup/audio asset. Recover the remaining original projects, narration provenance and export instructions explicitly.

For the complete outstanding list and owner decisions, see [HANDOFF_STATUS.md](handoff/HANDOFF_STATUS.md).
