# Study 3 — Non-Verbal Looking-Time Study (Children & Adults)

This is the most involved study in the project, with a full pipeline from
hand-authored source assets through to published-ready figures. This README
walks through that entire pipeline, folder by folder, in the order David
asked for:

**source materials → stimulus generation → study → raw data/video →
iCatcher/MediaPipe → processed gaze data → analysis → figures**

## 1. What this study is testing

Unlike Studies 1/2/single-cause, this study asks no explicit questions at
all. Instead, it measures **spontaneous looking time** as a non-verbal
signal of causal/moral expectation.

- **Children's preregistration** (`preregistration/exp3_children.docx`):
  *"Non-verbal causal chains: A looking-time study of causal attribution in
  young children."* Children (ages 3–5) watch animations where a distal
  character (left) hits a proximal character (right), causing the proximal
  character to break a block structure. Two test trials per child: one where
  the **distal** agent is punished, one where the **proximal** agent is
  punished. iCatcher+ measures left- vs. right-looking during the freeze-
  frame at the end of each test trial.
  - **H1 (Condition × Look-Direction interaction):** when the proximal agent
    is punished (the "surprising"/incongruent outcome, since children are
    expected to hold the distal agent responsible), children look longer at
    the distal agent (left) than when the distal agent is punished — and
    this asymmetry should be bigger for the incongruent (proximal-punished)
    case.
  - **H2:** proximal-punished trials specifically should show longer
    left- (distal-)ward looking, reflecting violation of expectation.
  - **H3:** this effect should strengthen with age.
- **Adults' preregistration** (`preregistration/exp3_adults.docx`):
  *"Non-verbal causal chains: Adult causal and moral attributions."*
  Within-subjects: adults see both a distal-punished and a proximal-punished
  version of the outcome and directly rate fairness/desert (this arm is
  closer to an explicit-judgment task than a pure looking-time task — check
  `study_code_adults_proliferate/` for exactly what's asked).
  - **H1:** punishment target (distal vs. proximal) significantly affects
    fairness/desert judgments.
  - **H2:** punishing the distal agent is rated fair/deserved.
  - **H3:** punishing the proximal agent is rated unfair/undeserved.

**The design has since evolved beyond exactly what's written in these
preregistrations** — see Section 9 ("current design status") — most notably
by adding a **single-cause** (non-chain) context as a second, compared
condition, and by adding new analyses (anticipatory-looking window) in
response to the batch-3 results. If the design changes further, the
preregistration documents should be amended/re-filed accordingly; that is
flagged as unfinished work.

## 2. Source materials → stimulus generation code

Folder: `01_stimulus_source_and_generation_code/`

This is the **current** Python codebase (Pillow-based procedural animation,
not hand-drawn video) that generates every GIF/PNG stimulus used in the
current study:

- `shared_primitives.py` — shared drawing primitives (`Renderer`), data
  models (`Agent`, `Prop`), animation helpers, and configuration constants
  (canvas size, colors, timing).
- `warmup_single_character_trials.py` — generates the 3 single-character
  punishment warmup animations.
- `generate_single_cause_test_trials.py` — generates the single-cause
  condition's standard + mirrored test animations.
- `generate_causal_chains_test_trials.py` — generates the causal-chain
  condition's standard + mirrored test animations.
- `CHS_jsPsych.js` — copy of the main jsPsych experiment script (also present
  in `03_study_code_children_CHS/` — kept in both places since it's
  referenced directly by this folder's own README).
- **`README.md` in this folder is the authoritative, detailed changelog** of
  the most recent revisions (post-David-feedback shake-timing fixes, the
  loop=1 GIF fix, removing circles/pink from test trials, etc.) — read it in
  full before touching the generation code; it documents *why* several
  non-obvious implementation choices were made.

**To regenerate all stimuli from source:**
```bash
pip install Pillow
python3 generate_single_cause_test_trials.py
python3 generate_causal_chains_test_trials.py
python3 warmup_single_character_trials.py
```
Outputs are automatically copied into the materials folder (Section 3).

## 3. Generated stimuli

Folder: `02_generated_stimuli/` — the current, checked-in output of the
scripts above: GIFs split into `_part1`/`_part2` (pre-/post-outcome halves,
swapped for the anticipatory freeze), freeze-frame PNGs
(`_anticipatory_freeze`, `_final_freeze`), intro/outro MP4s
(`overall_study_intro.mp4`, `overall_study_end.mp4`, `warmup_*.mp4`), and the
punishment sound cue (`punish_cue.mp3`). Covers both the `chains_*` and
`single_cause_*` conditions, each with `distal`/`proximal` ×
`standard`/`reverse` variants.

## 4. Study code

- **Children:** `03_study_code_children_CHS/non_verbal_full_study_chs.js` —
  paste directly into the "jsPsych Experiment Code" editor on
  **childrenhelpingscience.com**. Handles the full trial timeline, consent,
  instructions, warmup-order randomization, webcam recording controls, the
  dynamic split-GIF/freeze sequencing, and exit-survey integration. (See
  `01_stimulus_source_and_generation_code/README.md` for the exact frame-
  timing contract this script relies on.)
- **Adults:** `03_study_code_adults_proliferate/` — a standalone jsPsych
  v7.3.1 experiment (`index.html` + `js/`) built for **Proliferate**,
  recruited via **Prolific**. Its own `README.md` (included) documents the
  full flow: consent → instructions → webcam calibration → familiarization →
  two test trials (webcam recording auto-starts/stops around each) →
  demographics → submission. **This version was built and used for the
  61-participant pilot and is explicitly designed to be reused as-is for the
  preregistered full study** (per its pipeline README); whether it has
  actually been redeployed for preregistered data collection, or is still
  pilot-only, was not confirmed as part of this handoff.

## 5. Raw data / raw video — where it actually lives (and why it's not here)

**Raw participant webcam video is not included in this repository.** This
project involves child and adult participants whose faces are visible in
these recordings; per David's own instruction ("For any sensitive
participant data that should not be stored in GitHub, please just make sure
the secure location and access/reproduction steps are documented clearly"),
raw video was deliberately excluded from a public/shareable GitHub repo.

What was found and *where it currently lives* (all on Sunny's computer,
Desktop, as of this handoff — **David will need direct access to these
locations, not through GitHub**):

- `videos_folder_2yo7/` (~216 MB) — raw `.webm` webcam recordings for the
  2-year-old toddler pilot batch (7 participants; corresponds to the
  `children_pilot_2yo_toddler_batch_n7` results folder in this repo).
- Other batches' raw videos (the n=80 batch behind `children_pilot_batch1_n80`
  and the n=29 batch behind `children_repilot_batch3_...`) were **not found
  in the materials reviewed at all** — they were likely already transferred
  to Sherlock (`$GROUP_HOME/icatcher_pipeline/<RUN_NAME>/`, per the pipeline
  README) and/or deleted locally after processing, consistent with the
  pipeline's normal transfer-then-process workflow. Whether these still
  exist on Sherlock, and at what exact path, was not confirmed as part of
  this handoff — whoever needs them for re-analysis (e.g., the "re-run
  iCatcher on uncropped videos" work in Section 7) will need to check
  Sherlock storage directly.
- The adult pilot's raw webcam video was **never a separate file** — per
  `03_study_code_adults_proliferate/README.md`, Proliferate has no native
  video upload, so each clip is base64-encoded and embedded directly inside
  the exported results CSV (`looking_time_formal_pilot-videos.csv`). That
  CSV itself was not found in the materials reviewed for this handoff and
  would need to be re-downloaded from the Proliferate dashboard if needed
  again.

**Also not included, for the same reason:** the original Lookit/CHS session
JSON exports (participant identifiers, consent records, raw responses)
behind each batch. If David needs to re-run or extend the iCatcher pipeline,
those JSON exports (normally saved to Sunny's Desktop as described in the
pipeline README, e.g. "the exact filename of the new Lookit export, as it
sits on your Desktop") will need to be re-downloaded from the Lookit/CHS
researcher dashboard.

## 6. iCatcher+ pipeline (children) — full pipeline, commands, and config

Folder: `04_icatcher_pipeline_children_sherlock/` — this is the **complete**
Sherlock GPU pipeline, copied in full (not just the outputs). Its own
`README.md` (included, and quoted in relevant part below) is the
authoritative reference; summary:

- **What it is:** a SLURM array job on Sherlock's GPU partition, one task per
  participant, running iCatcher+ (a PyTorch gaze-classification model) on
  each participant's cropped video, in `_shared/icatcher_pipeline/`-per-batch
  directories so different data batches never overwrite each other.
- **Files:** `config.sh` (the only file you edit between batches — SUNet ID,
  run name, data filenames), `process_icatcher_sherlock.py` (the per-
  participant analysis script), `make_participant_list.py` (builds the array
  index from the Lookit JSON), `merge_results.py` (combines per-participant
  CSVs), `setup_env.sh` (one-time environment build — installs the iCatcher+
  model), `run_icatcher_array.sbatch` (the SLURM job definition),
  `transfer_to_sherlock.sh` / `retrieve_results.sh` (rsync helpers run from
  the Mac).
- **The exact command sequence** (from `config.sh` onward) is: confirm SSH/
  Duo access → edit `config.sh` for the new batch (`RUN_NAME`,
  `JSON_FILENAME`, `VIDEOS_FOLDER_NAME`) → `bash transfer_to_sherlock.sh`
  from the Mac → (first run only) `sh_dev -g 1` then `bash setup_env.sh` on
  Sherlock → `python make_participant_list.py data.json participants.txt` →
  `sbatch --array=0-N run_icatcher_array.sbatch` (add `%20` throttling above
  ~200 participants) → poll with `squeue -u $USER -r` → once empty, verify
  `results/` count and check `sacct`/`.err` logs for any `FAILED` tasks →
  merge with `merge_results.py` → `bash retrieve_results.sh` from the Mac.
- **Model/version info:** iCatcher+ (PyTorch, GPU-accelerated on Sherlock's
  `gpu` partition). Exact model checkpoint/version pinned in `setup_env.sh` —
  check that file directly for the current pinned version if reproducing
  results exactly matters.
- **Output categories:** per-frame `left`, `right`, `away`, plus invalid
  codes `noface`/`none` and a confidence score per frame (this is documented
  more fully in Section 7's analysis notes, since it directly shaped how the
  batch-3 analysis was scoped).
- Originally built/tested on a 73-participant pilot; explicitly designed to
  be reused as-is for the 200+-participant preregistered full study.

## 7. Processed gaze data → analysis → figures

Folder: `06_processed_gaze_results/` (raw iCatcher+/MediaPipe *output*, i.e.
per-participant CSVs of frame-by-frame gaze codes — **not raw video**, so
safe to include) and `07_analysis_code_and_reports/` (the code and write-ups
that turn those CSVs into the statistics/plots below). Four batches exist:

### `children_pilot_batch1_n80/`
Earliest large children's pilot (n≈80, per the plot filename
`icatcher_combined_n80_plot1.png`). Contains per-participant
`icatcher_summary_*.csv` files, a merged `icatcher_summary_combined.csv`,
and four plots (`icatcher_results_plot.png`,
`icatcher_combined_n80_plot1.png`, `icatcher_results_plot_combine.png`,
`icatcher_results_by_age.png`, `icatcher_combined_n80_plot2_by_age.png`).
**No separate write-up/report was found for this batch** — the plots are
the only artifact; the code that produced them wasn't located (see the
top-level README's Section 8 gap list).

### `children_pilot_2yo_toddler_batch_n7/`
A 7-participant toddler (2-year-old) sub-pilot. Per-participant summary
CSVs plus a merged `icatcher_summary_combined.csv`. Corresponds to the raw
videos in `videos_folder_2yo7/` on the Desktop (Section 5). No separate
write-up found.

### `children_repilot_batch3_with_single_cause_n29/`  ← the deepest analysis
The most recent children's re-pilot (n=29), run **after** the study design
was updated to add the single-cause context alongside the original chains
context (this is the batch behind the two "report to David" documents).
Contains:
- Per-participant summary CSVs + merged CSV, plus two extra derived CSVs:
  `first_transitions.csv`, `window_comparison.csv`.
- Raw-ish per-video iCatcher **frame-level** text output in
  `icatcher_output/` and `icatcher_output_full/` (frame-by-frame gaze codes
  per video — the `_full` version corresponds to the **uncropped** re-run
  described below; neither of these folders contains actual video, just
  numeric/text gaze codes, so they were safe to include).
- Seven plots: `plot1_by_context.png`, `plot2_by_age.png`,
  `plot3_by_direction.png`, `plot4_holistic.png`, `timecourse_4cell.png`,
  `individual_children.png`, `punished_char_fair_vs_unfair.png`,
  `antic_bars.png`, `antic_timecourse.png`.
- `unfair_punishment_analysis.py` — the analysis script for the fair-vs-
  unfair punishment comparison (also copied up to
  `07_analysis_code_and_reports/` for visibility).
- `whose_fault_lab_meeting.pptx` — lab-meeting slide deck built from this
  batch's results.

**The two most important documents for understanding this study's current
scientific state are in `07_analysis_code_and_reports/`:**

- **`report_to_david.md`** — a complete coding/timing audit (29/29
  participants verified against raw session data, no errors found) plus the
  time-course, first-transition, and individual-child analyses. **Headline
  finding:** children show a strong, early, and remarkably uniform
  preference to look at the **unpunished (star-keeping)** character — 12%
  vs. 89–95% distal-looking depending on which character is punished, in the
  first second of the freeze — identically in both the chains and single-
  cause contexts, and regardless of whether the punishment was "congruent"
  with the chain's causal structure. This looks like a general response to
  the punishment/reward outcome rather than the causal-structure-specific
  effect predicted in the preregistration's H1.
- **`report_to_david_anticipatory.md`** — a follow-up **uncropped re-run** of
  iCatcher+ (recovering the pre-punishment "anticipatory window," 17–19s,
  when the outcome is knowable but the target isn't yet visually distinct)
  found a different, subtler pattern: children orient toward the character
  they expect to be **spared**, not the one they expect to be punished
  (single-cause: 0.69 distal/bystander-looking, d=0.94, p=.005; chains: 0.56,
  near chance) — described as "innocence-orientation," continuous with the
  post-punishment star-keeper preference. A caveat flagged in the report:
  in the single-cause condition the bystander is also the only character
  that never moves, so a low-motion/novelty confound needs ruling out.
- **`unfair_punishment_feasibility.md`** — answers two further questions
  David asked: (1) "do children look longer at the punished character when
  punishment is unfair?" — yes, answerable and already run (chains: unfair
  punishment → **less** looking at the punished character, p=.029, opposite
  the hypothesized direction; single-cause: same direction as hypothesized
  but n.s., likely underpowered at n=13); (2) "do children look longer at
  the *punishing star* specifically when it's unfair?" — **not answerable
  with the current 3-category (left/right/away) iCatcher+ output**, because
  the star hovers directly above whichever character is punished, so
  "looking at the star" and "looking at the punished character" are
  currently the same signal. The report recommends either finer gaze
  localization (there's already a MediaPipe pipeline in this project, used
  for the adult pilot — worth checking if it's accurate enough on child
  webcam footage) or a stimulus redesign that moves the star to a screen
  region no character occupies.

### `adults_pilot_mediapipe_n61/`
The adult non-verbal pilot (n=61), processed with the **MediaPipe** pipeline
(Section 8) rather than iCatcher+. Per-participant summary CSVs plus
frame-level `mediapipe_output`-style text files. **No separate statistical
write-up was found for this batch** beyond the summary CSVs — see the
top-level README, Section 8.

## 8. MediaPipe pipeline (adults)

Folder: `05_mediapipe_pipeline_adults_sherlock/` — the sibling Sherlock
pipeline for the adult (Proliferate/Prolific) data, using **MediaPipe Face
Mesh iris tracking** instead of iCatcher+ (CPU-only — MediaPipe's Face Mesh
API has no GPU delegate available on headless Linux, so this runs on
Sherlock's general `normal` CPU partition rather than `gpu`). Same
config.sh-driven, one-file-changes-per-batch design as the iCatcher
pipeline; the key format difference is that Proliferate exports two CSVs
(a test-order CSV and a videos CSV with each clip **base64-embedded**)
instead of one video-per-file, so `make_participant_list.py` here splits
that combined CSV into per-participant pieces first. **Status note from the
pipeline's own README: this pipeline has not yet been run live on
Sherlock** the way the children's iCatcher pipeline has (that one was
debugged interactively through several real runs) — it's built with the
same lessons pre-applied, but a first live run may still surface something
new. The n=61 adult pilot results actually included in
`06_processed_gaze_results/adults_pilot_mediapipe_n61/` were produced by
the **local** `process_videos_mediapipe.py` script (in
`03_study_code_adults_proliferate/`), not yet via this Sherlock pipeline —
whether that is still the case as of this handoff was not independently
re-verified.

## 8b. Earlier adult pilot response data (archived)

Three additional adult response-data CSVs were recovered from a folder
called "adult data" on Sunny's Desktop and, based on their column
structure, placed into the archive:

- `PREVIOUS_ARCHIVE/study3_nonverbal_archive/01_pilot1_earliest_adult_pilot/response_data/non_verbal_adult_pilot1_fixed_cc-responses.csv`
- `PREVIOUS_ARCHIVE/study3_nonverbal_archive/06_non_verbal_pilot2_adult_explicit_rating/response_data/non_verbal_pilot2-responses.csv`
- `PREVIOUS_ARCHIVE/study3_nonverbal_archive/02_non_verbal_omission_pilot/response_data/non_verbal_omission_adult_p1_fixed-responses.csv`

These record explicit yes/no ratings (`distal_fair`, `proximal_should_punish`,
`deserve_punish`, `which_intended`, etc.) rather than webcam looking-time
recordings. Per Sunny, these are from earlier pilot versions of the adult
arm and should be treated as archive data — the current adult study code
(`pilot_adults_version`, MediaPipe/webcam looking-time pipeline) is the
active version.

## 9. Current design status / what's live

As of this handoff, David and Sunny are actively iterating on the study
design in direct response to the batch-3 findings above:
- Adding a genuine anticipatory-looking window into the *design itself*
  (currently this was only recoverable after the fact via an uncropped
  video re-run — see Section 7).
- Removing the post-punishment visual asymmetry (the star currently stays
  parked above the punished character through the whole freeze, which is
  part of why the star-vs-punished-character question isn't currently
  answerable — see the feasibility memo).
- Possibly collecting more single-cause data (David suggested "unpausing"
  the study for this, per `report_to_david.md`'s closing line).

Current live/recruitment status and target Ns for both the children's and
adults' non-verbal arms have been communicated directly to David, outside
this repo.

## 10. Dependencies / environment notes

- Stimulus generation: Python 3, `Pillow`.
- Children's study code: jsPsych, hosted via Lookit/CHS (paste-in code
  editor — no local server needed to deploy, though local testing may use
  jsPsych's own tooling).
- Adult study code: jsPsych v7.3.1, hosted via Proliferate.
- iCatcher+ pipeline: Sherlock HPC account with GPU allocation, `sh_dev -g 1`
  dev sessions, SLURM (`sbatch`/`squeue`/`sacct`), a Stanford SUNet ID with
  Duo two-factor configured for SSH.
- MediaPipe pipeline: Sherlock HPC account (CPU partition `normal` — no GPU
  needed), Python `mediapipe`/`opencv-python`/`pandas`/`numpy`, `ffmpeg`.
- Analysis scripts (e.g. `unfair_punishment_analysis.py`): check the script's
  own imports for its exact Python dependency list (likely `pandas`,
  `numpy`, a plotting library, and a stats package) before re-running it —
  not independently verified for this README.
