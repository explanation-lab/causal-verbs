# Project status

Updated 2026-09-13. The screened import and repository organization are complete on ordinary-Git `main`; **scientific handoff acceptance remains unresolved**. This pass changes organization and documentation only. No study, CHS/Lookit or Proliferate configuration, recruitment setting, external asset hosting or scientific file contents were changed.

| Line | Current evidence | Still needed from Sunny |
| --- | --- | --- |
| [Study 1](current/docs/study1_baseline_causal_chains/README.md) | Adult preregistered data (100 rows), adult/child code and protocol documents, supplied plots | Current child data, original analysis/figure scripts, cohort/deployment map |
| [Study 2](current/docs/study2_intention_causal_chains/README.md) | Adult/child code, protocols, four older adult pilots and plots | Current preregistered adult and child datasets (child collection occurred), original analyses |
| [Study 3](current/docs/study3_nonverbal/README.md) | Pilot/repilot gaze summaries, limited original Python analysis, processing/generation code and reports | Most downstream scripts, secure recording/export custody, current protocol/version/deployment match, timing outputs and complete asset sources |
| [Single cause](current/docs/single_cause/README.md) | Adult pilot data and adult/child implementations, supplied plots | Analysis scripts, 32-row versus analytic-N=30 reconciliation, figure/cohort identity; standalone preregistration absent |

Collection claims describe the handoff, not a fresh dashboard check. Study 1 child N=26 was reported at handoff; its current dataset is absent. Study 2 child data remain missing despite substantial collection. The child gaze batch named `n80` contains 73 coded participants. Preserve these discrepancies rather than inferring exclusions.

No original R/Rmd analysis was supplied. The future master Rmd and relative-path execution cleanup are separate work, contingent on recovered inputs and documented analysis decisions. Supplied figures do not establish reproducibility. The full [handoff checklist](docs/handoff/HANDOFF_STATUS.md) and [nonverbal pipeline](docs/NONVERBAL_REPRODUCIBILITY.md) remain authoritative for unresolved gaps.

David and Sunny still need to confirm secure institutional data custody, an owner and backup, platform access, cohort/version mappings, immutable registrations/amendments, and the plan for lab-controlled asset hosting. No new operational checkpoint or deployment readiness is claimed. Start with the root README and the relevant study guide.
