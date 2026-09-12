# Study 1 — Causal Chains (Verbal), Adults & Children

## 1. What this study is testing

Title (from the preregistrations): *"How do adults [/children] trace fault
and causal responsibility through causal chains?"*

Participants see two causal-chain scenarios (e.g., Andy runs into Suzy with
his bike, Suzy falls into a fence, the fence breaks — a "distal" agent, Andy,
who started the chain, and a "proximal" agent, Suzy, who directly touched the
object that broke). After each scenario, participants answer yes/no questions
about **both** agents, of four types:

- **Caused** ("Did Andy/Suzy cause the fence to break?")
- **Lexical causative** ("Did Andy/Suzy break the fence?")
- **Fault** ("Is it Andy's/Suzy's fault that the fence broke?")
- **Punishment** ("Should Andy/Suzy be punished for the broken fence?")

**Key hypotheses:**

- **H1 (Role × Question-Type interaction):** for caused/fault/punishment
  questions, people favor the **distal** agent (Andy); for the lexical
  causative question, this reverses and people favor the **proximal** agent
  (Suzy). In the children's version, this interaction is additionally
  predicted to strengthen with age.
- **H2 (Fault):** distal > proximal endorsement.
- **H3 (Punishment):** distal > proximal endorsement.

Authors on the preregistration: David Rose, Sunny Zhao, Louise Li, Tobias
Gerstenberg, Shaun Nichols, Ellen Markman.

## 2. Which files/folders contain the current version

- `preregistration/exp1_adults.docx`, `preregistration/exp1_children.docx` —
  the OSF-style preregistrations (full hypotheses, design, sample size plan,
  and analysis plan — read these in full for anything not summarized above).
- `study_code/adults/` — the adult study: `index.html`, `js/`, `images/`,
  `slides/`, plus `convert_data_to_csv.py` and `get_image_size.py` helper
  scripts.
- `study_code/children/` — the children's version: `img/`, `jspsych/`,
  `mp4/` (pre-rendered video scenarios), `slides/`.
- `analysis/figures/` — plots belonging to this study (the folder was
  labeled "new plots 2"): `plot1_combined.png`,
  `plot2_relative_proportions.png`, `plot3_combined.png`,
  `plot4a_causation.png`, `plot4b_responsibility.png`.

This current version was copied from the `exp1/` folder of
https://github.com/SunnyZ-cs/Cause_Fault_Punishment (that repo's commit
history is an additional record of exactly how this code changed over time).

## 3. What versions were previously tried

See `PREVIOUS_ARCHIVE/study1_verbal_archive/` — this is the full contents of
https://github.com/SunnyZ-cs/lookit_material, in particular the
`children_pilot1_exp1mats_with_punish/` folder, which is an earlier pilot
version of the children's materials for this study (includes its own
`json/` folder with `exp1.json`, `exp1_fault_first.json`,
`punishment_study_final.json`, `punishment_study_v2.json` — multiple
question-order/wording variants that were tried — plus its own `mp4/`,
`img/`, and `response_images/`, and an exported, de-identified Lookit
response JSON, `Friends-on-a-Wondrous-Trip_all-responses-identifiable.json`,
**note the filename says "identifiable" — treat this file as containing
participant data and do not share outside the lab / re-upload publicly
without checking what it actually contains**).

## 4. What data have been collected and the current N

**Adults: N = 100, preregistered run, data in hand.**
`data/raw_data/chains_baseline_full_run-responses.csv` is the actual raw
Prolific/Proliferate export for this study (confirmed by its column
structure — `bike_cause_andy`, `mirror_fault_sophia`, etc. — and by
`proliferate.condition` being uniformly `"all"`, i.e. no accidental/
intentional manipulation, consistent with Study 1's design). This matches a
slide in David and Sunny's shared lab-meeting deck (see
`reference_literature/lab_talk_deck_cause_fault_markman_SZ/`, last edited by
David **today**, Sept 12) stating **"Adult (preregistered; 100 participants
completed)."**

**Children: N = 26 (ages 3–9) so far, preregistered, per the same slide** —
no corresponding raw data file for this was found in the folders reviewed
(the children's Lookit/CHS export CSV/JSON itself needs to be located or
re-downloaded from the Lookit dashboard). An earlier pilot's exported JSON
is preserved in `PREVIOUS_ARCHIVE/study1_verbal_archive/` (see Section 3),
but is not the current 26-participant dataset.

An earlier adult pilot (`chainspilot8-responses.csv`, n=40, same "all"
condition marker) is preserved in
`PREVIOUS_ARCHIVE/study1_verbal_archive/adult_pilot_response_data/` rather
than treated as current data.

## 5. What analyses have been run and where the code/results are

Five summary plots exist (`analysis/figures/`, see Section 2), but the
script that generated them was not found anywhere in the materials
reviewed for this handoff. It may have been written directly in a
notebook that was never saved to disk, or may exist somewhere outside the
scope of this handoff (e.g. Sherlock) — the generating code should be
treated as lost unless it turns up elsewhere.

## 6. Whether the study is currently live or collecting data

Per today's lab-meeting deck: adults show as "completed" (100/100) and
children are still being collected (26 so far). Current live/recruitment
status has been communicated by Sunny to David directly, outside this repo.

## 7. What remains unfinished or still needs to be done

- The analysis code behind the current plots was not located (Section 5).
- Everything in the top-level README's Section 8 that applies generally
  (GitHub access, etc.).

## 8. Anything else someone taking over would need to know

- The adult and children's study code use **jsPsych**; the children's
  version is built to be hosted on **Lookit / Children Helping Science
  (CHS)**, consistent with the pattern used across all studies in this
  project.
- `convert_data_to_csv.py` and `get_image_size.py` in `study_code/adults/`
  are utility scripts (likely for post-collection data wrangling and for
  sizing stimulus images) — check these before assuming they're unused
  boilerplate; they may be exactly the missing analysis-adjacent code
  referenced in Section 5, though on inspection they appear to be data-format
  conversion utilities rather than the statistical analysis itself.
