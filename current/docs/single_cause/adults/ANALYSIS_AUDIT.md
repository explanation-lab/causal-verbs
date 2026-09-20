# Adult Single Cause: working N=32; historical N=30 subset unresolved

Reviewed September 20, 2026 for the reconstructed shared analysis. **The current working plots use all 32 complete adults, 16 Intentional and 16 Accidental, as explicitly requested for this revision.** The historical notes and old slide report N=30 (15 per condition), but no defensible rule identifying two exclusions was recovered. No rows are dropped or changed. This working N=32 analysis does not reconstruct the unidentified historical N=30 subset.

## Evidence checked

- [Adult CSV](../../../data/single_cause/adults/single_cause_pilot1-responses.csv): 32 rows, 32 distinct nonblank screened participant codes, 16 Intentional and 16 Accidental. Every row has all eight Yes/No answers. All `error` fields are blank. There is no inclusion, withdrawal, completion-time, attention-check or exclusion-reason column. There are no repeated participant codes to remove.
- [Preserved handoff note, section 4](../source_notes/HANDOFF_README.source.txt): reports N=30, 15 per condition and calls the two extra rows “likely excluded/incomplete.” This is a conjecture, not an identified exclusion rule; the current CSV's answers are complete.
- [Lab deck](../../../../reference_literature/lab_talk_deck_cause_fault_markman_SZ/cause_fault_markman_SZ.pptx), slides 18–20 and their speaker notes: describe the single-agent design and report 30 adults, 15 per condition. No participant list or exclusion rule appears. The [embedded slide 20 plot](../../../figures/single_cause/from_lab_talk_deck/slide20_img1.png) gives aggregate bars, not participant-level inclusion information. Its bar heights do not establish a unique historical subset; no rows were reverse-selected to fit that image.
- Saved [Intentional trial code](../../../code/experiments/single_cause/adults/intentional/js/trial.js) and [Accidental trial code](../../../code/experiments/single_cause/adults/accidental/js/trial.js): define the Bike and Mirror questions for Andy/Sophia. The [conversion helper](../../../code/experiments/single_cause/adults/intentional/convert_data_to_csv.py) writes records but contains no historical two-person exclusion rule. No original analysis script or retained inclusion list was found in the Single Cause materials.

## Consequence for the current figures

The developmental plot includes all 32 adults at the separate `Adult` endpoint. Within each adult and measure, Bike/Mirror Yes/No scores are averaged before group means and participant-bootstrap intervals are calculated. Every adult measure has N=16 per condition. Adult points are not connected to child developmental lines. The secondary pooled summary and the cross-study synthesis remain children only.

The 17-build sequence reveals each measure in this order: Intentional adults, Intentional children, Accidental adults, Accidental children. Caused occupies builds 01–04, Lexical 05–08, Fault 09–12 and Punish 13–16; 00 is blank and 16 is full.

To identify the historical N=30 subset, obtain the original analytic participant list (mapped to the screened IDs), or a documented exclusion rule and the fields needed to apply it. That provenance question remains open. The current working decision is explicit: use all 32 recovered complete adults without fabricating exclusions. All paths in this audit and the analysis are repository-relative.
