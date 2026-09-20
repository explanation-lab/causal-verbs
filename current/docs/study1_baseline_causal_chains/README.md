# Study 1 — Baseline causal chains

## What is this study asking?

When two people's actions lead to the same outcome, do we give them the same causal responsibility and blame? We also ask whether children and adults make the same judgments.

A **causal chain** is a sequence in which one person's action leads another person to produce the final outcome. For example, Andy bumps into Suzy, and Suzy then falls into and breaks a fence. Andy is the earlier or **distal** cause; Suzy is the later or **proximal** cause.

## What happens in the study?

Adults view illustrated stories, and children watch short narrated videos. The scenarios involve a broken fence or a cracked mirror. Participants answer questions about each character:

- Did this person **cause** the outcome?
- Did this person **break** the fence or **crack** the mirror?
- Was it this person's **fault**?
- Should this person be **punished**?

The contrast between “cause the fence to break” and “break the fence” matters: a specific verb such as *break* is sometimes called a **lexical causative**. We test whether that wording changes which person people select. Children answer using yes/no picture buttons after hearing each question.

The online experiments use **jsPsych**, a JavaScript library that presents study materials and records responses in a browser. The child version runs through **Children Helping Science (CHS/Lookit)**, our online platform for child studies.

## Adults

The preregistered adult data have been collected. The [adult dataset](../../data/study1_baseline_causal_chains/adults/chains_baseline_full_run-responses.csv) is already here and contains 100 response rows.

Read the [adult preregistration](adults/preregistration/exp1_adults.docx) for the planned hypotheses, sample size and analyses. A preregistration records those plans before the main data are analyzed. The [adult experiment folder](../../code/experiments/study1_baseline_causal_chains/adults/) contains the browser code, images and editable slides.

The [existing figures](../../figures/study1_baseline_causal_chains/) are available, but we do not yet have the code that created them. Before reusing a plot, confirm which dataset and age group it shows.

## Children

The [current supplied child export](../../data/study1_baseline_causal_chains/children/) is now available, unchanged from the supplied file. The new [descriptive workflow](../../code/R/README.md) retains 211 unique children after eligibility checks and repeat-attempt selection. This uncapped snapshot is not the finalized preregistered sample.

The [child experiment code and videos](../../code/experiments/study1_baseline_causal_chains/children/) and [child preregistration](children/preregistration/exp1_children.docx) are available. We still need to confirm which experiment version produced the collected child data. New [talk figures](../../figures/study1_baseline_causal_chains/talk/) are separate from the unchanged historical figures.

## What still needs to be done

- [x] Add the current supplied child dataset without changing its values.
- [ ] Confirm which experiment version produced the child dataset.
- [ ] Recover the original statistical and plotting code if available, and identify the data behind each figure.
- [ ] Confirm the registered plan and amendments, first-30-per-age rule, completion-time ordering and unassisted-response eligibility before a registered analysis.
- [ ] Review the new [shared descriptive R analysis](../../code/R/README.md) and cumulative talk figures. Original plotting-code recovery remains unresolved.

## Where to find things

| Material | Link |
| --- | --- |
| Experiment code and stimuli | [Adults](../../code/experiments/study1_baseline_causal_chains/adults/) · [Children](../../code/experiments/study1_baseline_causal_chains/children/) |
| Participant datasets | [Adults](../../data/study1_baseline_causal_chains/adults/) · [Children](../../data/study1_baseline_causal_chains/children/) |
| Study information and preregistrations | [Adults](adults/README.md) · [Children](children/README.md) |
| Plots and results | [Study figure folder](../../figures/study1_baseline_causal_chains/) |
| Shared descriptive analysis | [R running guide](../../code/R/README.md) |

[Back to the project overview](../../../README.md). Work on the files assigned by the project lead; keep existing data, figures, protocols and stimuli unchanged unless a specific update has been agreed.
