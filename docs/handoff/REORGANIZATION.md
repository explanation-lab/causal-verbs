# Reorganization and preservation verification

Date: 2026-09-13. Baseline: `b38896ab5bb5a6649df58701b573612d19f7428e`. Scope: organization and documentation only. The screened import is complete; scientific handoff acceptance remains unresolved.

## What changed

Current and archived material now use code, data, docs and figures, with the same four study names and adult/child population folders. Historical versions and useful filenames remain intact. Operational stimuli stay with experiments; generated results and participant data are separated from code. Data have no added raw/processed sublevels.

The pass used `git mv` for 2,703 existing paths and rewrote the navigation/status documentation. All 29 original README-style notes are preserved verbatim as `.source.txt` exhibits; six original numerical reports and the shared slide manifest remain unchanged as Markdown. New READMEs distinguish the historical notes from the authoritative study guides. The original import script remains unchanged as historical provenance. The maintenance verifier changes only its known-malformed-JSON destination and an obsolete LFS error message.

## Preservation checks

- **All 2,806 imported files remain byte-for-byte identical to the screened baseline**, including all 378 transformed imports. SHA-256 checks cover 4,801,356,753 imported bytes, with a one-to-one path map and preserved Git file modes. No scientific file, duplicate, numerical result, stimulus or editable source was dropped, modified, generated, recompressed or substituted.
- The [reorganization ledger](reorganization_mapping.csv) records every imported old/new path, baseline blob ID, SHA-256, byte count and mode. [source_manifest.csv](source_manifest.csv) changes destination paths only. All 11 exclusion rows are unchanged. [data_transformations.json](data_transformations.json) changes destination paths only; no transformation was rerun.
- The existing import verifier checks the relocated hashes, 108 supplied Python files, 26 shell/SLURM files and eight JSON files. The known malformed historical JSON remains explicitly accounted for; no scientific program was executed.
- Every current and archived study has adult and child folders under experiments, data, docs and figures. README placeholders distinguish absent/unassigned materials. Only Studies 1 and 2 have populated current adult/child `preregistration/` directories (four DOCX files). Study 3's two documents are in `prior_protocols/`; single cause has no standalone preregistration.
- The entire working tree contains **zero `.R` files and zero `.Rmd` files**, including case variants. `current/code/R/` contains only its README. The future master Rmd and recovery of original analysis are separate work.
- Active Markdown navigation was checked against the new paths. Original source-note exhibits and provenance-ledger old-path fields are historical records, not navigation. Experimental code and external hosting URLs were not rewritten.
- Ordinary Git attributes and privacy ignore rules are unchanged. No LFS tracking was introduced. New material consists of repository documentation/provenance records and the two-string maintenance-verifier adjustment; all scientific/participant-bearing content is the same screened content. No raw participant recording or credential was introduced. A redacted Gitleaks working-tree scan found no secrets; this supplements, rather than replaces, the original privacy audit and byte-identity proof.

## Classification limits

- Eight `Fig.*.png` files are preserved in [unclassified historical figures](../../archive/figures/unclassified_historical/published_summary_figures/); study, population, cohort and generating code are unconfirmed.
- Verbal summary plots/talk extracts remain at their study-level figure directories when a reliable population/cohort assignment is unavailable or the figure combines populations. Single-cause `plot_age_3.png`–`plot_age_6.png` particularly need cohort confirmation given the handoff's child-approval status. They are not evidence that the missing current child datasets were supplied.
- Archived Study 1 psychological-verb versions and pilot1 derivatives keep their source-designated grouping. The source explicitly questions the Study 1/2 boundary for the `exp2` version; no new assignment was inferred.
- The archived Study 3 `non_verbal_pilot2-responses.csv` has an adult explicit-rating classification but lacks a confirmed matching implementation.
- The supplied P-card `generate_pdf.py` and `summary.pdf` remain [unclassified historical support](../../archive/docs/unclassified_historical/README.md), not analysis. The script's referenced receipts are unavailable.
- [Image_20260528_205703.jpg](../../presentation_assets_conference_talk/Image_20260528_205703.jpg) remains a screened presentation asset with unconfirmed exact study/use.

The early adult hand-coded pilots 3/4 were classifiable as intention-chain precursors from the actual slide text and original notes. Their decks and paired distribution PDFs now live in [archived Study 2](../../archive/docs/study2_intention_causal_chains/README.md), retaining pilot identifiers.

## Duplicate and path issues retained

The 2,806 imported files represent **1,711 unique byte contents**. There are **445 groups of identical files**, accounting for **1,095 additional copies**. All copies remain; there was no deduplication. These counts include repeated assets, source notes and historical utilities, not just independent scientific datasets.

Examples include the current/archive Study 2 v4 overlap, both current nonverbal CHS drivers, both `unfair_punishment_analysis.py` copies, and the duplicated batch-3 reports/deck. Directory names retain the original version or source-copy context; neither copy is presented as a second independent analysis.

The repository-wide text/path search found historical absolute paths in the unfair-punishment analysis copies and the archived omission generator, plus generator references to `../materials/`. The unchanged historical import script retains pre-reorganization routing strings. Source notes retain original path wording in plain-text exhibits. Active Markdown no longer links to moved locations.

Separating files exposes existing path assumptions; it does not repair them. In particular:

- Current nonverbal generators still write locally and conditionally copy to `../materials/`, while retained outputs are [child experiment stimuli](../../current/code/experiments/study3_nonverbal/children/generated_stimuli/). Timing JSON outputs remain missing.
- Historical nonverbal generators/preprocessors now reside under Python while their stimuli/data reside in experiments/data. Their fixed or working-directory-based paths need a separate, validated cleanup. Cluster helper sets remain together to preserve internal script references.
- The archived Study 2 free-response `data.csv`/malformed `data.json` now reside under data; their unchanged conversion helper still assumes local filenames. Archived child parsing code references excluded identifiable exports. Neither was executed.
- The P-card helper refers to historical receipts outside its directory; no missing financial files were added.
- Sunny's personal asset hosting remains in the experiment code. Current adult and child nonverbal drivers reference different historical asset sets. The current adult dependency is documented alongside the preserved [archived child pilot assets](../../archive/code/experiments/study3_nonverbal/children/03_pilot_kids_version/materials/).

No live study, platform, recruitment or external hosting configuration changed. Missing scripts, current datasets, secure custody, protocol/version matching, asset sources, output paths and timing files remain in [HANDOFF_STATUS.md](HANDOFF_STATUS.md) and [NONVERBAL_REPRODUCIBILITY.md](../NONVERBAL_REPRODUCIBILITY.md). This organizational validation does not reproduce results or accept the scientific handoff.
