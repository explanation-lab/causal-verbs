# Raw-response V1: cumulative talk builds

This is a new 12-frame build series for the original three-panel
`causal_role_and_raw_responsibility_talk_v1`: **Causal-role differentiation |
Fault | Punish**. It preserves the source figure and all subsequent versions.
These are raw-response builds, not the centered comparison.

Each build is available as a vector PDF and a 6000 × 2640 PNG at 240 dpi on the
unchanged 25 × 11 inch canvas. Use the files in numeric order. The full legend,
axes, childhood shading and original pilot/CI caption remain in place throughout;
every newly revealed trajectory includes all three age bins and its original CIs.

| Build | Added to the preceding frame | PDF | PNG |
|---|---|---|---|
| 00 | Blank polished scaffold | [PDF](build00_blank.pdf) | [PNG](build00_blank.png) |
| 01 | Causal-role differentiation | [PDF](build01_causal_role_differentiation.pdf) | [PNG](build01_causal_role_differentiation.png) |
| 02 | Single Cause / Intentional / Fault | [PDF](build02_single_cause_intentional_fault.pdf) | [PNG](build02_single_cause_intentional_fault.png) |
| 03 | Single Cause / Intentional / Punish | [PDF](build03_single_cause_intentional_punish.pdf) | [PNG](build03_single_cause_intentional_punish.png) |
| 04 | Chain: Distal / Intentional / Fault | [PDF](build04_chain_distal_intentional_fault.pdf) | [PNG](build04_chain_distal_intentional_fault.png) |
| 05 | Chain: Distal / Intentional / Punish | [PDF](build05_chain_distal_intentional_punish.pdf) | [PNG](build05_chain_distal_intentional_punish.png) |
| 06 | Single Cause / Accidental / Fault | [PDF](build06_single_cause_accidental_fault.pdf) | [PNG](build06_single_cause_accidental_fault.png) |
| 07 | Single Cause / Accidental / Punish | [PDF](build07_single_cause_accidental_punish.pdf) | [PNG](build07_single_cause_accidental_punish.png) |
| 08 | Chain: Distal / Accidental / Fault | [PDF](build08_chain_distal_accidental_fault.pdf) | [PNG](build08_chain_distal_accidental_fault.png) |
| 09 | Chain: Distal / Accidental / Punish | [PDF](build09_chain_distal_accidental_punish.pdf) | [PNG](build09_chain_distal_accidental_punish.png) |
| 10 | Single Cause gap fill in Fault and Punish | [PDF](build10_single_cause_gap_fill.pdf) | [PNG](build10_single_cause_gap_fill.png) |
| 11 | Chain: Distal gap fill in Fault and Punish; full figure | [PDF](build11_add_chain_distal_gap_fill_full.pdf) | [PNG](build11_add_chain_distal_gap_fill_full.png) |

The [build manifest](build_manifest.csv) records the reveal order, visible-point
counts and fill opacity. The [original values table](../../causal_role_and_raw_responsibility_talk_v1_values.csv)
remains the source for all 27 points and intervals; no new estimation or
resampling occurs.

## Geometry and gap fills

Every build keeps all original data rows and hides unrevealed marks with zero
opacity. The original drawing layers are copied before visibility is changed.
This preserves scale training, facets and legend contents. Each trajectory
retains its original colors, line style, points, CIs and horizontal offsets.
Build 09 is the complete original figure without gap fills.

The blue polygon in Build 10 follows the plotted Single Cause Intentional
trajectory forward and the Accidental trajectory backward, separately in Fault
and Punish. It respects the small existing horizontal offsets. Build 11 adds the
analogous red Chain: Distal polygon over the blue. Both use **alpha = 0.18**, with
no outline, and sit behind the reference lines, CIs, trajectories and points.
The baseline panel receives no gap fill.

The fills highlight the separation between means. They are not confidence bands,
new area-based statistics, or formal tests of a context difference. The original
pointwise participant-bootstrap CIs and the [sample/handoff limitations](../../README.md)
are unchanged. Single Cause child data remain pilot data.

## Reproduction and verification

The build section is part of the existing [R Markdown workflow](../../../../../code/R/causal_verbs.Rmd).
Run from the repository root:

```sh
Rscript --vanilla -e 'rmarkdown::render("current/code/R/causal_verbs.Rmd")'
```

Embedded checks compare the drawing coordinates and all mark properties other
than opacity to the original figure, verify the cumulative point counts and
fill order, and confirm identical scale limits, breaks and labels. Additional
render checks compare Build 09 with the original PNG and all PDF text positions
across builds. All earlier outputs and source data are checked for byte-for-byte
preservation before committing.
