# Causal responsibility — Cornell Explanation Lab

This repository contains the studies in our causal responsibility project. We study how children and adults decide what caused an outcome, who is at fault, and who should be punished. Some studies examine chains of events, some compare intentional and accidental actions, and others measure where people look instead of asking them to explain their judgments.

## Start with your study

If you are joining a project, start in `current/` and read the README for your assigned study. Do not work from `archive/` unless the study README specifically tells you to look there.

```text
current/    = studies and materials we are currently using
archive/    = older pilots and previous versions
```

Inside `current/`, each study has four main parts:

```text
code/       = experiment and analysis code
data/       = participant datasets
docs/       = preregistrations and study information
figures/    = plots and results
```

Each part uses the same study names and has adult and child folders. Experiment code is in `code/experiments/`; analysis and processing code are in `code/R/` and `code/python/`. A folder containing only a README usually marks where a file will go once it is available. Some figures sit directly in a study's figure folder because they combine age groups or still need to be matched to a dataset.

## Where the studies stand

Updated September 13, 2026. The links below take you directly to the four study guides.

| Study | Adults | Children | Main next step |
| --- | --- | --- | --- |
| [Study 1: Baseline causal chains](current/docs/study1_baseline_causal_chains/README.md) | Data collected; adult preregistered data are here | Data collected; current dataset needs to be added | Add and analyze child data |
| [Study 2: Intention × causal chains](current/docs/study2_intention_causal_chains/README.md) | Data collected; current preregistered dataset needs to be added | Data collection ongoing | Finish child collection and analyze |
| [Study 3: Nonverbal](current/docs/study3_nonverbal/README.md) | Adult pilot data available | Child pilot/repilot data available | Clarify and document the analysis steps before the next study |
| [Single cause](current/docs/single_cause/README.md) | Adult pilot data available | Child pilot was run; underlying dataset still needs to be located | Locate child data and organize analyses |

A **pilot** is an early study used to try out a design or method; a repilot tests a revised version. A **preregistration** records the study's hypotheses, planned sample size and analysis plan before the main data are analyzed. Study 1 and Study 2 have adult and child preregistration documents. Study 3 has earlier protocol documents that need to be checked against the next planned version. Single cause has no separate preregistration here.

## Your first tasks

1. Read your assigned study guide and its adult or child section.
2. Open the experiment materials, dataset descriptions and figures linked there. You can read code and documents on GitHub without running an experiment.
3. Review the study's checklist with the project lead and choose a specific task. [PROJECT_STATUS.md](PROJECT_STATUS.md) lists the immediate priorities.

We have result figures for the verbal studies, but we do not yet have the code that created them. No R or R Markdown analysis files are currently available. R is a programming language used for statistics; R Markdown combines written explanations, R code and results in one document. The planned [shared R analysis](current/code/R/README.md) will be built after the relevant datasets and analysis decisions are confirmed. Do not guess the original analysis from the plots.

## Working on files

Git records changes to files; GitHub holds the lab's shared copy. Cloning makes a copy on your computer, pulling gets shared updates, committing records your changes, and pushing sends those commits to GitHub. Use your authorized lab GitHub account. This project uses normal Git and does not require Git LFS.

```sh
git clone https://github.com/explanation-lab/causal-verbs.git
cd causal-verbs
git pull
```

Work on the files assigned to you in `current/`, and update the relevant study README when agreed tasks or collection status change. Keep these boundaries in mind:

- Leave existing datasets, preregistrations and original figures unchanged. Coordinate new data additions with the project lead. Do not overwrite existing stimuli—the pictures, sounds and videos shown to participants.
- Leave `archive/`, original source notes and internal record-keeping files alone unless you have a specific task involving them.
- Keep raw participant video/audio, identifying information and access credentials out of GitHub. Participant data in this private repository are for authorized research use.
- Inspect code as files; do not change a live Children Helping Science (CHS/Lookit) study just to see how it works. CHS/Lookit is the online platform used for many of our child studies. Some experiment code still loads media from an external personal GitHub account; move those assets to lab-controlled hosting before deploying the study again.
- Use **relative paths** in future analysis: file locations within the project, rather than locations tied to one person's computer. Save new figures into the matching `current/figures/` study folder.

For background reading and slides, see [reference material](reference_literature/README.md) and [shared presentation images](presentation_assets_conference_talk/README.md).
