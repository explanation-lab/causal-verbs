# Matched causal-role differentiation and responsibility

New matched panels compare **Baseline | Accidental | Intentional**, using Study 1 for Baseline and the corresponding Study 2 conditions. Every panel contains causal-role differentiation, Fault distal preference and Punish distal preference. A new standalone Study 1 V2 and both cumulative build series accompany it. All previous figures and exact-value tables remain unchanged.

The [shared R Markdown workflow](../../../code/R/causal_verbs.Rmd) computes and exports these figures. No plot title, subtitle or footer is included. Baseline, Accidental and Intentional are panel labels; axis labels and the complete legend remain visible throughout the builds.

## Full figures and exact values

| Figure | PDF | PNG | Exact values |
| --- | --- | --- | --- |
| Matched panels | [PDF](matched_role_differentiation_development_talk_v1.pdf) | [PNG](matched_role_differentiation_development_talk_v1.png) | [72 means, Ns and CIs](matched_role_differentiation_development_talk_v1_values.csv) |
| Study 1 V2 | [PDF](../../study1_baseline_causal_chains/role_differentiation/study1_role_differentiation_development_talk_v2.pdf) | [PNG](../../study1_baseline_causal_chains/role_differentiation/study1_role_differentiation_development_talk_v2.png) | [24 unchanged means, Ns and CIs](../../study1_baseline_causal_chains/role_differentiation/study1_role_differentiation_development_talk_v2_values.csv) |

The matched canvas is **24 × 10 inches** (5760 × 2400 PNG); standalone Study 1 is **17 × 10 inches** (4080 × 2400 PNG). Both use 240 dpi and vector PDFs. The same helper supplies 32 pt tick labels, 34 pt axis/panel labels, 28 pt legend text, 2.1 mm solid lines and 6.8 mm markers with 1.25 mm black outlines. Colors/shapes remain gray circles for causal differentiation, green squares for Fault and purple diamonds for Punish.

All panels and both new families use the same **-50% to 100%** y scale, 25-point ticks, identical age positions, childhood shading and a dashed zero line. Every CI fits, without clipping. Adults are separate reference points after age 9, without lines connecting them to children. All geometry, legend entries and axis ranges remain fixed across builds. Each final build is byte-for-byte identical to its full PDF/PNG.

## Matched builds

All three scores and their CIs appear together within each revealed condition.

| Build | Newly revealed | PDF | PNG |
| --- | --- | --- | --- |
| 00 | Blank scaffold | [PDF](builds/matched_role_differentiation_development_talk_v1/build00_blank.pdf) | [PNG](builds/matched_role_differentiation_development_talk_v1/build00_blank.png) |
| 01 | Baseline, ages 3–9 | [PDF](builds/matched_role_differentiation_development_talk_v1/build01_baseline.pdf) | [PNG](builds/matched_role_differentiation_development_talk_v1/build01_baseline.png) |
| 02 | Accidental, ages 3–9 | [PDF](builds/matched_role_differentiation_development_talk_v1/build02_add_accidental.pdf) | [PNG](builds/matched_role_differentiation_development_talk_v1/build02_add_accidental.png) |
| 03 | Intentional, ages 3–9 | [PDF](builds/matched_role_differentiation_development_talk_v1/build03_add_intentional.pdf) | [PNG](builds/matched_role_differentiation_development_talk_v1/build03_add_intentional.png) |
| 04 | Adults, all scores and conditions | [PDF](builds/matched_role_differentiation_development_talk_v1/build04_add_adults_full.pdf) | [PNG](builds/matched_role_differentiation_development_talk_v1/build04_add_adults_full.png) |

## Standalone Study 1 builds

This new V2 leaves the original titled V1 and its relationship backup intact. The common y range is wider than V1's so V2 matches the three-panel comparison; numerical values and intervals are unchanged.

| Build | Newly revealed | PDF | PNG |
| --- | --- | --- | --- |
| 00 | Blank scaffold | [PDF](../../study1_baseline_causal_chains/role_differentiation/builds/study1_role_differentiation_development_talk_v2/build00_blank.pdf) | [PNG](../../study1_baseline_causal_chains/role_differentiation/builds/study1_role_differentiation_development_talk_v2/build00_blank.png) |
| 01 | Causal-role differentiation, ages 3–9 | [PDF](../../study1_baseline_causal_chains/role_differentiation/builds/study1_role_differentiation_development_talk_v2/build01_causal_differentiation.pdf) | [PNG](../../study1_baseline_causal_chains/role_differentiation/builds/study1_role_differentiation_development_talk_v2/build01_causal_differentiation.png) |
| 02 | Fault, ages 3–9 | [PDF](../../study1_baseline_causal_chains/role_differentiation/builds/study1_role_differentiation_development_talk_v2/build02_add_fault.pdf) | [PNG](../../study1_baseline_causal_chains/role_differentiation/builds/study1_role_differentiation_development_talk_v2/build02_add_fault.png) |
| 03 | Punish, ages 3–9 | [PDF](../../study1_baseline_causal_chains/role_differentiation/builds/study1_role_differentiation_development_talk_v2/build03_add_punish.pdf) | [PNG](../../study1_baseline_causal_chains/role_differentiation/builds/study1_role_differentiation_development_talk_v2/build03_add_punish.png) |
| 04 | Adults, all three scores | [PDF](../../study1_baseline_causal_chains/role_differentiation/builds/study1_role_differentiation_development_talk_v2/build04_add_adults_full.pdf) | [PNG](../../study1_baseline_causal_chains/role_differentiation/builds/study1_role_differentiation_development_talk_v2/build04_add_adults_full.png) |

## Scoring and sample provenance

For each participant, first average available scenario Yes responses within measure and role (Yes = 1, No = 0). Then compute:

- Causal-role differentiation = `((Caused distal - Caused proximal) + (Lexical proximal - Lexical distal)) / 2`.
- Fault distal preference = `Fault distal - Fault proximal`.
- Punish distal preference = `Punish distal - Punish proximal`.

Multiply by 100 to express percentage-point contrasts. Both-Yes and neither-Yes responses remain included. Missing components are not converted to zero or silently omitted from the composite. All current participants have both scenarios for every component.

| Panel | Children | Adults | Source |
| --- | ---: | ---: | --- |
| Baseline | 211 | 100 | Existing Study 1 sample |
| Accidental | 200 | 21 | Study 2 child snapshot and selected earlier adult pilot |
| Intentional | 206 | 20 | Study 2 child snapshot and selected earlier adult pilot |

Mean scores weight participants equally within each age/condition. Baseline means and 95% bootstrap CIs are reused exactly from the prior Study 1 synthesis. The new Study 2 CIs use 5,000 participant resamples, with fixed seed `20260920 + 23`. Intervals are pointwise descriptive uncertainty, not tests of differences between panels or trajectories; household dependence is not modeled.

The data are the existing uncapped descriptive snapshots, with the prior selection rules. Study 2 collection is ongoing. **Study 2 adults are pilot data; the preregistered main adult dataset remains missing.** Comparisons with Study 1 are between samples, not within-participant changes. No scientific handoff gap is resolved by these new plots, and scientific handoff acceptance remains outstanding.

## Reproduce and validate

From the repository root:

```sh
Rscript --vanilla -e 'rmarkdown::render("current/code/R/causal_verbs.Rmd")'
```

The workflow independently reconstructs all Study 2 participant scores from signed binary responses, checks exact Baseline mean/CI identity, and verifies axes, geometry, nonmoving marks, cumulative visibility and adult-only final reveals. Each series has five builds. Visible point/CI counts are 0/21/42/63/72 for the matched figure and 0/7/14/21/24 for Study 1. No participant identifiers are exported in the new tables.
