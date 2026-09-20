# Project status and next tasks

Updated September 20, 2026. Start with the [project overview](README.md), then use the study guide for your assignment. The project lead coordinates data additions and changes to studies that participants can access.

| Study | Adults | Children | Main next step |
| --- | --- | --- | --- |
| [Study 1: Baseline causal chains](current/docs/study1_baseline_causal_chains/README.md) | Data collected; adult preregistered data are here | Current supplied dataset added | Review descriptive plots and final sample rules |
| [Study 2: Intention × causal chains](current/docs/study2_intention_causal_chains/README.md) | Data collected; current preregistered dataset needs to be added | Collection ongoing; interim snapshot added | Continue collection; review descriptive plots |
| [Study 3: Nonverbal](current/docs/study3_nonverbal/README.md) | Adult pilot data available | Child pilot/repilot data available | Clarify and document the analysis steps before the next study |
| [Single cause](current/docs/single_cause/README.md) | Adult pilot data available | exp7 available: 96 included children, ages 3–6 | Review working N=32 adult/child figures; historical N=30 subset unresolved |

## Immediate priorities

- **Study 1:** review the new descriptive workflow using the supplied child dataset (211 unique retained children). Confirm the exact deployed version and final sample rules, including the preregistered age-cell cap; recover the original figure code if available.
- **Study 2:** add the collected adult preregistered dataset and continue child collection. The supplied interim child snapshot is now here (406 unique retained children). Review its descriptive plots, age/condition cell caps and repeat-attempt decisions. The adult comparison uses one of four earlier pilots, not the main sample.
- **Study 3:** confirm secure access to the original videos, identify the experiment version for each pilot dataset, and document the steps from video to looking measures to analysis. Check the scripts that create the stimuli and prepare lab-controlled asset hosting before another deployment.
- **Single cause:** the supplied exp7 child snapshot is now available and analyzed in the shared workflow (96 included children, no repeats). Confirm its deployment revision and relationship to historical age plots. The adult file has 32 complete rows. The current working plots use all 32 (16 per condition), as explicitly requested, because no defensible exclusion rule was recovered. The historical N=30 subset remains unidentified. See the [adult audit](current/docs/single_cause/adults/ANALYSIS_AUDIT.md).

## Analysis work

The new [shared R Markdown workflow](current/code/R/README.md) provides transparent descriptive summaries and cumulative talk plots for Studies 1 and 2. Its main talk figure now shows change from the matching Study 1 baseline to each Study 2 condition, with uncertainty from both studies; raw Yes-response figures remain backups. It uses the supplied inclusion flags, one eligible attempt per child, participant-level role-specific Yes means and bootstrap intervals. It is a reconstruction, not recovered original code or a finalized preregistered analysis. The requested descriptive child samples are uncapped; the preregistered first-30 rules, completion-time order and unassisted-response eligibility still need review. Recover the original scripts where possible. For Study 3, document and check the available Python processing steps before choosing analyses for the next version.

Some existing counts need explanation: the child gaze folder named `n80` contains 73 different participant codes, and the adult single-cause file has 32 complete rows although the historical notes report 30 participants. The working plots use all 32 without guessing exclusions. Keep every existing row until the reasons for exclusions are established.

When a task or collection status changes, update this page and the relevant study guide. Do not upload original participant recordings or identifying information with the update.
