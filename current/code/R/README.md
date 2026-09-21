# R analysis

The [intention-sensitivity companion](../../figures/study_comparison/presentation_v2/INTENTION_SENSITIVITY_ACROSS_CONTEXTS.md) compares Intentional-minus-Accidental effects across Single Cause and both chain roles in four presentation panels. It reuses validated participant means, preserves existing Single Cause intervals, and includes a separate CI backup and cumulative builds.

The [additional presentation syntheses](../../figures/study_comparison/presentation_v2/ADDITIONAL_SYNTHESES.md) add four-measure role preference and a one-panel Single Cause sensitivity candidate. Their 30 PDF/PNG outputs, 11 builds and two numerical CSVs are indexed separately; all previous figures remain byte-for-byte unchanged. The existing participant-first calculations and shared presentation helper are reused.

[causal_verbs.Rmd](causal_verbs.Rmd) is the shared descriptive workflow for verbal causal-chain Studies 1 and 2 and the Single Cause adult/child comparison. R Markdown combines explanations, R code, tables and figures in one document. The [HTML report](causal_verbs.html) includes the inclusion flow, repeated-session audit, sample sizes, response patterns, pilot comparison, directly verified plotted means and Ns, and plotting checks.

This is a **new reproducible reconstruction**, not recovered original analysis code. It does not fit inferential models or establish that the original figures have been reproduced. Study 3 analysis and the historical Single Cause adult N=30 subset remain unresolved.

## Run the workflow

Install R, Pandoc (included with RStudio), and the packages `dplyr` (1.1 or newer), `tidyr`, `readr`, `ggplot2` (3.5 or newer), `knitr`, `rmarkdown` and `ragg`. In R, missing packages can be installed with:

```r
install.packages(c("dplyr", "tidyr", "readr", "ggplot2", "knitr", "rmarkdown", "ragg"))
```

Open `causal_verbs.Rmd` in RStudio and click **Knit**, or run this command from the repository root:

```sh
Rscript --vanilla -e 'rmarkdown::render("current/code/R/causal_verbs.Rmd")'
```

R Markdown evaluates the chunks from `current/code/R/`; input paths begin with `../../data/`, and figure paths with `../../figures/`. You do not need to change paths to match your computer. Re-running replaces only this workflow's new report and talk outputs. Leave historical figures and datasets unchanged.

## Inputs and analysis choices

- Study 1 adults: [preregistered N=100 CSV](../../data/study1_baseline_causal_chains/adults/chains_baseline_full_run-responses.csv).
- Study 1 children: [current supplied export](../../data/study1_baseline_causal_chains/children/exp4_raw_responses.csv), with 211 eligible unique children after selecting one attempt per child.
- Study 2 adults: all four [earlier pilots](../../data/study2_intention_causal_chains/adults/adult_pilot_rounds_unordered/) are audited separately. Only `exp2_new_pilot-responses.csv` supplies the plotted adult comparison (41 adults). The preregistered main adult dataset remains missing.
- Study 2 children: [current supplied snapshot](../../data/study2_intention_causal_chains/children/exp6_raw_responses.csv), with 406 eligible unique children. Collection remains ongoing.
- Single Cause children: [supplied exp7 export](../../data/single_cause/children/exp7_raw_responses.csv), with 96 included unique children aged 3–6, after excluding one withdrawn session. No repeat child IDs occur.
- Single Cause adults: all 32 complete rows in the existing file supply the Adult endpoint (16 per condition); no unsupported exclusions are applied. The [historical N=30 subset remains unresolved](../../docs/single_cause/adults/ANALYSIS_AUDIT.md).

Child eligibility uses the supplied analysis/completion/exclusion fields and actual answered test questions. `included_in_summary` is ignored. The Study 2 `completed` flag is False throughout and is not used to filter. Among eligible repeat attempts, keep the one with most answered test questions, breaking ties by latest creation time. This removes three extra Study 1 sessions and four extra Study 2 sessions. No more specific repeat-attempt rule was recovered.

These are **uncapped descriptive snapshot samples**, not finalized preregistered samples. The Study 1/Study 2 child preregistrations specify the first 30 eligible children per age cell (per condition in Study 2), ordered by completion time. Some current cells exceed 30. The supplied creation times do not establish completion order, and the exports do not independently verify unassisted answers. Review those issues before a registered analysis.

Retain each agent’s binary answer: Yes = 1, No = 0. “Both” contributes 1 to both roles; “neither” contributes 0 to both. Average available Bike/Mirror responses within participant × measure × role, then average those participant means within each age/adult × condition group. Missingness is question-specific; one missing response never removes the other role’s answer. Fixed-seed participant bootstraps provide descriptive 95% intervals. The report directly verifies every plotted mean and N against the binary responses and retains both/neither patterns only as an audit. Summaries are computed once and reused across all builds.

## Outputs

The [presentation V2 guide](../../figures/study_comparison/presentation_v2/README.md) documents the shared `theme_causal_verbs_talk()` helper, exact cookie-task reference constants, six main/CI outputs and all 15 builds. V2 changes only presentation, reusing the existing 48 estimates, Ns and bootstrap intervals. Build 00 keeps the complete scaffold, and each final build equals its full main PDF/PNG. Earlier figures and analysis choices remain unchanged.



The main talk comparison is the [change-from-baseline figure](../../figures/study_comparison_baseline_change/baseline_change_full.png), with [vector PDF](../../figures/study_comparison_baseline_change/baseline_change_full.pdf), [exact plotted values](../../figures/study_comparison_baseline_change/baseline_change_plotted_means.csv) and [Builds 00–04](../../figures/study_comparison_baseline_change/builds/). It has measure columns and role rows. Each point is Study 2 Intentional or Accidental minus the matching Study 1 mean, displayed in percentage points around zero. The intervals bootstrap both studies; the same baseline draw is reused for both contrasts. This is a descriptive comparison between study samples, with the same pilot/cohort limitations, not within-person change. See the [comparison guide](../../figures/study_comparison_baseline_change/README.md).

The [age-pooled Study 2 gap summary](../../figures/study_comparison_baseline_change/study2_distal_proximal_gap_summary.png) compares participant-level Distal-minus-Proximal gaps between Intentional and Accidental. Average scenarios within child and role first, subtract roles within that child, then average the paired gaps within condition. The single panel has four within-measure connectors, eight points and participant-bootstrap 95% intervals. It pools children aged 3–9 (206 Intentional, 200 Accidental), weights children equally within condition and excludes the adult pilot. The [eight-row CSV](../../figures/study_comparison_baseline_change/study2_distal_proximal_gap_summary_values.csv) contains exact gaps, paired Ns, source role means and intervals. The intentionality-related widening is largest for Punish, then Lexical, Fault and Caused; unequal age composition is not adjusted.

The baseline-change axis is labeled `Change from baseline (%)` and spans -50% to 50%. All observed means fit; four CI ends outside that range are clipped at the panel boundary without arrows. Both this axis and the new gap summary's percentage ticks represent percentage-point differences. The gap summary includes a zero reference and displays all interval bounds.

The [Single Cause talk folder](../../figures/single_cause/talk/README.md) contains a four-panel developmental figure (ages 3–6 plus all 32 recovered adults), Builds 00–16 and a pooled children-only paired-point summary. Colors reuse `comparison_colors` from Settings. A dashed 50% visual reference now matches Study 2; it is not a chance-model assumption. Within each panel, builds add Intentional adults, Intentional children, Accidental adults and Accidental children. The historical N=30 subset remains unidentified; the working adult sample is N=32. Exact means, Ns and CIs are saved in two CSVs. The raw exp7 values are unchanged; `completed` and `included_in_summary` do not determine inclusion, and warmups never enter scientific scores.

The new [cross-study synthesis](../../figures/study_comparison/README.md) compares Intentional-minus-Accidental effects for Single Cause, Study 2 Distal and Study 2 Proximal. It uses children aged 3–6 in both studies (Single Cause 50/46; Study 2 107/116 Intentional/Accidental), without pooling adults or Study 1. Whole-participant bootstrap intervals include both conditions' uncertainty. The [12-row CSV](../../figures/study_comparison/study2_singlecause_intention_effect_comparison_values.csv) gives exact source means, Ns, effects and intervals.

Three additional [developmental-stage synthesis figures](../../figures/study_comparison/README.md) show Punish by causal target, horizontal Single Cause intention dumbbells, and Caused/Lexical role mapping across Study 1 Baseline and Study 2 conditions. Their columns are children aged 3–4, children aged 5–6 and Adults; children aged 7–9 remain in the original developmental figures. Each new plot has its own exact-value CSV and Rmd table containing means, eligible/contributing Ns and participant-bootstrap 95% intervals. The earlier intention-effect plot remains available as a backup. The condition-manipulated proximal series varies the distal person's intention, not the proximal person's own intention.

The [additional candidate syntheses](../../figures/study_comparison/README.md#additional-candidate-syntheses-main-and-ci-versions) add a horizontal punishment figure, Caused/Lexical paired-scenario role preference, and Single Cause intention sensitivity. Each has a main no-CI version and a separate CI backup; existing figures and builds remain unchanged. The Rmd includes the exact plotted values, participant Ns and intervals below each section, with full-precision CSVs beside the figures. All use the same 3–4, 5–6 and Adult groups and documented source samples. The role-preference contrast pairs the two roles within each scenario before participant averaging; missing either role drops only that scenario's contrast. Single Cause intention-sensitivity intervals bootstrap independent condition groups, including uncertainty in both means. Synthetic missingness checks and main/CI point-and-layout checks run during knitting.

The raw Yes-response figures remain backup outputs. Study 1's `talk/` folder contains one full figure and nine builds; Study 2 has one full figure and 17 builds, all in **vector PDF and PNG**:

- [Study 1 full figure](../../figures/study1_baseline_causal_chains/talk/study1_yes_responses_full.png) and [Builds 00–08](../../figures/study1_baseline_causal_chains/talk/builds/), at 3840 × 3072 pixels.
- [Study 2 full figure](../../figures/study2_intention_causal_chains/talk/study2_yes_responses_full.png) and [Builds 00–16](../../figures/study2_intention_causal_chains/talk/builds/), at 3840 × 3072 pixels.

Build 00 shows the complete axes and legend without results. For each panel in Caused, Lexical, Fault and Punish order, Study 1 adds adults then children; Study 2 adds Intentional adults, Intentional children, Accidental adults, then Accidental children, with both roles together. Single Cause uses the same 17-build order. Earlier results stay fixed; Study 1 Build 08, Study 2 Build 16 and Single Cause Build 16 equal their full figures. The Rmd checks fixed geometry and numerical identity, and the saved builds have been visually reviewed.

Both figures have four panels: Caused, Lexical, Fault and Punish. Color identifies role: Study 1 uses Set1 red/blue and solid lines; Study 2 uses the same Set1 red/blue, with solid filled circles for Intentional and dashed open triangles for Accidental. The y-axis is `"Yes" Responses (%)`, from 0% to 100%, with a dashed horizontal line at 50% in every panel/build. The adult endpoint is labeled `Adult` in both figures.

The selected Study 2 pilot’s **yes-rates visually match slide 17**; its exact generating script/version remains unverified. All 21 Accidental adults contribute to both Punish points: distal .309524 and proximal .047619. Pilot provenance remains explicit here and in the report.

See the [review packet](REVIEW.md), [Study 1 guide](../../docs/study1_baseline_causal_chains/README.md), [Study 2 guide](../../docs/study2_intention_causal_chains/README.md) and [project overview](../../../README.md). The original scripts and scientific handoff gaps remain unresolved.
