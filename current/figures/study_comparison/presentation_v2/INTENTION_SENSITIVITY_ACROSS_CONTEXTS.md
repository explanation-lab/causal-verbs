# Intention sensitivity across causal contexts

This new companion to [all-measure role preference](ADDITIONAL_SYNTHESES.md#four-measure-role-preference) plots **Intentional − Accidental Yes endorsement**, in percentage points. The four panels are Caused, Lexical, Fault and Punish; each contains Single Cause, Chain: Distal and Chain: Proximal trajectories across 3–4, 5–6 and Adults. Study 1 is not included because it does not manipulate intention.

The [existing R Markdown workflow](../../../code/R/causal_verbs.Rmd) generates these additional outputs. No earlier figure, build or numerical CSV is replaced.

## Final figures and exact values

- Main (no CIs): [PDF](intention_sensitivity_across_contexts_talk_v1.pdf) · [PNG](intention_sensitivity_across_contexts_talk_v1.png)
- Separate CI backup: [PDF](intention_sensitivity_across_contexts_talk_v1_with_ci.pdf) · [PNG](intention_sensitivity_across_contexts_talk_v1_with_ci.png)
- [Full-precision 36-row table](intention_sensitivity_across_contexts_talk_v1_values.csv): source means, eligible/contributing Ns, intention differences and 95% intervals.

Both versions use the all-measure companion's **22 × 8.5-inch** presentation canvas, 44 pt ticks/panel titles, 47⅔ pt y title, 42⅙ pt centered legend, 2.1 mm trajectories and large black-outlined markers. PDFs are vector graphics; PNGs are 5280 × 2040 at 240 dpi. Childhood shading ends at the second child tick, before Adults. Every panel has a strong black dashed zero line.

The established causal-context palette is retained: Single Cause uses gray filled squares/dotted lines, Chain: Distal red filled circles/solid lines, and Chain: Proximal blue filled triangles/dashed lines. Colors encode context, not intention condition or judgment. Positive values mean more Yes under Intentional; negative values mean more Yes under Accidental.

All main/CI/build outputs share a **-60% to 100%** y range, derived from the means and all CI bounds, with ticks every 25 percentage points. No interval is clipped.

## Computation and preserved analysis choices

Average binary Yes=1 / No=0 responses across available scenarios within participant first, then average participants equally within stage, source study, intention condition and role/measure. The plotted effect is 100 × (Intentional group mean − Accidental group mean). Participants belong to different intention conditions, so this is a **between-group difference**, not a within-person intention contrast. There is no relative-attribution ratio, distal–proximal subtraction or Study 1 baseline subtraction in this figure.

All 12 Single Cause effects and bootstrap intervals are reused exactly from the existing validated sensitivity table. The 24 Study 2 chain effects reuse the existing participant means and match the validated stage-level source means. Their CIs use the established 5,000-replicate participant bootstrap, independently resampling the two conditions within each stage. Both roles and all four measures stay together on every sampled participant row. A separate fixed seed (`bootstrap_seed + 12L`) leaves every older interval unchanged. The 95% intervals are the 2.5th and 97.5th percentiles of the resampled differences, including uncertainty from both conditions.

Inclusion rules, repeat-session handling, yes/no coding, scenario averaging, equal participant weights, stage groups and adult samples are unchanged. Children aged 7–9 remain in the earlier raw developmental figures. The table distinguishes eligible and contributing Ns; all current participants provide both scenarios for each measure.

## Compact numerical table

Values are percentage points, rounded to three decimals. The CSV retains full precision and each CI.

| Stage | Context | N Intentional / Accidental | Caused | Lexical | Fault | Punish |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| 3–4 | Single Cause | 24 / 26 | 14.423 | -11.058 | 3.686 | 2.724 |
| 3–4 | Chain: Distal | 60 / 67 | 2.500 | 17.910 | 1.617 | 8.644 |
| 3–4 | Chain: Proximal | 60 / 67 | -5.697 | -19.403 | -0.522 | -1.965 |
| 5–6 | Single Cause | 26 / 20 | 47.308 | -2.885 | 36.538 | 43.269 |
| 5–6 | Chain: Distal | 47 / 49 | 16.479 | 21.211 | 23.621 | 28.289 |
| 5–6 | Chain: Proximal | 47 / 49 | -9.292 | -13.808 | -11.594 | -12.701 |
| Adults | Single Cause | 16 / 16 | 9.375 | 0.000 | 37.500 | 90.625 |
| Adults | Chain: Distal | 20 / 21 | 18.810 | 36.310 | 33.214 | 61.548 |
| Adults | Chain: Proximal | 20 / 21 | -34.524 | -11.429 | -23.690 | 0.238 |

## Interpretation and source limitations

The figure supports relatively weak lexical intention sensitivity in **Single Cause** (−11.058, −2.885 and 0.000 pp). It does **not** support that generalization uniformly across causal contexts. Chain: Distal Lexical rises from **+17.910 to +36.310 pp**, while Chain: Proximal Lexical is negative at every stage (**−19.403 to −11.429 pp**). Distal-chain Lexical is not consistently weaker than Caused or Fault. Punishment has the largest adult point estimates in Single Cause (+90.625 pp) and Chain: Distal (+61.548 pp).

For Chain: Proximal, the manipulation concerns the **distal agent's intention**; it does not manipulate the proximal agent's own intention. Different study cohorts remain different samples, so context differences are descriptive, not an isolated causal effect of structure. Pointwise CIs do not test whether effects differ between measures/contexts. Age trajectories describe cross-sectional groups rather than within-person change.

Study 2 adults remain the earlier 41-person pilot (20 Intentional, 21 Accidental); the main preregistered adult dataset is still missing. Single Cause retains all 32 recovered adults (16 per condition); the historical N=30 exclusions remain unidentified. All scientific handoff gaps remain unresolved.

## Cumulative talk builds

The blank scaffold includes all panels, axes, childhood shading, reference lines and the complete legend. Childhood contexts enter one at a time; Adults and their connecting segments appear last. Main and build figures contain no CIs. All earlier marks and all layout geometry stay fixed. The final build is byte-for-byte identical to the full main PDF and PNG.

| Build | PDF | PNG |
| --- | --- | --- |
| build00_blank | [PDF](builds/intention_sensitivity_across_contexts/build00_blank.pdf) | [PNG](builds/intention_sensitivity_across_contexts/build00_blank.png) |
| build01_single_cause_childhood | [PDF](builds/intention_sensitivity_across_contexts/build01_single_cause_childhood.pdf) | [PNG](builds/intention_sensitivity_across_contexts/build01_single_cause_childhood.png) |
| build02_add_chain_distal_childhood | [PDF](builds/intention_sensitivity_across_contexts/build02_add_chain_distal_childhood.pdf) | [PNG](builds/intention_sensitivity_across_contexts/build02_add_chain_distal_childhood.png) |
| build03_add_chain_proximal_childhood | [PDF](builds/intention_sensitivity_across_contexts/build03_add_chain_proximal_childhood.pdf) | [PNG](builds/intention_sensitivity_across_contexts/build03_add_chain_proximal_childhood.png) |
| build04_add_adults_full | [PDF](builds/intention_sensitivity_across_contexts/build04_add_adults_full.pdf) | [PNG](builds/intention_sensitivity_across_contexts/build04_add_adults_full.png) |

## Reproduce and validate

From the repository root:

```sh
Rscript --vanilla -e 'rmarkdown::render("current/code/R/causal_verbs.Rmd", quiet = TRUE)'
```

The complete knit passed without warnings/errors. All 36 effects and both source means/Ns were independently checked against raw exports. The Single Cause estimates and intervals match the prior table exactly. Independent exact bootstrap-distribution calculations also checked the uncertainty intervals within finite Monte Carlo resolution.

Every final PDF/PNG and all five builds were visually inspected. All vector PDF text stays within page bounds. The workflow checks fixed build geometry, unchanged coordinates, main/CI alignment and visible-point counts of 0/8/16/24/36. All **263 previous PDF/PNG outputs** and **18 previous figure CSVs** retain their original bytes. Re-rendered old PDFs were restored only after equality of every page drawing/resource was verified, retaining their original metadata as well. No scientific input file changed.
