# Causal verbs — Cornell Explanation Lab

We study how children and adults assign causation, fault and punishment in causal chains, how intention changes these judgments, and what nonverbal looking reveals about expectations.

**The organized, screened import is complete. Sunny's scientific handoff gaps remain unresolved.** The ordinary-Git `main` baseline and this reorganization do not constitute scientific handoff acceptance. See [project status](PROJECT_STATUS.md) and [handoff status](docs/handoff/HANDOFF_STATUS.md).

## Start here

`current/` contains the handoff-designated working versions and associated evidence. It does not certify current deployment, completed collection or reproducibility. `archive/` preserves earlier pilots and versions, with their original version names. Both separate code, data, documentation and figures, following the organization of [teleological_properties](https://github.com/cicl-stanford/teleological_properties) within the [Explanation Lab template](https://github.com/explanation-lab/research-project-template) conventions.

```text
current/
  code/
    R/                  # README only; original analysis missing
    experiments/        # study → adults/children → implementation/assets
    python/             # supplied nonverbal pipeline and limited analysis
  data/                 # study → adults/children → dataset or pilot batch
  docs/                 # study → adults/children → protocols/reports/notes
  figures/              # study → adults/children; shared/uncertain plots at study level
archive/
  code/experiments/     # study → adults/children → historical version
  code/python/          # supplied historical processing/generation helpers
  data/                 # study → adults/children → historical cohort/version
  docs/                 # study/population notes; unclassified historical material
  figures/              # historical results; unclassified historical figures
docs/                   # project-wide reproducibility and handoff provenance
reference_literature/   # background papers and shared lab talk
presentation_assets_conference_talk/
tools/handoff/          # integrity verification and historical import policy
```

Every current study has adult and child folders for experiments, data, docs and figures. A README-only folder explicitly marks missing or unassigned material. There are no `raw/` or `processed/` levels under data.

| Research line | Adult / child status | Preregistration | Data present | Analysis and major gaps |
| --- | --- | --- | --- | --- |
| [Study 1: baseline chains](current/docs/study1_baseline_causal_chains/README.md) | Adult preregistered run completed; child collection reported (26 at handoff), current data missing | Adult + child documents; immutable registration links unverified | 100 adult response rows; older pilots in archive | Original analysis/figure scripts and current child dataset missing; cohort/deployment matching open |
| [Study 2: intention × chains](current/docs/study2_intention_causal_chains/README.md) | Adult + child implementations; preregistered collection reported, child collection substantial | Adult + child documents; immutable registration links unverified | Four earlier adult pilot exports, **not** the current preregistered run | Current adult and child datasets and original analysis scripts missing |
| [Study 3: nonverbal](current/docs/study3_nonverbal/README.md) | Adult webcam pilot and child pilot/repilot; live/version status unresolved | Two prior-protocol documents; **not verified current-design preregistrations** | Adult n61 and three child pilot/repilot batches; **not verified preregistered datasets** | Gaze pipelines + one unique downstream Python script; most analyses, secure raw-data custody and protocol/deployment matching unresolved |
| [Single cause](current/docs/single_cause/README.md) | Adult pilot; child arm reported awaiting approval at handoff | No standalone preregistration supplied | 32 adult pilot response rows; reported analytic N=30 needs reconciliation | Original analysis scripts and cohort mapping missing; nonverbal single-cause condition is in Study 3 |

**No R or Rmd analysis files were supplied by Sunny.** [current/code/R/](current/code/R/) contains only a README. Supplied Study 1, Study 2 and single-cause figures cannot currently be reproduced from original analysis scripts because those scripts were not supplied. A PNG is evidence of a supplied figure, not an executable analysis. The [nonverbal pipeline](docs/NONVERBAL_REPRODUCIBILITY.md) is only partly reproducible.

## Working with this repository

Use normal Git; Git LFS is not required. Authenticate with your authorized lab GitHub account, then:

```sh
git clone https://github.com/explanation-lab/causal-verbs.git
cd causal-verbs
git pull
python3 tools/handoff/verify_import.py
```

The verification command checks preservation and static syntax; it does not run studies or analyses. All future analysis should use repository-relative input/output paths and write figures to the relevant `figures/` directory. One master Rmd is planned as **separate future work**, after original materials and analysis decisions are resolved; none was created here.

Experimental code, data and stimuli retain their screened bytes. Historical absolute/relative paths and Sunny's personal GitHub asset URLs remain in code; local execution and lab-controlled deployment require separate validation. Do not run a study, transfer helper or stimulus generator just to browse this repository.

## Provenance and access

All **2,806 retained imported files**, including the **378 privacy transformations**, are preserved; the **11 exclusions** remain excluded. [Source mapping](docs/handoff/SOURCE_MAPPING.md) and the [reorganization ledger](docs/handoff/reorganization_mapping.csv) connect every file to its screened baseline. Original README notes are preserved verbatim as `*.source.txt` under documentation/source-notes areas; the new study READMEs are authoritative. Numerical reports remain unchanged and are labeled historical.

This is a private repository containing coded research data. Raw participant video/audio, base64 recordings, identifiable exports, lookup tables and credentials belong in approved secure external storage, whose custody/access remains unresolved. See the [privacy review](docs/handoff/PRIVACY_REVIEW.md). Sunny Zhao prepared the source handoff; David Rose is the recipient. Owner/backup assignments and complete contributor roles remain to be confirmed. Existing notices are preserved; no new blanket license is asserted.
