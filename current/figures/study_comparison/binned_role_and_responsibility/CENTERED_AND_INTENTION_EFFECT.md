# Centered responsibility and direct intention effects

Two additional Fault/Punish figures use ages **3–4 | 5–6 | Adult**. Earlier
figures, data, sample definitions and estimates are preserved. Both figures
are 20 × 10.5 inches, with vector PDFs and 4800 × 2520 PNGs at 240 dpi.

## Centered five-line comparison

- [PDF](causal_role_and_raw_responsibility_centered_talk_v1.pdf)
- [PNG](causal_role_and_raw_responsibility_centered_talk_v1.png)
- [Original and centered means, Ns and 95% CIs](causal_role_and_raw_responsibility_centered_talk_v1_values.csv)

The unchanged Study 1 participant-level differentiation score is:

```text
((Caused Distal - Caused Proximal) + (Lexical Proximal - Lexical Distal)) / 2
```

First express this score in percentage points, then divide it by 2 for display.
For the four responsibility trajectories, display the raw Yes percentage minus
50. These calculations use percentages, not 0–1 proportions. Both panels repeat
the same gray baseline trajectory alongside Single Cause (blue) and Chain:
Distal (red), with solid circles for Intentional and dashed open triangles for
Accidental.

**Zero means 50/50 Yes responding for responsibility, or no causal-role
differentiation.** Perfect expected differentiation and 100% Yes both map to
+50. Negative responsibility scores mean less than 50% Yes; a negative baseline
score would indicate the reverse expected role distinction. Equal heights align
the requested numeric scales but do not imply that the constructs are identical.

Means and both confidence limits receive the same transformation. Consequently,
the existing percentile participant-bootstrap intervals are preserved on the new
scale. The table includes the original `mean_pct`, `lower_pct` and `upper_pct`,
the transformation, and all three `centered_*` values. The baseline centered
means are 6.94, 20.97 and 16.75 for ages 3–4, 5–6 and Adult, respectively.

## Direct intention-effect backup

- [PDF](single_cause_vs_chain_distal_intention_effect_talk_v1.pdf)
- [PNG](single_cause_vs_chain_distal_intention_effect_talk_v1.png)
- [Exact effects, source means, Ns and 95% CIs](single_cause_vs_chain_distal_intention_effect_talk_v1_values.csv)

Each panel has exactly two trajectories: Single Cause and Chain: Distal.
Each value is **Intentional minus Accidental**, in percentage points. The source
`yes_mean_*` columns in this table are 0–1 proportions; the `mean_pp`, `lower_pp`
and `upper_pp` columns are percentage points.

| Measure | Age | Single Cause effect [95% CI] | Chain: Distal effect [95% CI] |
|---|---|---:|---:|
| Fault | 3–4 | 3.69 [−16.83, 25.16] | 1.62 [−11.94, 14.43] |
| Fault | 5–6 | 36.54 [13.85, 59.04] | 23.62 [8.81, 38.08] |
| Fault | Adult | 37.50 [12.50, 62.50] | 33.21 [16.03, 50.00] |
| Punish | 3–4 | 2.72 [−20.99, 25.96] | 8.64 [−5.66, 22.95] |
| Punish | 5–6 | 43.27 [22.30, 63.27] | 28.29 [11.70, 43.86] |
| Punish | Adult | 90.63 [81.25, 100.00] | 61.55 [41.90, 80.71] |

Single Cause shows larger estimated separation at ages 5–6 for both measures,
and especially for adult punishment. The youngest punishment estimate is larger
in Chain: Distal. These are descriptive cross-study comparisons; intervals for
each effect do not test a difference between contexts or establish that one
context is easier.

## Participant weighting and uncertainty

Use ordinary Yes=1/No=0 responses, retaining both/neither. Average available
scenarios within participant first, then weight participants equally within each
bin and condition. Do not average separate age-group means with equal weights.
Children aged 7–9 are excluded from these bins and remain in earlier figures.

The centered plot reuses the original binned raw-response and baseline summaries
and intervals. The backup reuses the validated context-sensitivity summary:
5,000 percentile bootstrap draws, independently resampling whole participants
within each age-bin/condition group. All of a participant's judgments remain
together. Conditions contain different participants, so this is a difference of
participant-group means, not a paired within-person contrast. Single Cause uses
seed `20260920 + 10`; Chain uses `20260920 + 12`. The difference is recomputed
within every bootstrap draw; raw-response CI bounds are **not** subtracted.

All bars are pointwise 95% participant-bootstrap CIs and fit the plotted range.
Small fixed horizontal offsets separate overlapping intervals without changing
age membership. Lines connect independent sample means, not longitudinal data.

## Samples, reproducibility and checks

The [original binned figure guide](README.md) lists participant Ns and sample
limitations. Single Cause child data are **pilot data**, stated on both figures.
Chain Adult values come from the selected Study 2 adult pilot; the main adult
dataset remains missing. Single Cause uses all 32 recovered adults; the historical
N=30 subset remains unidentified. Existing eligibility, collection, uncapped child
snapshot and scientific handoff limitations remain unchanged. These additions
do not constitute scientific handoff acceptance.

The new sections are in the [shared R Markdown workflow](../../../code/R/causal_verbs.Rmd).
From the repository root:

```sh
Rscript --vanilla -e 'rmarkdown::render("current/code/R/causal_verbs.Rmd")'
```

Checks inverse-transform every centered mean and interval back to its source,
match the 12 intention effects and condition Ns to the raw summaries, and verify
five and two trajectories per panel, respectively, with common axes and complete
CIs. Independent checks compare the exports with the earlier saved tables.
Previously saved figures and source data are checked for byte-for-byte identity;
the new PDF and PNG renders are visually inspected before committing.
