# Study 1 — Baseline causal chains — child data

[exp4_raw_responses.csv](exp4_raw_responses.csv) is the current supplied Study 1 child export, added September 20, 2026 without changing any values. Its sessions span July 2–August 10, 2026. Study 1 data were collected; this supplied dataset is not yet a finalized preregistered analytic sample.

One row is a question response, including warmups. The file contains 3,870 rows, 215 sessions and 212 distinct child hash codes. Of 214 sessions marked for analysis, selecting one eligible attempt per child leaves 211 children aged 3–9. The [shared R Markdown workflow](../../../code/R/README.md) documents the eligibility checks, repeats and exact age counts.

`child_hashed_id` identifies a child; `participant_hashed_id` identifies an account. These are hashed codes, not names. Session IDs and exact session creation times are retained as supplied for the repeat-attempt audit. Treat the export as restricted research data, not publicly anonymous data. It contains no participant recordings or contact details.

`included_in_summary` is `no` throughout and must not determine inclusion. The descriptive workflow retains all otherwise eligible unique children, without the preregistration's age-cell cap. Completion-time ordering, unassisted-response eligibility and the final registered sample need review.

SHA-256 of the unchanged supplied bytes: `9f453f84aea33d6dd38c8afa7e1d04d6ff1be9a65130d3e4196126be905d1752`.

[Study guide](../../../docs/study1_baseline_causal_chains/README.md). Keep identifying information and original participant recordings outside GitHub.
