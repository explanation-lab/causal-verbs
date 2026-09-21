# Single Cause one-panel V4: compact presentation version

V4 makes only visual changes to [V3](ADDITIONAL_SYNTHESES.md#one-panel-single-cause-sensitivity). The same [R Markdown workflow](../../../code/R/causal_verbs.Rmd) creates both versions. V3 and every older output retain their original contents.

| Setting | V3 | V4 |
| --- | --- | --- |
| Canvas | 22 × 8.5 inches | **14 × 9.5 inches** |
| All four solid lines | 2.1 mm | **3.3 mm** |
| Marker size | 6.2 mm | **10 mm** |
| Black marker stroke | 1.15 mm | **2.2 mm** |

The colors, circle/triangle/square/diamond shapes, labels, Single Cause title, 44 pt ticks/title, large axis title, centered bottom legend, childhood shading, dashed zero line, −30% to 100% y range and existing x offsets are unchanged. Every reveal uses the same fixed geometry. No scoring, data, values, intervals or build logic changed. The [V3 numerical table](single_cause_intention_sensitivity_onepanel_talk_v3_values.csv) remains the full-precision source for all 12 points and intervals; no duplicate numerical table is needed.

## Full figure and CI backup

- Main: [PDF](single_cause_intention_sensitivity_onepanel_talk_v4.pdf) · [PNG](single_cause_intention_sensitivity_onepanel_talk_v4.png)
- Separate CI backup: [PDF](single_cause_intention_sensitivity_onepanel_talk_v4_with_ci.pdf) · [PNG](single_cause_intention_sensitivity_onepanel_talk_v4_with_ci.png)

PDFs are vector graphics; PNGs are **3360 × 2280 pixels** at 240 dpi. Main and builds contain no CIs. The backup uses the existing participant-bootstrap intervals without changes.

## Unchanged reveal sequence

| Build | PDF | PNG |
| --- | --- | --- |
| build00_blank | [PDF](builds/single_cause_intention_sensitivity_onepanel_v4/build00_blank.pdf) | [PNG](builds/single_cause_intention_sensitivity_onepanel_v4/build00_blank.png) |
| build01_caused_childhood | [PDF](builds/single_cause_intention_sensitivity_onepanel_v4/build01_caused_childhood.pdf) | [PNG](builds/single_cause_intention_sensitivity_onepanel_v4/build01_caused_childhood.png) |
| build02_add_lexical_childhood | [PDF](builds/single_cause_intention_sensitivity_onepanel_v4/build02_add_lexical_childhood.pdf) | [PNG](builds/single_cause_intention_sensitivity_onepanel_v4/build02_add_lexical_childhood.png) |
| build03_add_fault_childhood | [PDF](builds/single_cause_intention_sensitivity_onepanel_v4/build03_add_fault_childhood.pdf) | [PNG](builds/single_cause_intention_sensitivity_onepanel_v4/build03_add_fault_childhood.png) |
| build04_add_punish_childhood | [PDF](builds/single_cause_intention_sensitivity_onepanel_v4/build04_add_punish_childhood.pdf) | [PNG](builds/single_cause_intention_sensitivity_onepanel_v4/build04_add_punish_childhood.png) |
| build05_add_adults_full | [PDF](builds/single_cause_intention_sensitivity_onepanel_v4/build05_add_adults_full.pdf) | [PNG](builds/single_cause_intention_sensitivity_onepanel_v4/build05_add_adults_full.png) |

Build 00 includes the complete scaffold and legend. Builds 01–04 cumulatively reveal childhood Caused, Lexical, Fault and Punish. Build 05 adds all adult points and their connecting segments; its PDF and PNG are byte-for-byte identical to the full main figure.

## Reproduction and checks

Run from the repository root:

```sh
Rscript --vanilla -e 'rmarkdown::render("current/code/R/causal_verbs.Rmd", quiet = TRUE)'
```

The workflow checks that only linewidth, marker size and marker stroke differ from V3's plot layers; values, coordinates, labels, colors, shapes and reveal visibility are unchanged. It also checks fixed axes/panels across builds, visible-point counts of 0/2/4/6/8/12, and matching geometry between main and CI versions. The complete knit and PDF/PNG visual review passed. Every earlier figure and numerical CSV retains its original bytes, including V3 and its builds. Regenerated old PDFs were restored only after checking equality of all page drawings/resources, so even their original metadata bytes remain unchanged.

The existing scientific handoff limitations are unchanged.
