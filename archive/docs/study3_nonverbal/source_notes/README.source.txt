# Non-Verbal Study — Archive / Version History

This folder preserves the **complete development history** of the non-verbal
looking-time study (Study 3), from the very first adult pilot through to the
version immediately before the current one. Nothing here was deleted; each
subfolder is a self-contained snapshot of that iteration's study code and
materials (and, where applicable, its own copy of the Sherlock processing
pipeline as it existed at that point). All of this was recovered from a
folder on Sunny's computer (`non_verbal_adults_repo`) that was more complete
than the corresponding GitHub repository
(https://github.com/SunnyZ-cs/non_verbal_adults) — i.e., this local folder
had pilot/version folders that had never been pushed to GitHub at all, so
this archive is the only complete copy of that history.

Rough chronological order (earliest to latest, immediately preceding the
current `non_verbal_full_study_updated` version now in `CURRENT/`):

1. **`01_pilot1_earliest_adult_pilot/`** — the very first version: a single
   pair of test stimuli (`distal.gif`/`proximal.gif`) plus 8 familiarization
   combo GIFs (`Fam_Combo_1`–`8`). No chains-vs-single-cause distinction yet.
2. **`02_non_verbal_omission_pilot/`** — an "omission" variant (adds
   `moral_animations.py`, two additional test conditions `test1`/`test2`
   alongside the familiarization combos) — appears to test an omission-based
   manipulation not carried forward into the current design.
3. **`03_pilot_kids_version/`** — the first version built specifically for
   children (Lookit/CHS), including its own early copy of the Sherlock
   **iCatcher** pipeline (`sherlock_icatcher_pipeline/`) and a much larger
   materials set (reverse/forward test combos, a full "warmup" generation
   script, audio files). Compare its `sherlock_icatcher_pipeline/` against
   the current one in `CURRENT/04_.../04_icatcher_pipeline_children_sherlock/`
   if you need to understand how the pipeline itself evolved.
4. **`04_non_verbal_single_cause_standalone_pilot/`** — the single-cause
   context built and piloted **on its own**, before it was merged into the
   combined study (see next item). Has its own `familiarization_trials.py`,
   `test_trials.py`, jsPsych driver (`non_verbal_single_cause_chs.js`), and
   its own copy of the iCatcher Sherlock pipeline.
5. **`05_non_verbal_full_study_pre_batch3_update/`** — the combined
   chains + familiarization study **before** the single-cause context was
   added into it (i.e., immediately prior to the version now in `CURRENT/`).
   Pulled from https://github.com/SunnyZ-cs/non_verbal_adults's
   `non_verbal_full_study/` folder (as distinct from that same repo's
   `non_verbal_full_study_updated/`, which is the current version and is
   the one already placed under `CURRENT/`).

Also relevant to this study's archive, but kept in the top-level project
archive rather than here since it predates the non-verbal paradigm's
current stimuli:

- **`../adult_pilot_early_handcoded/`** — very early adult **verbal** pilots
  (pilot 3 and pilot 4) with hand-coded response distributions (PDF) and the
  PowerPoint scenario slides used at that stage. Kept for historical
  continuity even though these predate the non-verbal paradigm and use
  different (slide-based, not procedurally-animated) stimuli.

**Response data added after the initial pass:** three adult response CSVs
recovered from Sunny's Desktop were added into this archive based on their
column structure (explicit yes/no rating questions, not looking-time):
`01_pilot1_earliest_adult_pilot/response_data/`,
`02_non_verbal_omission_pilot/response_data/`, and a newly created
`06_non_verbal_pilot2_adult_explicit_rating/response_data/` (this last one,
`non_verbal_pilot2-responses.csv`, didn't match any existing folder above by
name alone, so it was given its own numbered folder). Per Sunny, all three
are from earlier pilot versions of the adult arm — see
`CURRENT/04_study3_nonverbal_looking_time/README.md`, Section 8b.

If you need the exact commit-by-commit history of any of these folders
(beyond the coarse "here's the whole folder at that stage" snapshots this
archive provides), check the GitHub repository's own commit log at
https://github.com/SunnyZ-cs/non_verbal_adults.
