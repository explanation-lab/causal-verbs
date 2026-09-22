# Binned causal differentiation and raw responsibility

A new three-panel presentation figure: **Causal-role differentiation | Fault |
Punish**, with ages **3–4 | 5–6 | Adult**. It places the emergence of Study 1
baseline causal differentiation beside the separation of Intentional and
Accidental responsibility judgments in Single Cause and Chain: Distal.

- [Vector PDF](causal_role_and_raw_responsibility_talk_v1.pdf)
- [High-resolution PNG](causal_role_and_raw_responsibility_talk_v1.png)
- [Exact plotted values, participant Ns and 95% CIs](causal_role_and_raw_responsibility_talk_v1_values.csv)
- [Shared R Markdown workflow](../../../code/R/causal_verbs.Rmd)

The figure is 25 × 11 inches; the PNG is 6000 × 2640 pixels at 240 dpi. All
previous figures, builds and source data are preserved. No additional build
series or inferential analysis is introduced.

## Reading the figure

The first panel uses Study 1 Baseline only, with a neutral gray trajectory:

```text
((Caused Distal - Caused Proximal) + (Lexical Proximal - Lexical Distal)) / 2
```

This is computed within participant from scenario-averaged Yes proportions,
then averaged across participants. Its percentage scale represents percentage
points of causal-role differentiation. Higher values indicate the expected
combination of distal Caused and proximal Lexical endorsement. The dashed line
is zero differentiation.

Fault and Punish show **raw Yes-response rates**, not intention differences or
role contrasts. Yes=1, No=0; both/neither remain included. Their dashed horizontal
line is a 50% visual reference, not a chance-model assumption.

- Blue = Single Cause; red = Chain: Distal.
- Solid lines and filled circles = Intentional.
- Dashed lines and open triangles = Accidental.
- Shading identifies the two child bins and ends before Adult.

Every line connects the three category means, including Adult, as requested.
These are separate samples, not longitudinal changes within participants.
Small fixed horizontal offsets in the responsibility panels separate overlapping
intervals at each age category; they do not change bin membership or values.
One shared legend identifies the four context–condition combinations.

## Participant weighting, intervals and samples

Average scenarios within participant first, then weight each participant equally
within their bin and condition. **Do not average the age-3 and age-4 group means
with equal weights**, or age-5 and age-6 means with equal weights. Children aged
7–9 are excluded from this figure's bins and remain in earlier figures.

The 24 raw-response means, Ns and CIs are reused exactly from the already
validated `df.stage.summary`. The two binned child differentiation CIs resample
whole participants within bin, with 5,000 replicates and seed `20260920 + 30`.
The Adult baseline mean and CI are reused from the prior Study 1 differentiation
summary. Every interval is a pointwise 95% percentile participant-bootstrap CI,
shown in full. The intervals describe uncertainty in individual means; they do
not test the difference between intentionality gaps across contexts.

| Sample | 3–4 | 5–6 | Adult |
|---|---:|---:|---:|
| Study 1 Baseline | 63 | 59 | 100 |
| Single Cause Intentional | 24 | 26 | 16 |
| Single Cause Accidental | 26 | 20 | 16 |
| Chain: Distal Intentional | 60 | 47 | 20 |
| Chain: Distal Accidental | 67 | 49 | 21 |

The Single Cause child sample is **pilot data**, stated on the figure. Chain
Adult values come from the selected Study 2 adult pilot; the preregistered
main adult dataset remains missing. Single Cause includes all 32 recovered
adults; its historical N=30 subset remains unidentified. Existing uncapped
child-snapshot, eligibility, collection and scientific handoff limitations in
the [workflow guide](../../../code/R/README.md) remain unchanged. This figure
does not constitute scientific handoff acceptance.

## Descriptive pattern

Baseline differentiation is **13.89%** at ages 3–4 (95% CI 5.56–22.62),
**41.95%** at ages 5–6 (30.08–53.39), and **33.50%** for adults (27.25–40.00).
The largest visible increase is between the two child bins; the Adult mean
is below the age-5–6 mean, so the three categories do not increase monotonically.

For comparison, the gaps between the plotted Intentional and Accidental means
are below, in percentage points. The figure itself continues to plot raw rates.

| Measure | Age | Single Cause gap | Chain: Distal gap |
|---|---|---:|---:|
| Fault | 3–4 | 3.69 | 1.62 |
| Fault | 5–6 | 36.54 | 23.62 |
| Fault | Adult | 37.50 | 33.21 |
| Punish | 3–4 | 2.72 | 8.64 |
| Punish | 5–6 | 43.27 | 28.29 |
| Punish | Adult | 90.63 | 61.55 |

At ages 5–6, Single Cause has the larger estimated separation for both judgments.
The adult context difference is especially pronounced for punishment; for adult
fault the gap estimates are quite similar. Ages 3–4 show relatively little
separation, and the punishment gap is larger in Chain: Distal. Thus the pattern
is not uniformly larger for Single Cause at every age. These descriptive,
cross-sample contrasts do not establish that contexts differ statistically or
that emerging causal differentiation causes changes in responsibility judgments.

## Reproduction and checks

Run the existing R Markdown workflow from the repository root:

```sh
Rscript --vanilla -e 'rmarkdown::render("current/code/R/causal_verbs.Rmd")'
```

The plotting section uses `patchwork` only to arrange the neutral baseline panel
beside the two responsibility facets and collect their legend. This installed
package is now listed in the workflow's dependency instructions. All input and
output paths remain relative.

Embedded checks independently recompute the baseline from the role-specific
participant Yes means and the responsibility points from participant means.
They require all 27 means and Ns to match, all 24 existing raw-response CIs to
remain identical, exactly one baseline trajectory and four responsibility
trajectories per panel, and all CI bounds to fit within the plot. Independent
QA also compares the CSV with the previously saved source summaries. Source-data
and earlier-output hashes are checked before committing, and the saved PDF and
PNG are visually reviewed.
