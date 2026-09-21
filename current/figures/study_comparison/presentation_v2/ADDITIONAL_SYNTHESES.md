# Additional presentation syntheses

These two new figure families extend the [existing presentation V2 collection](README.md). They were developed on `main` from commit `e92d72ab7f9b15072e61bfb5067dcaa19b6aedd8`. The earlier punishment V2, two-panel Caused/Lexical V2, four-panel Single Cause V2, their CI backups/builds, and every earlier output remain available with their original bytes.

The [shared R Markdown workflow](../../../code/R/causal_verbs.Rmd) uses the same final cookie-task Study 1 victim design described in the [design reference](README.md#design-reference-and-exact-constants). Its actual helper code and final/build PDFs were rechecked against cookie-task commit `295eb985903ec38af4f5ca07df50603729e21d8b`. No cookie-task file was modified. There is no runtime dependency on that repository.

## Full figures and uncertainty backups

All outputs use a **22 × 8.5-inch** canvas: vector PDF and **5280 × 2040 PNG** (240 dpi). Main figures and cumulative builds have **no CIs**. Separate backups show the participant-bootstrap 95% intervals.

| New figure | Main | CI backup | Full-precision values, Ns and CIs |
| --- | --- | --- | --- |
| Four-measure role preference | [PDF](role_preference_all_measures_talk_v2.pdf) · [PNG](role_preference_all_measures_talk_v2.png) | [PDF](role_preference_all_measures_talk_v2_with_ci.pdf) · [PNG](role_preference_all_measures_talk_v2_with_ci.png) | [36-row CSV](role_preference_all_measures_talk_v2_values.csv) |
| One-panel Single Cause sensitivity (preferred talk candidate) | [PDF](single_cause_intention_sensitivity_onepanel_talk_v3.pdf) · [PNG](single_cause_intention_sensitivity_onepanel_talk_v3.png) | [PDF](single_cause_intention_sensitivity_onepanel_talk_v3_with_ci.pdf) · [PNG](single_cause_intention_sensitivity_onepanel_talk_v3_with_ci.png) | [12-row CSV](single_cause_intention_sensitivity_onepanel_talk_v3_values.csv) |

Visible ticks and panel titles remain 44 pt, y titles 47⅔ pt, and the centered legend 42⅙ pt. Trajectories are 2.1 mm, outlined points 6.2 mm with 1.15 mm black strokes, and the black dashed zero line 1 mm. The full scaffold, legend, childhood shading and Adult positions remain fixed throughout each build series. Main and CI versions also share identical axes and panel geometry.

## Four-measure role preference

Within each participant and scenario, subtract the Proximal yes/no score from the Distal score (Yes=1, No=0). Average complete scenario pairs within participant, then average participants within study, stage, condition and measure. Multiply by 100 for percentage points. Both Yes and Neither contribute zero; neither is discarded. There is no Distal/(Distal+Proximal) transformation. All current included participants have two complete scenario pairs.

This is the same participant-first computation as the retained two-panel figure. Its 18 Caused/Lexical means, Ns and interval bounds are reused exactly. Fault/Punish use the existing 5,000-replicate participant percentile-bootstrap helper and a separate fixed seed (`bootstrap_seed + 11L`), leaving all old results unchanged. All 36 means and Ns match the already validated role-specific summary table; independent raw-export calculations also reproduce every value.

The four columns are Caused, Lexical, Fault and Punish. Each runs 3–4 → 5–6 → Adults. Baseline is Study 1; Intentional and Accidental are Study 2. Their established gray filled square/dotted, purple filled circle/solid and teal open triangle/dashed styles are unchanged. Positive values favor Distal; negative values favor Proximal.

The observed means span **−57.627 to +95.000 pp**. The shared symmetric range is therefore **−100% to +100%**, derived by adding five points of padding and rounding outward to a multiple of ten. The large range is required by the adult intentional Fault estimate, not a default. The CI version uses the same range and retains every bound.

Means below are rounded to three decimals; the CSV retains full precision and each 95% CI.

| Stage | Context | N | Caused | Lexical | Fault | Punish |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| 3–4 | Baseline | 63 | 3.968 | -23.810 | 12.698 | 0.000 |
| 3–4 | Intentional | 60 | 14.167 | 0.000 | 13.333 | 15.833 |
| 3–4 | Accidental | 67 | 5.970 | -37.313 | 11.194 | 5.224 |
| 5–6 | Baseline | 59 | 26.271 | -57.627 | 24.576 | 21.186 |
| 5–6 | Intentional | 47 | 56.383 | -17.021 | 62.766 | 54.255 |
| 5–6 | Accidental | 49 | 30.612 | -52.041 | 27.551 | 13.265 |
| Adults | Baseline | 100 | 45.000 | -22.000 | 71.500 | 66.000 |
| Adults | Intentional | 20 | 70.000 | 2.500 | 95.000 | 87.500 |
| Adults | Accidental | 21 | 16.667 | -45.238 | 38.095 | 26.190 |

## One-panel Single Cause sensitivity

The contrast is 100 × (Intentional mean Yes − Accidental mean Yes). Both means come from participant-level scenario averages. These conditions contain **different participants**; this is a between-group difference. All 12 means, source means, Ns and CIs are reused without recalculation from the existing Single Cause sensitivity figure. Its new CSV is a byte-identical copy of the existing V2 values CSV. The original bootstrap independently resamples the two participant groups 5,000 times, preserving all four measures within each sampled participant row.

All four measures now share one panel. Red circles represent Caused, blue triangles Lexical, green squares Fault and purple diamonds Punish; all lines are solid. Very small fixed x offsets (−.045, −.015, +.015, +.045 relative to stage centers 1/2/3) separate nearby markers and CI bars. These are display offsets only; means, age groups and developmental ordering are unchanged. Childhood shading ends at 2.045, including both child groups and leaving Adults on white.

Observed means span **−11.058 to +90.625 pp**. The shared main/CI/build range is **−30% to +100%**, with labeled ticks at −25%, 0%, 25%, 50%, 75% and 100%. The existing lowest CI (−25.320513 pp) needs the five-point extension below −25%; sharing it prevents movement when switching to the CI backup.

| Stage | N Intentional / Accidental | Caused | Lexical | Fault | Punish |
| --- | ---: | ---: | ---: | ---: | ---: |
| 3–4 | 24 / 26 | 14.423 | -11.058 | 3.686 | 2.724 |
| 5–6 | 26 / 20 | 47.308 | -2.885 | 36.538 | 43.269 |
| Adults | 16 / 16 | 9.375 | 0.000 | 37.500 | 90.625 |

## Every cumulative build

The blank scaffolds already show the complete legend, titles, axes, childhood shading and strong zero line. Earlier marks remain visible as new series are revealed. Adults and their connecting segments appear only in the last build. Final Builds 04/05 are byte-for-byte identical to their respective full main PDF and PNG.

### Four-measure role preference

Reveal Baseline childhood first, then Accidental childhood, then Intentional childhood, and Adults last. The full figure, legend order, values and styling are unchanged.

| Build | PDF | PNG |
| --- | --- | --- |
| build00_blank | [PDF](builds/role_preference_all_measures/build00_blank.pdf) | [PNG](builds/role_preference_all_measures/build00_blank.png) |
| build01_baseline_childhood | [PDF](builds/role_preference_all_measures/build01_baseline_childhood.pdf) | [PNG](builds/role_preference_all_measures/build01_baseline_childhood.png) |
| build02_add_accidental_childhood | [PDF](builds/role_preference_all_measures/build02_add_accidental_childhood.pdf) | [PNG](builds/role_preference_all_measures/build02_add_accidental_childhood.png) |
| build03_add_intentional_childhood | [PDF](builds/role_preference_all_measures/build03_add_intentional_childhood.pdf) | [PNG](builds/role_preference_all_measures/build03_add_intentional_childhood.png) |
| build04_add_adults_full | [PDF](builds/role_preference_all_measures/build04_add_adults_full.pdf) | [PNG](builds/role_preference_all_measures/build04_add_adults_full.png) |

### One-panel Single Cause sensitivity

| Build | PDF | PNG |
| --- | --- | --- |
| build00_blank | [PDF](builds/single_cause_intention_sensitivity_onepanel/build00_blank.pdf) | [PNG](builds/single_cause_intention_sensitivity_onepanel/build00_blank.png) |
| build01_caused_childhood | [PDF](builds/single_cause_intention_sensitivity_onepanel/build01_caused_childhood.pdf) | [PNG](builds/single_cause_intention_sensitivity_onepanel/build01_caused_childhood.png) |
| build02_add_lexical_childhood | [PDF](builds/single_cause_intention_sensitivity_onepanel/build02_add_lexical_childhood.pdf) | [PNG](builds/single_cause_intention_sensitivity_onepanel/build02_add_lexical_childhood.png) |
| build03_add_fault_childhood | [PDF](builds/single_cause_intention_sensitivity_onepanel/build03_add_fault_childhood.pdf) | [PNG](builds/single_cause_intention_sensitivity_onepanel/build03_add_fault_childhood.png) |
| build04_add_punish_childhood | [PDF](builds/single_cause_intention_sensitivity_onepanel/build04_add_punish_childhood.pdf) | [PNG](builds/single_cause_intention_sensitivity_onepanel/build04_add_punish_childhood.png) |
| build05_add_adults_full | [PDF](builds/single_cause_intention_sensitivity_onepanel/build05_add_adults_full.pdf) | [PNG](builds/single_cause_intention_sensitivity_onepanel/build05_add_adults_full.png) |

## Reproduction, validation and limits

From the repository root:

```sh
Rscript --vanilla -e 'rmarkdown::render("current/code/R/causal_verbs.Rmd", quiet = TRUE)'
```

The complete workflow knitted cleanly without warnings/errors. The Rmd verifies fixed build geometry, cumulative reveals, main/CI geometry and visible-point counts of **0/8/16/24/36** and **0/2/4/6/8/12**. All 15 new PDFs were independently rasterized and visually inspected alongside the saved PNGs, including every build and both CI backups. Text stays inside every vector PDF page, and the full/scaffold views were compared with the final cookie-task reference at equal display width.

Independent calculations from the raw exports reproduced all **48 means and Ns**. Exact nonparametric bootstrap distributions agreed with the stored role-preference intervals within the expected Monte Carlo/discrete-quantile resolution. All **217 pre-existing PDF/PNG outputs**, **15 previous figure CSVs**, and **2,806 screened imported files** remain byte-for-byte unchanged. Re-rendered old PDFs were restored only after verifying that every page drawing and resource was identical, retaining their original metadata bytes too.

These are descriptive cross-sectional comparisons. Study 2 adults remain the 41-person earlier pilot; the main adult dataset is missing. Single Cause retains all 32 recovered adults; the historical N=30 exclusions are still unidentified. No inclusion rules, repeat-session rules, coding, scenario averaging, age grouping, participant weights, adult samples or bootstrap procedure changed. Children aged 7–9 remain in the earlier raw developmental figures. All scientific handoff gaps remain unresolved; these additions do not constitute scientific handoff acceptance.

[ADDITIONAL_SYNTHESIS_OUTPUTS.csv](ADDITIONAL_SYNTHESIS_OUTPUTS.csv) indexes only these 30 new figure files and two numerical tables. The earlier `OUTPUTS.csv` remains unchanged.
