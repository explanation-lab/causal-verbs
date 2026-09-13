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

The file contains **32 rows**, while the reported analysis used **30 participants** (15 per condition). We need to determine which two rows were excluded and why. Leave all rows in the existing file until this is clarified.

The [adult experiment folder](../../code/experiments/single_cause/adults/) contains separate intentional and accidental versions. The [figure folder](../../figures/single_cause/) contains plots and images from a lab presentation. We do not yet have the code that created the figures. No separate preregistration—a document recording the hypotheses, sample size and analysis plan in advance—is currently available for this study.

## Children

**An earlier child single-cause pilot was run.** It included at least **26 unique 3-year-olds**, and existing child figures show results broken down by ages **3–6**. The underlying child participant dataset is not currently in the repository.

The age plots, including [plot_age_3.png](../../figures/single_cause/plot_age_3.png) through [plot_age_6.png](../../figures/single_cause/plot_age_6.png), remain in the study-level figure folder. Locate the data behind these plots and confirm which child experiment version produced them. We still need to clarify how that earlier pilot relates to the [code and materials currently here](../../code/experiments/single_cause/children/).

The [child data folder](../../data/single_cause/children/) is where the participant dataset will go once it is located and prepared for the repository. There is no separate child preregistration here.

This guide covers the verbal single-cause study. The current nonverbal single-cause condition, which measures looking instead of verbal judgments, is part of [Study 3](../study3_nonverbal/README.md).

## What still needs to be done

- [ ] Locate and add the child pilot dataset underlying the existing child figures.
- [ ] Confirm which child experiment version produced those data and how it relates to later versions.
- [ ] Determine which two adult rows were excluded from the reported 30-person analysis and why.
- [ ] Recover the original statistical and plotting code if available.
- [ ] Build the new [shared analysis workflow](../../code/R/README.md) after these points are clarified.

## Where to find things

| Material | Link |
| --- | --- |
| Experiment code and stimuli | [Adults](../../code/experiments/single_cause/adults/) · [Children](../../code/experiments/single_cause/children/) |
| Participant datasets | [Adults](../../data/single_cause/adults/) · [Children](../../data/single_cause/children/) |
| Study information and population notes | [Adults](adults/README.md) · [Children](children/README.md) |
| Plots and results | [Study figure folder](../../figures/single_cause/) |
| Future shared analysis | [R analysis plan](../../code/R/README.md) |

[Back to the project overview](../../../README.md). Work on the files assigned by the project lead; keep existing data, figures, protocols and stimuli unchanged unless a specific update has been agreed.
