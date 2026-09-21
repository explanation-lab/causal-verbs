# Presentation V2 synthesis figures

The [compact Single Cause V4](SINGLE_CAUSE_V4.md) preserves V3 and adds a 14 × 9.5-inch version with thicker solid lines, larger shapes and stronger black outlines, including the same six cumulative builds and a CI backup.

The new [four-measure role-preference and one-panel Single Cause additions](ADDITIONAL_SYNTHESES.md) have separate main/CI figures, 11 cumulative builds and numerical tables. All original V2 outputs documented below remain unchanged.

These presentation figures are additions. Every previous synthesis, yes-response figure, baseline-change figure and build remains unchanged. The existing participant-first summary tables supply all means, Ns and intervals; inclusion rules, age groups, weights, adult samples, scenario averaging and response coding are unchanged. The [shared R Markdown workflow](../../../code/R/causal_verbs.Rmd) generates all outputs.

## Final figures and separate uncertainty backups

Every figure is a vector PDF and a 5280 × 2040 PNG (22 × 8.5 inches at 240 dpi). The main figures and all builds have **no confidence intervals**.

| Figure | Main | CI backup | Unchanged numerical table |
| --- | --- | --- | --- |
| Punishment by causal target | [PDF](punishment_causal_structure_talk_v2.pdf) · [PNG](punishment_causal_structure_talk_v2.png) | [PDF](punishment_causal_structure_talk_v2_with_ci.pdf) · [PNG](punishment_causal_structure_talk_v2_with_ci.png) | [18 means, Ns and CIs](punishment_causal_structure_talk_v2_values.csv) |
| Caused/Lexical role preference | [PDF](caused_lexical_role_preference_talk_v2.pdf) · [PNG](caused_lexical_role_preference_talk_v2.png) | [PDF](caused_lexical_role_preference_talk_v2_with_ci.pdf) · [PNG](caused_lexical_role_preference_talk_v2_with_ci.png) | [18 contrasts, Ns and CIs](caused_lexical_role_preference_talk_v2_values.csv) |
| Single Cause intention sensitivity | [PDF](single_cause_intention_sensitivity_talk_v2.pdf) · [PNG](single_cause_intention_sensitivity_talk_v2.png) | [PDF](single_cause_intention_sensitivity_talk_v2_with_ci.pdf) · [PNG](single_cause_intention_sensitivity_talk_v2_with_ci.png) | [12 contrasts, source means, Ns and CIs](single_cause_intention_sensitivity_talk_v2_values.csv) |

All panels run 3–4 → 5–6 → Adults. Punishment has three causal-target panels and two condition trajectories, on a 0–100% scale with a dashed 50% reference. Role preference has Caused and Lexical panels with Baseline/Intentional/Accidental trajectories; positive values favor Distal. Its main scale is ±80%, with five ticks; the CI backup expands to ±100% to show every bound. Single Cause has one trajectory in each of four measure panels; its main scale is −25% to 100%. Its CI backup starts at −30% to retain the existing −25.320513 lower bound. All bounds are shown without arrows or clipping.

## Design reference and exact constants

Before implementing V2, the final Study 1 victim PDF and all five victim build PDFs in cookie-task's `current/figures/study1/change_from_45_final/` were rendered and inspected. The actual helper chain was read in its `current/code/R/cookie_allocation.Rmd`: `conference_theme()` → `plot_change_from_45_v2()` → `plot_change_from_45_final()` → `plot_final_developmental_change()`. The effective theme was resolved in R; earlier prototype constants were not mistaken for the final design. The V2 scaffolds and full figures were also compared side by side with that reference at equal display widths. No cookie-task file was edited, and this workflow has no runtime dependency on that repository.

The inspected reference is pinned to cookie-task commit [`295eb985903ec38af4f5ca07df50603729e21d8b`](https://github.com/explanation-lab/cookie-task/blob/295eb985903ec38af4f5ca07df50603729e21d8b/current/code/R/cookie_allocation.Rmd). Its Rmd and reference PDFs had no local changes and remain unchanged after this work.

`theme_causal_verbs_talk()` and `talk_v2` intentionally match that final design:

| Property | Reference and V2 setting |
| --- | --- |
| Canvas | 22 × 8.5 inches |
| Typography scale | 22/12 = 1.833333… |
| Theme base size | 11 × 22/12 = 20.166667 pt; visible base text overridden to 44 pt |
| Base text, x/y ticks, panel titles | 24 × 22/12 = **44 pt**, plain face |
| Y-axis titles | 26 × 22/12 = **47.666667 pt**, wrapped across two lines |
| Legend | 23 × 22/12 = **42.166667 pt**, one centered row below panels |
| Font | Final reference uses default sans; exported reference and V2 PDFs embed **Helvetica** |
| Panel width | Equal `1null` widths; 3 panels for A, 2 for B, 4 for C |
| Panel spacing | 22/12 = **1.833333 cm** |
| Plot margins (top/right/bottom/left) | `margin(5,14,12,12) × 22/12 + margin(r=22)` = **9.166667 / 47.666667 / 22 / 22 pt** |
| Resolved strip text margins | **8.066667 pt** on each side |
| Resolved x/y tick text margins | **4.033333 pt** (top/right respectively) |
| Resolved y-title right margin | **5.041667 pt** |
| Trajectory width | **2.1 mm** at every age, fully opaque |
| Point size / stroke | **6.2 mm / 1.15 mm**, black outlines |
| Dashed reference line | **1 mm**, black; zero for B/C, 50% for A |
| Axis and tick widths | **0.65 mm**; tick length **5.041667 pt** |
| Childhood fill | **#F3F3F3**, from panel left edge through the second child tick (`xmax=2`) |
| X positions and padding | Centers **1, 2, 3**, with **0.25** expansion at both ends |
| Adults | Third equally spaced position in white region; same marks, width and full opacity |
| Legend keys | **1.558333 cm** square (`.85 × 22/12`) |
| Resolved legend margin / box margin | **10.083333 pt** on each side / **0 pt** |
| Grid/gtable changes | None in the final reference line helper or V2; the separate bar helper's .45-inch top row is not applied |

Measured from the exported PDF childhood rectangles, the main panel widths are approximately **5.49925 in (A), 8.67794 in (B), and 3.94400 in (C)**. The four-panel reference is approximately **3.97808 in** per panel. Each has the same **5.40132-inch panel height**. Small width differences follow the axis labels; panels remain equal within a figure. No manual gtable compression or independent per-figure text scaling is used.

Adaptations preserve the reference's visual weight: the established condition colors remain purple `#6A3D9A` and teal `#1B9E77`; Intentional is a filled circle/solid line and Accidental is an open triangle/dashed line. Baseline adds a gray `#666666` filled square/dotted line. Open triangles have transparent interiors to retain visibility when points overlap. The existing measure colors stay Caused red `#E41A1C`, Lexical blue `#377EB8`, Fault green `#4DAF4A`, Punish purple `#984EA3`. V2 uses fillable circle/triangle/square/diamond shapes (21/24/22/23) to add the reference's black outlines. CI backup intervals use 0.85 mm lines; CIs never enter the main builds.

## Every build

Build 00 already contains axes, titles, childhood bands, references, Adult categories and the complete legend. Fixed data positions and alpha visibility prevent movement. Adult points and their connecting segments enter only in the final build. Each final build is **byte-for-byte identical** to its full main PDF and PNG.

### A — Punishment

| Build | PDF | PNG |
| --- | --- | --- |
| build00_blank | [PDF](builds/punishment_causal_structure/build00_blank.pdf) | [PNG](builds/punishment_causal_structure/build00_blank.png) |
| build01_intentional_childhood | [PDF](builds/punishment_causal_structure/build01_intentional_childhood.pdf) | [PNG](builds/punishment_causal_structure/build01_intentional_childhood.png) |
| build02_add_accidental_childhood | [PDF](builds/punishment_causal_structure/build02_add_accidental_childhood.pdf) | [PNG](builds/punishment_causal_structure/build02_add_accidental_childhood.png) |
| build03_add_adults_full | [PDF](builds/punishment_causal_structure/build03_add_adults_full.pdf) | [PNG](builds/punishment_causal_structure/build03_add_adults_full.png) |

### B — Role preference

| Build | PDF | PNG |
| --- | --- | --- |
| build00_blank | [PDF](builds/caused_lexical_role_preference/build00_blank.pdf) | [PNG](builds/caused_lexical_role_preference/build00_blank.png) |
| build01_baseline_childhood | [PDF](builds/caused_lexical_role_preference/build01_baseline_childhood.pdf) | [PNG](builds/caused_lexical_role_preference/build01_baseline_childhood.png) |
| build02_add_intentional_childhood | [PDF](builds/caused_lexical_role_preference/build02_add_intentional_childhood.pdf) | [PNG](builds/caused_lexical_role_preference/build02_add_intentional_childhood.png) |
| build03_add_accidental_childhood | [PDF](builds/caused_lexical_role_preference/build03_add_accidental_childhood.pdf) | [PNG](builds/caused_lexical_role_preference/build03_add_accidental_childhood.png) |
| build04_add_adults_full | [PDF](builds/caused_lexical_role_preference/build04_add_adults_full.pdf) | [PNG](builds/caused_lexical_role_preference/build04_add_adults_full.png) |

### C — Single Cause

| Build | PDF | PNG |
| --- | --- | --- |
| build00_blank | [PDF](builds/single_cause_intention_sensitivity/build00_blank.pdf) | [PNG](builds/single_cause_intention_sensitivity/build00_blank.png) |
| build01_caused_childhood | [PDF](builds/single_cause_intention_sensitivity/build01_caused_childhood.pdf) | [PNG](builds/single_cause_intention_sensitivity/build01_caused_childhood.png) |
| build02_add_lexical_childhood | [PDF](builds/single_cause_intention_sensitivity/build02_add_lexical_childhood.pdf) | [PNG](builds/single_cause_intention_sensitivity/build02_add_lexical_childhood.png) |
| build03_add_fault_childhood | [PDF](builds/single_cause_intention_sensitivity/build03_add_fault_childhood.pdf) | [PNG](builds/single_cause_intention_sensitivity/build03_add_fault_childhood.png) |
| build04_add_punish_childhood | [PDF](builds/single_cause_intention_sensitivity/build04_add_punish_childhood.pdf) | [PNG](builds/single_cause_intention_sensitivity/build04_add_punish_childhood.png) |
| build05_add_adults_full | [PDF](builds/single_cause_intention_sensitivity/build05_add_adults_full.pdf) | [PNG](builds/single_cause_intention_sensitivity/build05_add_adults_full.png) |

## Numerical equality and validation

The three numerical CSVs are exact byte copies of the earlier candidate summaries. The Rmd checks all stored values before copying them; decorative vector names are ignored in the comparison, but values, columns and order are retained. It also checks fixed panel/axis geometry, unchanged coordinates, cumulative reveals and the expected visible point counts: A **0/6/12/18**, B **0/4/8/12/18**, C **0/2/4/6/8/12**. The final main/build layers must be identical before their identical PDF/PNG files are saved. Every saved build and all main/CI outputs are visually reviewed, not just the knitted report.

Run from the repository root:

```sh
Rscript --vanilla -e 'rmarkdown::render("current/code/R/causal_verbs.Rmd", quiet = TRUE)'
```

The sample and interpretation limitations remain those in the [earlier synthesis guide](../README.md) and [review packet](../../../code/R/REVIEW.md): Study 2 adults are the earlier pilot; the main adult dataset is missing. Single Cause uses all 32 recovered adults; historical N=30 exclusions are unidentified. These graphics are descriptive cross-sectional comparisons. Scientific handoff gaps remain unresolved.

Validation completed cleanly with no R warnings/errors. All 15 builds and six main/CI views were inspected, with the full PDFs also independently rasterized for review. PDF text bounds stay within every page. All **175 pre-existing PDF/PNG files**, **11 previous figure-value CSVs**, and **2,806 imported source files** remain byte-for-byte unchanged. Re-rendered old PDFs were restored only after their complete page content/resources were verified identical, preserving their original metadata bytes too. The three final main/build PDF and PNG pairs are byte-identical.

[OUTPUTS.csv](OUTPUTS.csv) lists every V2 final, backup, build and numerical-table path relative to this directory.
