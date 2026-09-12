# Study 2 — Causal Chains × Intention (Verbal), Adults & Children

## 1. What this study is testing

Title (from the preregistrations): *"How does intention affect adult
[/children's] attributions of fault and causal responsibility in causal
chains?"*

Same causal-chain scenarios as Study 1 (e.g., Andy hits Suzy with his bike,
Suzy falls into a fence, the fence breaks), but now the distal agent's action
is manipulated to be either **Intentional** (Andy wanted to damage the fence)
or **Accidental** (his bike chain slipped, out of his control). Participants
answer the same four question types as Study 1 (caused, lexical causative,
fault, punishment) about both agents.

**Key hypotheses:**

- **H1:** the Intentional-vs-Accidental effect on distal-agent selection is
  bigger for moral-evaluative questions (fault, punishment) than for causal
  questions (caused, lexical causative), and biggest of all for punishment.
  In children, this pattern is predicted to strengthen with age.
- **H2 (Punishment):** distal agent selected more in Intentional than
  Accidental condition (strengthening with age in children).
- **H3 (Lexical causative):** responses shift toward the distal agent more
  in the Intentional than the Accidental condition.

Authors: David Rose, Sunny Zhao, Louise Li, Tobias Gerstenberg, Shaun
Nichols, Ellen Markman.

## 2. Which files/folders contain the current version

- `preregistration/exp2_adults.docx`, `preregistration/exp2_children.docx`.
- `study_code/adults/accidental/` and `study_code/adults/intentional/` — the
  two between-subjects conditions, adult version (jsPsych/HTML/JS).
- `study_code/children/` — children's version (`img/`, `jspsych/`, `mp4/`,
  `slides/`).
- `analysis/figures/` — plots belonging to this study ("new plots 1"):
  `plot1_combined.png`, `plot2_relative_proportions.png`,
  `plot3_combined.png`, `plot4a_causation.png`, `plot4b_responsibility.png`.

**Version note:** the adult `accidental`/`intentional` folders here were
confirmed (by diffing against the archive) to match the **`_v4`** versions in
`PREVIOUS_ARCHIVE/study2_verbal_archive/` byte-for-byte except for stimulus
image renaming — `_v4` is the current/final iteration for both conditions.

This current version was copied from the `exp2/` folder of
https://github.com/SunnyZ-cs/Cause_Fault_Punishment.

## 3. What versions were previously tried

`PREVIOUS_ARCHIVE/study2_verbal_archive/` is the complete contents of
https://github.com/SunnyZ-cs/causal_verb_punish, which contains **seven**
historical version folders, all preserved:

- `experiment2_accidental/`, `experiment2_accidental_v2/`,
  `experiment2_accidental_v4/` (= current, see above)
- `experiment2_intentional/`, `experiment2_intentional_v2/`,
  `experiment2_intentional_v3/`, `experiment2_intentional_v4/` (= current)

Note the accidental condition has no separate `_v3` — check the GitHub
repo's commit history (linked above) if the reason for that gap matters for
reproducing the exact development timeline.

## 4. What data have been collected and the current N

A full preregistered run has since launched for this study; **data
collection is ongoing and not yet complete** (confirmed by Sunny).

**Four adult raw-data files were found and placed in
`data/raw_data/adult_pilot_rounds_unordered/`** — all four share
the same column structure (`bike_cause_andy`/`suzy`, `mirror_fault_bobby`/
`sophia`, etc., both agents, both conditions present in
`proliferate.condition`: `accidental`/`intentional`), confirming they
belong to this study rather than Study 1 or single-cause:

| File | n | Notes |
|---|---|---|
| `exp2_new_pilot-responses.csv` | 41 | explicitly named exp2 |
| `adult_causation_and_punishment_new_updated_to_8_qs-responses.csv` | 41 | "new" in the name |
| `adult_causation_and_punishment_updated_to_8_qs_for-responses.csv` | 42 | filename appears truncated on disk |
| `causation_and_punishment_without_priming_test_verb-responses.csv` | 40 | reads as a specific control/methods-check pilot (testing whether the lexical verb used "primes" responses) rather than a numbered main-study pilot |

These are earlier pilot-stage rounds rather than the current preregistered
run; the exact ordering between them is not important to resolve. No
children's data file for this study was found.

## 5. What analyses have been run and where the code/results are

Same situation as Study 1: five summary plots exist
(`analysis/figures/`), but the generating analysis script was not located
in the folders reviewed.

## 6. Whether the study is currently live or collecting data

A full preregistered run has launched; data collection is ongoing (not yet
complete), per Sunny.

## 7. What remains unfinished or still needs to be done

- The analysis code behind the current plots was not located (Section 5).

## 8. Anything else someone taking over would need to know

- Both conditions (accidental/intentional) share the same trial/analysis
  structure as Study 1 (caused / lexical causative / fault / punishment
  questions about both agents), just with the added Intentional/Accidental
  manipulation — so Study 1's analysis approach, once located, likely
  generalizes directly to this study with the extra factor added.
- The Single-Cause study (`../03_single_cause_verbal/`) runs as its own
  standalone study (not a condition switch within this one) and is not yet
  preregistered separately.
- `convert_data_to_csv.py` / `get_image_size.py` appear in every version
  folder (current and archived) — these are per-study-version data-wrangling
  utilities, not the final statistical analysis (see Study 1's README,
  Section 8, for what was confirmed about their contents).
