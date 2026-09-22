# Study 1: causal-role differentiation and distal responsibility

This new synthesis uses only the unchanged Study 1 baseline sample: **211 unique children aged 3–9 and 100 adults**. It adds a developmental figure and a participant-level relationship backup to the [shared R Markdown workflow](../../../code/R/causal_verbs.Rmd). No earlier figure, input dataset, participant-selection rule or handoff conclusion changes.

## Figures and exact values

| Output | PDF | PNG |
| --- | --- | --- |
| Developmental synthesis | [PDF](study1_role_differentiation_development_talk_v1.pdf) | [PNG](study1_role_differentiation_development_talk_v1.png) |
| Participant relationship backup | [PDF](study1_role_differentiation_relationship_backup_v1.pdf) | [PNG](study1_role_differentiation_relationship_backup_v1.png) |

The main figure is 17 × 10 inches; the backup is 17 × 9 inches. Both use vector PDFs and 240-dpi PNGs, the existing talk theme, large black-outlined markers, and green Fault / purple Punish colors. The developmental composite is gray. The main figure retains childhood shading and a dashed zero line, and shows 95% participant-bootstrap intervals. Adults are separate reference points, not a continuation of chronological child age.

- [Developmental values](study1_role_differentiation_development_values.csv): all 24 plotted means, contributing Ns and bootstrap intervals, in percentage points.
- [Relationship values](study1_role_differentiation_relationship_values.csv): exact joint score frequencies by age group and outcome. Each row's `participants` count reproduces that number of coincident scatter points. No participant identifiers are exported.
- [Association estimates](study1_role_differentiation_relationship_models.csv): eight unadjusted / age-adjusted slopes, sample sizes and bootstrap intervals. `effect_per_25pp` expresses outcome percentage points per 25-point differentiation increase.

## Computation

Start from the existing scenario-averaged Yes means within participant × measure × role (Yes = 1, No = 0). Then calculate:

1. **Causal-role differentiation** = `[(Caused Distal - Proximal) + (Lexical Proximal - Distal)] / 2`.
2. **Fault distal preference** = `Fault Distal - Proximal`.
3. **Punish distal preference** = `Punish Distal - Proximal`.

Multiply the resulting contrasts by 100. Percentage labels represent percentage-point contrasts. The two components of differentiation have equal weight. Both-Yes and neither-Yes responses remain included and yield zero role contrast. All 311 participants have both scenarios for every component, so all contribute to all three scores. No composite is calculated from only one available component.

Child Ns at ages 3–9 are 31, 32, 29, 30, 30, 30 and 29; Adult N is 100. Age means give each participant equal weight. Their pointwise 95% intervals resample participant scores 5,000 times, with fixed seed `20260920 + 20`.

## Relationship analysis

The backup contains one point per participant in each outcome panel: circles for children and triangles for adults. Display-only jitter of up to 3 percentage points on each axis reveals overlapping discrete scores. The fitted lines and all analyses use exact, unjittered values. Lines are the pooled unadjusted ordinary least-squares fits; the plot does not depict age-adjusted slopes.

Models are fitted separately for Fault and Punish, using children alone as the primary childhood analysis and children plus adults as a supplementary comparison:

```r
responsibility ~ differentiation
responsibility ~ differentiation + age_group
```

Age is categorical (3–9, plus Adult when included); there is no assumed numerical adult age or linear age effect. The adjusted model estimates a common within-age slope. Whole participants are resampled within age group 5,000 times with seed `20260920 + 21`, keeping each participant's predictor and outcome paired and retaining the observed age composition. The percentile intervals are exploratory and unadjusted for multiple comparisons. Household dependence is not modeled.

### Age-adjusted results

Outcome difference in percentage points per **25-point increase in differentiation**:

| Sample | Outcome | Estimate | 95% bootstrap CI |
| --- | --- | ---: | --- |
| Children (N=211) | Fault | 14.67 | 10.68 to 19.05 |
| Children (N=211) | Punish | 9.13 | 4.73 to 13.62 |
| Children + adults (N=311) | Fault | 12.60 | 8.97 to 16.04 |
| Children + adults (N=311) | Punish | 7.72 | 4.09 to 11.27 |

Both relationships remain positive after age adjustment, including within childhood. This supports an association between expected causal-role differentiation and distal responsibility preference beyond differences between age groups. It does not establish that differentiation causes responsibility judgments or that individual children change in this way over time.

The developmental curves broadly rise across childhood but not in lockstep. Fault and Punish dip at age 9. Adult differentiation is **33.5 points**, below the age-6–9 child means (54.2–62.1), while adult Fault and Punish distal preferences remain high (**71.5** and **66.0**). The full pattern therefore does not support a simple parallel-increase account through adulthood.

## Reproduce and validate

From the repository root:

```sh
Rscript --vanilla -e 'rmarkdown::render("current/code/R/causal_verbs.Rmd")'
```

The workflow uses relative paths. It independently reconstructs all 933 participant scores from signed binary responses, checks the composite against the existing raw-Yes summaries, verifies all plotted participant/mean counts, and checks every age-adjusted slope against `lm()`. Exact source data and previous figure outputs are preserved in this addition.

These are the existing uncapped descriptive samples, not a finalized preregistered analysis. The missing original scripts, eligibility/cap questions and other Sunny handoff gaps remain explicit in the workflow and [handoff status](../../../../docs/handoff/HANDOFF_STATUS.md). This synthesis does not imply scientific handoff acceptance.
