# Study 3 — Nonverbal

## What is this study asking?

Can people's looking patterns tell us whom they expect to be punished after something goes wrong? This study uses **nonverbal measures**: we measure where and how long participants look, rather than relying on their spoken answers.

Some animations show a **causal chain**, where one character's action causes another character to produce the final outcome. Others show a single character directly causing it. The earlier character in a chain is sometimes called the **distal** cause; the later one is the **proximal** cause.

## What happens in the study?

Participants watch animated characters cause an outcome and see a star character punish one of them. Practice scenes introduce the events. In the current child code, the action pauses before and after punishment so we can measure looking during those periods. A webcam records the participant's face during the relevant trials.

**Gaze coding** means turning the video into measurements of looking direction. The child processing code uses **iCatcher**, software that classifies looking left, right or away. The adult code uses **MediaPipe**, software that tracks facial and eye landmarks to estimate looking. These measurements can then be compared across trials and participants.

The browser experiments use **jsPsych**, a JavaScript library for presenting materials and recording responses. The child version uses **Children Helping Science (CHS/Lookit)**, an online child-study platform; the adult version uses **Proliferate**, an online experiment platform.

## Adults

An adult webcam pilot dataset is available for **61 participants** in [adults_pilot_mediapipe_n61/](../../data/study3_nonverbal/adults/adults_pilot_mediapipe_n61/). A pilot is an early study used to try out the design. There are 122 rows in the combined summary table; rows represent trial summaries, not 122 different people.

The [adult experiment code](../../code/experiments/study3_nonverbal/adults/), [MediaPipe processing code](../../code/python/study3_nonverbal/mediapipe/README.md) and [adult figures](../../figures/study3_nonverbal/adults/) are available. The original videos and some detailed per-frame output referenced in the tables are not stored here.

The [earlier adult protocol](adults/prior_protocols/exp3_adults.docx) describes an explicit-rating study in which participants give answers. It should not be assumed to be the plan for this webcam version. Before the next study, confirm which written plan applies and which experiment version produced the existing pilot data.

## Children

Three child pilot/repilot datasets are available. A repilot tests a revised version of a design.

| Folder | Participants in the available summaries | What to know |
| --- | ---: | --- |
| [children_pilot_batch1_n80](../../data/study3_nonverbal/children/children_pilot_batch1_n80/) | 73 | The folder says n80; we need to explain the difference |
| [children_pilot_2yo_toddler_batch_n7](../../data/study3_nonverbal/children/children_pilot_2yo_toddler_batch_n7/) | 7 | Toddler pilot |
| [children_repilot_batch3_with_single_cause_n29](../../data/study3_nonverbal/children/children_repilot_batch3_with_single_cause_n29/) | 29 | Revised pilot with chains and single-cause trials; detailed gaze labels and additional summary tables are included |

These are pilot datasets. They should not be treated as a completed main study simply because code or a protocol document is present. The [current child code and stimuli](../../code/experiments/study3_nonverbal/children/) include design changes that still need to be matched to the earlier recordings.

The [earlier child protocol](children/prior_protocols/exp3_children.docx) is available, but we need to establish how it relates to the next planned version. A preregistration records hypotheses, sample size and analysis plans in advance; these earlier documents are not a substitute for confirming the plan for the next study. [Child figures](../../figures/study3_nonverbal/children/) and [existing reports](children/reports/) show previous results.

## What still needs to be done

- [ ] Confirm where the original participant videos are securely stored and that the assigned researchers have permission to access them. Keep raw video/audio and identifying information outside GitHub, including recordings embedded in spreadsheet exports.
- [ ] Confirm which experiment version produced each pilot dataset, and explain the 73-versus-80 participant count.
- [ ] Document and check the steps from participant video → gaze coding → data tables → analysis → figures, starting with the [Python guide](../../code/python/study3_nonverbal/README.md).
- [ ] Recover missing analysis scripts, detailed adult gaze outputs and the software versions needed to run the processing code.
- [ ] Check that the stimulus-generation scripts reproduce the actual study stimuli, using a separate output location so existing stimuli are not overwritten. Fix output paths; recover or check the missing timing files that specify animation durations.
- [ ] Document how the introductory, ending and practice videos and sound cues were made.
- [ ] Move experiment assets to lab-controlled hosting before deploying the study again. The adult and child code currently load different sets of media from an external personal GitHub account.
- [ ] Confirm the written study plan and decide which analysis will be used for the next version.

There is substantial Python processing code, plus one existing analysis script in two identical copies. We still need several scripts behind the reports and plots. Looking left or right also cannot separate looking at the star from looking at a character when they overlap on screen; take that into account when deciding what the next analysis can answer.

## Where to find things

| Material | Link |
| --- | --- |
| Experiment code and stimuli | [Adults](../../code/experiments/study3_nonverbal/adults/) · [Children](../../code/experiments/study3_nonverbal/children/) |
| Participant datasets | [Adults](../../data/study3_nonverbal/adults/) · [Children](../../data/study3_nonverbal/children/) |
| Study information and earlier protocols | [Adults](adults/README.md) · [Children](children/README.md) |
| Plots and results | [Study figure folder](../../figures/study3_nonverbal/) |
| Processing and analysis | [Python guide](../../code/python/study3_nonverbal/README.md) |

[Back to the project overview](../../../README.md). Work on the files assigned by the project lead; keep existing data, figures, protocols and stimuli unchanged unless a specific update has been agreed.
