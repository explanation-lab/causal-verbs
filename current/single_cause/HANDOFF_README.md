# Single-Cause (Verbal) Study, Adults & Children

## 1. What this study is testing

A same-format comparison/control arm run alongside Study 2
(`../02_study2_causal_chains_intention_verbal/`): instead of a two-step
causal **chain** (Andy hits Suzy, Suzy breaks the fence), a **single** agent
directly causes the outcome (e.g., one character breaks/cracks an object
directly, with no intermediate agent). Same accidental/intentional
manipulation and the same four question types (caused, lexical causative,
fault, punishment) as Study 2, which lets the two studies be compared
directly: does the distal-vs-proximal effect in the chain studies actually
depend on there being a *chain* at all, or would people distribute blame the
same way even with only one responsible agent to begin with?

This study runs as a **standalone study** (not a condition switch within
Study 2) and is **not yet preregistered** (confirmed by Sunny).

## 2. Which files/folders contain the current version

- `study_code/adults/accidental/`, `study_code/adults/intentional/` — adult
  version, same two-condition structure as Study 2.
- `study_code/adults/slides/` — includes `response_options.pptx` and
  `break_crack.pptx` (the single-cause scenario's outcome slides).
- `study_code/children/` — `img/`, `mp4/`, `slides/`, `jspsych/` (the
  driving trial script is `chains_single_cause_version.js`). This study runs
  standalone rather than as a condition inside Study 2's children's jsPsych
  timeline (confirmed by Sunny), even though the filename might suggest
  otherwise.

This current version was copied from the `single_cause/` folder of
https://github.com/SunnyZ-cs/Cause_Fault_Punishment.

## 3. What versions were previously tried

No separate archived-version folder for the single-cause study specifically
was identified (unlike Study 1/2/3, which each have their own dedicated
archive folder under `PREVIOUS_ARCHIVE/`). It's possible earlier single-cause
versions are mixed into the Study 2 archive
(`PREVIOUS_ARCHIVE/study2_verbal_archive/`) rather than kept separately.

## 4. What data have been collected and the current N

**Adults: N = 30 (15 per condition), a completed pilot.**
`data/single_cause_pilot1-responses.csv` (32 rows including 2 likely
excluded/incomplete) matches this — column structure confirms it belongs
here (single-agent columns only: `bike_cause_andy`, `mirror_fault_sophia`,
with both `accidental`/`intentional` present in `proliferate.condition`).
This matches today's shared lab-meeting deck
(`reference_literature/lab_talk_deck_cause_fault_markman_SZ/`, slide 20):
**"Adult pilot with 30 participants – 15 in each condition."**

**Children: not yet run as of the deck's last edit (today).** The same
slide notes: *"children pilot: result is not ready yet as the Lookit study
is still waiting for approval."*

## 5. What analyses have been run and where the code/results are

`analysis/figures/` now contains five plots recovered from a folder on
Sunny's Desktop called "single cause data": `Who_Broke_It_bar_graph.png`
and four by-age breakdowns (`plot_age_3.png` through `plot_age_6.png`).
These are pilot data (confirmed by Sunny). `analysis/figures/
from_lab_talk_deck/` additionally holds the plots embedded directly in the
"Single cause" section (slides 18–20) of the shared lab-meeting deck. The
script that generated the by-age plots was not located.

## 6. Whether the study is currently live or collecting data

Adults: a 30-participant pilot is complete (Section 4). Children: as of
the shared deck, still waiting on Lookit/CHS approval. Current status has
been communicated by Sunny to David directly, outside this repo.

## 7. What remains unfinished or still needs to be done

- The analysis code behind the five by-age/summary plots (Section 5) was
  not located.

## 8. Anything else someone taking over would need to know

- The shared visual assets (bike/fence, mirror/chair scenarios) and the
  character set (Andy, Suzy, Bobby, Sophia) are the same ones used in
  Studies 1 and 2 — see `presentation_assets_conference_talk/` at the repo
  root for standalone character images if slides/mockups are needed.
