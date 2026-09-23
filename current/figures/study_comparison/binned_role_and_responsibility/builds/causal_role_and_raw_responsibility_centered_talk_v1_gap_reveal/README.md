# Centered Fault/Punish figure: cumulative talk builds

The exact base is [causal_role_and_raw_responsibility_centered_talk_v1.pdf](../../causal_role_and_raw_responsibility_centered_talk_v1.pdf).
These builds have **two panels only: Fault | Punish**, with the gray causal-role
differentiation trajectory inside both panels. The earlier three-panel build
series is preserved separately and is not the base for this sequence.

Every frame retains the original 20 × 10.5 inch canvas, centered y-scale and
limits, childhood shading, colors, shapes, CIs, fonts, legend position, offsets,
panel dimensions, spacing and caption. The complete original legend remains
fixed in the blank scaffold. Each reveal includes all three age groups and its
existing CIs. PDFs are vector; PNGs are 4800 × 2520 at 240 dpi.

| Build | Added to the preceding frame | PDF | PNG |
|---|---|---|---|
| 00 | Blank centered two-panel scaffold | [PDF](build00_blank.pdf) | [PNG](build00_blank.png) |
| 01 | Gray causal-role differentiation in both panels | [PDF](build01_causal_role_differentiation_both_panels.pdf) | [PNG](build01_causal_role_differentiation_both_panels.png) |
| 02 | Single Cause / Intentional / Fault | [PDF](build02_single_cause_intentional_fault.pdf) | [PNG](build02_single_cause_intentional_fault.png) |
| 03 | Single Cause / Intentional / Punish | [PDF](build03_single_cause_intentional_punish.pdf) | [PNG](build03_single_cause_intentional_punish.png) |
| 04 | Chain: Distal / Intentional / Fault | [PDF](build04_chain_distal_intentional_fault.pdf) | [PNG](build04_chain_distal_intentional_fault.png) |
| 05 | Chain: Distal / Intentional / Punish | [PDF](build05_chain_distal_intentional_punish.pdf) | [PNG](build05_chain_distal_intentional_punish.png) |
| 06 | Single Cause / Accidental / Fault | [PDF](build06_single_cause_accidental_fault.pdf) | [PNG](build06_single_cause_accidental_fault.png) |
| 07 | Single Cause / Accidental / Punish | [PDF](build07_single_cause_accidental_punish.pdf) | [PNG](build07_single_cause_accidental_punish.png) |
| 08 | Chain: Distal / Accidental / Fault | [PDF](build08_chain_distal_accidental_fault.pdf) | [PNG](build08_chain_distal_accidental_fault.png) |
| 09 | Chain: Distal / Accidental / Punish; exact centered original | [PDF](build09_centered_original_complete.pdf) | [PNG](build09_centered_original_complete.png) |
| 10 | Blue Single Cause gap fill in both panels | [PDF](build10_single_cause_gap_fill.pdf) | [PNG](build10_single_cause_gap_fill.png) |
| 11 | Add red Chain: Distal gap fill in both panels; full figure | [PDF](build11_add_chain_distal_gap_fill_full.pdf) | [PNG](build11_add_chain_distal_gap_fill_full.png) |

## Exact base and unchanged estimates

The existing [centered values and intervals](../../causal_role_and_raw_responsibility_centered_talk_v1_values.csv)
supply all 30 points, including the three gray baseline points repeated in both
panels. Responsibility remains Yes (%) minus 50; causal differentiation remains
its percentage-point score divided by two. No analysis or bootstrap is rerun for
these builds. Sample definitions and the [original limitations](../../CENTERED_AND_INTENTION_EFFECT.md)
remain unchanged, including the Single Cause child pilot qualification.

The workflow copies the original plot object and changes only mark visibility,
keeping all data rows and scale training fixed. Build 09's delivered PDF and PNG
are byte-for-byte copies of the existing centered files. Its independently
generated rendering is also checked for pixel identity before delivery.

## Transparent mean-gap fills

Build 10 adds the original Single Cause blue at **alpha 0.18**. Build 11 adds the
original Chain: Distal red at **alpha 0.18**, transparently over the blue. Each
polygon follows the original centered Intentional mean trajectory forward and
the Accidental mean trajectory backward, retaining the original horizontal
offsets and closing at the endpoints. The gray reference is never part of a fill.

Drawing order is childhood background, blue fill, red fill, zero line, CIs,
trajectories and points. The fills emphasize the displayed separation; they are
not confidence bands, new area statistics or tests of a between-context effect.

## Reproduction and checks

The new section is in the existing [R Markdown workflow](../../../../../code/R/causal_verbs.Rmd).
From the repository root:

```sh
Rscript --vanilla -e 'rmarkdown::render("current/code/R/causal_verbs.Rmd")'
```

The [manifest](build_manifest.csv) records the exact reveal sequence and opacity.
Checks require two panels throughout, the correct visibility of every point,
unchanged coordinates and mark properties other than visibility, fixed scale
limits/breaks/labels, and an unmodified source plot. Independent PDF/PNG checks
verify identical text positions, the intended panel changes, and Build 09's
identity to the original. All earlier figures/builds and source data remain
byte-for-byte unchanged after the complete workflow is verified.
