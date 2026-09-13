# Project status and next tasks

Updated September 13, 2026. Start with the [project overview](README.md), then use the study guide for your assignment. The project lead coordinates data additions and changes to studies that participants can access.

| Study | Adults | Children | Main next step |
| --- | --- | --- | --- |
| [Study 1: Baseline causal chains](current/docs/study1_baseline_causal_chains/README.md) | Data collected; adult preregistered data are here | Data collected; current dataset needs to be added | Add and analyze child data |
| [Study 2: Intention × causal chains](current/docs/study2_intention_causal_chains/README.md) | Data collected; current preregistered dataset needs to be added | Data collection ongoing | Finish child collection and analyze |
| [Study 3: Nonverbal](current/docs/study3_nonverbal/README.md) | Adult pilot data available | Child pilot/repilot data available | Clarify and document the analysis steps before the next study |
| [Single cause](current/docs/single_cause/README.md) | Adult pilot data available | Child pilot was run; underlying dataset still needs to be located | Locate child data and organize analyses |

## Immediate priorities

- **Study 1:** add the collected child dataset; confirm which experiment version produced it; recover the code behind the existing figures if available.
- **Study 2:** add the collected adult preregistered dataset. Child collection is currently ongoing; continue that work, and the project lead will add the child dataset after collection is complete. The four adult files already here are earlier pilots.
- **Study 3:** confirm secure access to the original videos, identify the experiment version for each pilot dataset, and document the steps from video to looking measures to analysis. Check the scripts that create the stimuli and prepare lab-controlled asset hosting before another deployment.
- **Single cause:** locate the child pilot dataset and identify the version it came from. An earlier pilot included at least 26 unique 3-year-olds, and existing figures show results for ages 3–6. The adult file is already here with 32 rows; determine which two rows were excluded from the reported 30-person analysis and why.

## Analysis work

We have several figures without the scripts that created them. Recover the original code where possible. For the verbal studies, build the planned shared R Markdown analysis only after the data, exclusions and analysis decisions are confirmed. For Study 3, document and check the available Python processing steps before choosing analyses for the next version.

Some existing counts need explanation: the child gaze folder named `n80` contains 73 different participant codes, and the adult single-cause file has 32 rows although 30 participants were analyzed. Keep every existing row until the reasons for exclusions are established.

When a task or collection status changes, update this page and the relevant study guide. Do not upload original participant recordings or identifying information with the update.
