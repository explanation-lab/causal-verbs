# Single cause

## What is this study asking?

How do people judge causation, fault and punishment when one person directly causes an outcome? This comparison helps us understand whether the judgments in the chain studies depend on one person's action passing through another person.

For example, a character directly breaks or cracks an object. We compare cases in which the character acts on purpose with cases in which the damage is accidental.

## What happens in the study?

Adults view illustrated stories. Children watch narrated videos and use yes/no picture buttons to answer questions. We ask whether the character caused the outcome, broke/cracked the object, was at fault and should be punished.

“Did the character cause the object to break?” and “Did the character break the object?” use different wording. The second uses a specific causal verb, sometimes called a **lexical causative**. Comparing these questions helps separate judgments about what happened from judgments about blame.

The experiment code uses **jsPsych**, a JavaScript library for presenting studies and recording browser responses. The child version is written for **Children Helping Science (CHS/Lookit)**, our online child-study platform. The version in the code folder still needs to be matched to the earlier child pilot data.

## Adults

The adult pilot has been run, and its dataset is **already present**: [single_cause_pilot1-responses.csv](../../data/single_cause/adults/single_cause_pilot1-responses.csv). A pilot is an early study used to try out the design.

The file contains **32 complete rows**, 16 per condition, while the reported analysis used **30 participants** (15 per condition). The [adult audit](adults/ANALYSIS_AUDIT.md) found no defensible exclusion rule or analytic participant list. All source rows remain unchanged. By explicit review decision, the current working developmental figure uses all 32 adults, 16 per condition, because no defensible exclusion rule was recovered; it does not claim to reconstruct the historical N=30 analysis.

The [adult experiment folder](../../code/experiments/single_cause/adults/) contains separate intentional and accidental versions. The [figure folder](../../figures/single_cause/) contains plots and images from a lab presentation. We do not yet have the code that created the figures. No separate preregistration—a document recording the hypotheses, sample size and analysis plan in advance—is currently available for this study.

## Children

The [supplied exp7 child export](../../data/single_cause/children/exp7_raw_responses.csv) is now available: 970 rows, 97 sessions and 97 unique children aged 3–6. One withdrawn session is excluded, leaving **96 children** (50 Intentional, 46 Accidental). No repeat child IDs occur. The [data guide](../../data/single_cause/children/README.md) gives exact counts and export quirks.

The [shared R Markdown workflow](../../code/R/causal_verbs.Rmd) now averages Bike/Mirror Yes/No responses within child and measure, then generates age-group means, participant-bootstrap intervals, cumulative builds and a children-only pooled summary. [New talk figures](../../figures/single_cause/talk/README.md) preserve the intentionality colors and style of Studies 1 and 2.

The existing [historical age plots](../../figures/single_cause/) remain unchanged. Their precise input snapshot and the exact deployed code revision are still unconfirmed; the new export's availability does not establish that provenance. There is no separate child preregistration here.

This guide covers the verbal single-cause study. The current nonverbal single-cause condition, which measures looking instead of verbal judgments, is part of [Study 3](../study3_nonverbal/README.md).

## What still needs to be done

- [x] Add the supplied exp7 child snapshot without changing raw values.
- [ ] Establish its exact relationship to the preserved historical child figures.
- [ ] Confirm which child experiment version produced those data and how it relates to later versions.
- [ ] Determine which two adult rows were excluded from the reported 30-person analysis and why.
- [ ] Recover the original statistical and plotting code if available.
- [x] Add the child analysis and talk outputs to the [shared workflow](../../code/R/README.md). The current working adult endpoint uses all 32 complete records; the historical N=30 exclusion decision remains unresolved.

## Where to find things

| Material | Link |
| --- | --- |
| Experiment code and stimuli | [Adults](../../code/experiments/single_cause/adults/) · [Children](../../code/experiments/single_cause/children/) |
| Participant datasets | [Adults](../../data/single_cause/adults/) · [Children](../../data/single_cause/children/) |
| Study information and population notes | [Adults](adults/README.md) · [Children](children/README.md) |
| Plots and results | [Study figure folder](../../figures/single_cause/) |
| Shared descriptive analysis | [R running guide](../../code/R/README.md) |

[Back to the project overview](../../../README.md). Work on the files assigned by the project lead; keep existing data, figures, protocols and stimuli unchanged unless a specific update has been agreed.
