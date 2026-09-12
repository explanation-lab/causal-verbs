# Causal verbs — Cornell Explanation Lab

This project studies how children and adults attribute causation, fault and punishment to distal and proximal agents, how intention changes those judgments, and what nonverbal looking patterns reveal about expectations. The organization repository preserves Sunny Zhao's September 12, 2026 handoff from the Stanford Markman Lab for continued work in the Cornell Explanation Lab.

**This is an organized, screened handoff import, not a completed reproduction or a deployment.** Current priorities and unresolved handoff items are in [PROJECT_STATUS.md](PROJECT_STATUS.md) and [HANDOFF_STATUS.md](docs/handoff/HANDOFF_STATUS.md). The repository uses ordinary Git on `main`. Creating this baseline does not constitute scientific handoff acceptance; the unresolved gaps remain explicit.

## Studies

| Research line | Entry point | Available evidence |
| --- | --- | --- |
| Study 1 — baseline causal chains | [Study 1](current/study1_baseline_causal_chains/README.md) | Adult/child experiment implementations and editable materials; adult baseline responses; preregistration documents; figures |
| Study 2 — intention × causal chains | [Study 2](current/study2_intention_causal_chains/README.md) | Intentional/accidental adult and child implementations; four unordered adult pilot datasets; preregistration documents; figures |
| Study 3 — nonverbal looking-time studies | [Study 3](current/study3_nonverbal_looking_time/README.md) | Animation source and generated stimuli, child/adult experiments, gaze-processing pipelines, four processed gaze batches, reports and one downstream analysis script |
| Single-cause studies | [Single cause](current/single_cause/README.md) | Standalone verbal adult/child implementations and adult pilot responses; archived standalone nonverbal pilot; the current nonverbal single-cause condition is part of Study 3 |

## Organization

```text
current/
  study1_baseline_causal_chains/
  study2_intention_causal_chains/
  study3_nonverbal_looking_time/
  single_cause/
archive/
  study1_verbal/
  study2_verbal/
  study3_nonverbal/
  single_cause/nonverbal_standalone_pilot/
  adult_pilot_early_handcoded/
docs/
  NONVERBAL_REPRODUCIBILITY.md
  handoff/
reference_literature/
presentation_assets_conference_talk/
tools/handoff/
```

The study-centered layout follows the flexible [Explanation Lab research template](https://github.com/explanation-lab/research-project-template) and the lab's `current/` versus `archive/` convention. Code, data, editable stimulus sources, generated media and figures stay together within the relevant study/version. Historical filenames and internal experiment asset paths are retained where possible. `docs/` contains the handoff documents explicitly requested for this import; no browser output or GitHub Pages deployment is configured.

Original top-level study notes are retained as `HANDOFF_README.md`. Other imported READMEs remain historical source documentation. Their assertions about completeness, live studies, registration, safe data or software versions are not independent verification. Use the new status and reproducibility documents for the audited import state.

## Access and reproduction

All files, including media and editable PowerPoint sources, are stored in ordinary Git. Git LFS is not required. A full checkout is approximately 4.8 GB before Git storage; identical files share Git objects.

```sh
git clone https://github.com/explanation-lab/causal-verbs.git
cd causal-verbs
python3 tools/handoff/verify_import.py
```

The verification command checks imported file hashes and basic source syntax without running studies or collecting data. It does not reproduce results. See [NONVERBAL_REPRODUCIBILITY.md](docs/NONVERBAL_REPRODUCIBILITY.md) for the source → stimuli → experiment → recording/export → gaze coding → data → analysis → results pipeline. Missing scripts, paths and timing outputs are intentionally left explicit.

Study 1, Study 2 and single-cause verbal results cannot yet be regenerated from the supplied code. The available nonverbal fair/unfair-punishment analysis has a historical absolute input path. Experimental code still contains Sunny's personal GitHub asset URLs, historical institutional consent wording and live submission logic; importing it does not establish a Cornell-ready or locally runnable study.

## Scientific resources and provenance

Six original adult/child preregistration DOCX files are preserved for Studies 1, 2 and 3. Their presence does not establish a registered OSF record; the handoff supplies no verified study-specific registration identifiers. Single-cause verbal preregistration is absent. Reports and figures are historical results, not results recomputed for this import.

[SOURCE_MAPPING.md](docs/handoff/SOURCE_MAPPING.md) identifies the exact source revision, routing and exclusions. Its [file manifest](docs/handoff/source_manifest.csv) accounts for every handoff working-tree file outside `.git`, with original and imported checksums. Sunny's original Git history was not imported because it contains unscreened data. The separately audited older repository was not consulted.

## Contributors and data

Sunny Zhao prepared the handoff and is credited in its original documentation for study implementation, stimulus generation and processing/analysis materials. David Rose is the named handoff recipient. A complete authorship/CRediT statement and operational owner/backup assignments remain to be confirmed.

Only screened, coded research data are included. Participant/session IDs and recording filenames have been replaced with opaque codes; exact session dates were removed from derived child pilot tables. Trial responses, gaze measurements and analytic age/demographic variables are preserved. These remain restricted research data in a private repository, not a claim of irreversible anonymization. Raw participant audio/video, identifiable CHS exports, lookup tables, keys and credentials must remain outside GitHub. See [PRIVACY_REVIEW.md](docs/handoff/PRIVACY_REVIEW.md).

Original notices and the archived license are retained; no new blanket license or publication permission is asserted for the imported scientific material or background literature.
