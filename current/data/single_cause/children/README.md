# Single Cause — child data

[exp7_raw_responses.csv](exp7_raw_responses.csv) is the supplied September 20, 2026 export, added without changing raw values. SHA-256: `df1cca8ac435a0b899707c8d9489263633708730f2da3003094e4dac6c186d98`.

The file has 970 rows, 97 response sessions and 97 unique child IDs, ages 3–6. Each session has two warmups and eight test answers: Bike/Mirror × Caused/Lexical/Fault/Punish. One session is withdrawn and flagged `include_in_analysis = no`; 96 unique children remain (50 Intentional, 46 Accidental). No repeat child IDs occur. The shared workflow recalculates these counts and stops for review if they differ.

Use `include_in_analysis`, withdrawal/exclusion information and `true_completion_status`. `completed` is False throughout and is not an inclusion criterion. `included_in_summary` is a row-level export flag, not a participant filter. Exclude all warmups from scientific scores. Average Yes=1/No=0 across available scenarios within child × condition × measure before summarizing participants. No relative-attribution score is used.

| Age | Intentional | Accidental |
| --- | ---: | ---: |
| 3 | 14 | 12 |
| 4 | 10 | 14 |
| 5 | 13 | 10 |
| 6 | 13 | 10 |
| Total | 50 | 46 |

The dataset is now available; its exact deployment revision and relationship to the preserved historical age plots remain unverified. Hashed child/account codes, session IDs and timestamps remain restricted research metadata in this private repository. Schema/content review and a secret scan found no direct names, contact details, credentials or recording links. No privacy transformation was applied to this supplied export.

[Shared R Markdown analysis](../../../code/R/causal_verbs.Rmd) · [Study guide](../../../docs/single_cause/README.md) · [New talk figures](../../../figures/single_cause/talk/)

**Additional export quirk:** `expected_test_questions_n` and `answered_test_questions_n` both equal 2 throughout, despite eight actual Bike/Mirror answers per session. Their meaning is unverified. The workflow counts actual substantive rows and audits these exported values; it does not use them as scientific test totals or alter the CSV.
