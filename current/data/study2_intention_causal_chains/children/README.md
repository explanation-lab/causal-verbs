# Study 2 — Intention × causal chains — child data

[exp6_raw_responses.csv](exp6_raw_responses.csv) is the current supplied Study 2 child snapshot, added September 20, 2026. Collection remains ongoing. Sessions span July 24–September 16, 2026; the export does not establish that collection or the registered sample is complete. The download's `(2)` filename suffix was removed, but every file byte is unchanged.

One row is a question response, including warmups, with one empty-session placeholder. There are 7,523 rows, 422 sessions and 416 distinct child hash codes. Of 410 sessions marked for analysis, selecting one eligible attempt per child leaves 406 children aged 3–9 in Intentional and Accidental conditions. The [shared R Markdown workflow](../../../code/R/README.md) reports condition-by-age Ns and every repeat attempt.

`child_hashed_id` identifies a child; `participant_hashed_id` identifies an account. These are hashed codes, not names. Session IDs and exact creation times remain as supplied for the audit. Treat the export as restricted research data, not publicly anonymous data. It contains no participant recordings or contact details.

**Do not filter on `completed`: it is `False` throughout, including usable sessions.** `included_in_summary` is also `no` throughout and is ignored. Use the documented analysis, true-completion, withdrawal/exclusion and actual-answer fields. The descriptive workflow is uncapped; the preregistered per-age/per-condition cap, completion-time ordering and unassisted-response eligibility still need review.

SHA-256 of the unchanged supplied bytes: `c5c10b23ac1accd8b4af72124639ded530e914afaa247a7b399f4d513cedb8cf`.

[Study guide](../../../docs/study2_intention_causal_chains/README.md). Keep identifying information and original participant recordings outside GitHub.
