# Cause, Fault, and Punishment Project — Complete Handoff Repository

**Markman Lab, Stanford University**
**Handed off by:** Sunny Zhao (ouzhao@stanford.edu)
**Handoff prepared:** September 12, 2026
**PI / recipient of handoff:** David Rose

This repository is the complete, consolidated record of the "Cause, Fault, and
Punishment" research program: every study, every version of every study, all
data collected so far, all analysis code and results, and all documentation
needed for someone who was not previously working on the project to understand
what has been done, what is currently active, and what remains to be done.

It was assembled in response to David's handoff request emails of
September 5 and September 8, 2026, and follows the structure requested there:
a **CURRENT** section containing everything needed to take over the actively
running work, and a **PREVIOUS_ARCHIVE** section preserving the complete
development history (every version we tried, including ones that didn't work
out or were never run), so nothing has to be reconstructed from memory.

> **A note on how this repo was assembled.**
> This repo was consolidated with the help of an AI assistant (Claude, via
> Cowork) working from (a) the GitHub repositories already created for the
> current study code, (b) the analysis outputs, plots, and preregistration
> documents collected for this handoff, and (c) the READMEs and code
> comments already present in those sources. It is as complete and accurate
> as those sources allow. Section 8 below lists the small number of items
> (platform-dashboard details, GitHub access, a couple of unverified
> labeling guesses) that could not be established from those sources and
> will need to be resolved by David directly going forward.

---

## 1. The major projects / studies

This program investigates how children and adults trace **causal
responsibility, fault, and deserved punishment** through causal chains — cases
where one agent's action sets off a chain of events that leads to an outcome
(e.g., Andy bumps Suzy with his bike, Suzy falls into a fence, the fence
breaks). The central question across studies is whether people (and at what
age children) attribute causation/fault/punishment to the **distal** agent
(the one who started the chain, e.g. Andy) or the **proximal** agent (the one
who directly touched the object, e.g. Suzy), and how this is modulated by the
type of question asked (causal vs. moral), by intention (accidental vs.
intentional), and — in the non-verbal looking-time work — by what children
spontaneously expect without being asked anything at all.

There are four related lines of work, each with adult and/or child versions:

| # | Study (short name used in this repo) | Population | One-line question |
|---|---|---|---|
| 1 | **Study 1 — Causal chains (verbal)** | Adults & children | Do causal, "who broke it," fault, and punishment questions get different answers about the distal vs. proximal agent? |
| 2 | **Study 2 — Causal chains × Intention (verbal)** | Adults & children | Does making the distal agent's action intentional vs. accidental change who gets blamed/punished, and does this hit moral judgments (fault, punishment) harder than causal ones? |
| 3 | **Single-cause (verbal)** | Adults & children | A same-format standalone comparison study with a single-cause (non-chain) scenario, run alongside Study 2's causal-chain scenario. |
| 4 | **Study 3 — Non-verbal looking-time study** | Children (Lookit/CHS) & adults (Prolific/Proliferate) | Without asking any questions, do children/adults *spontaneously look longer* at the agent they expect to be punished/spared, measured via automated gaze coding (iCatcher+ for children, MediaPipe for adults)? |

All four studies share the same theoretical question (distal vs. proximal
responsibility) and many share visual assets (the "Andy/Suzy" bike-and-fence
scenario, the "Bobby/Sophia" mirror-and-chair scenario), but each has its own
code, materials, data, and preregistration, documented separately below.

## 2. What is CURRENT vs. PREVIOUS / ARCHIVE

```
Cause_Fault_Punishment_Handoff/
├── README.md                                  <- you are here
├── CURRENT/                                    <- what's active right now
│   ├── 01_study1_causal_chains_verbal/
│   ├── 02_study2_causal_chains_intention_verbal/
│   ├── 03_single_cause_verbal/
│   └── 04_study3_nonverbal_looking_time/       <- the big one; see its own README
├── PREVIOUS_ARCHIVE/                            <- everything tried before, kept in full
│   ├── study1_verbal_archive/                  <- lookit_material repo (exp1 pilot materials)
│   ├── study2_verbal_archive/                  <- causal_verb_punish repo (7 versions, v1-v4, both conditions)
│   └── study3_nonverbal_archive/               <- pilot1, omission, pilot_kids_version, single_cause standalone, pre-batch3 full study
├── reference_literature/                        <- background papers Sunny compiled, plus published-style summary figures
└── presentation_assets_conference_talk/         <- character/background images used for slides and mockups
```

**Rule used throughout this repo:** the version of a study's code/materials
that is presently running (or was most recently run and is the intended basis
for what runs next) lives under `CURRENT/`. Every other version we ever built
or piloted — including ones abandoned mid-way, ones that didn't work as
intended, or earlier numbered iterations (`_v2`, `_v3`, etc.) — is preserved
under `PREVIOUS_ARCHIVE/`, in its own clearly named folder, **not deleted**.
Nothing was thrown away. Where a folder itself came from an existing GitHub
repository of Sunny's, that repository's own commit history (viewable on
GitHub) is an additional, even more granular record of how that folder
evolved over time — see Section 4.

## 3. Which studies are presently preregistered and/or collecting data

All four lines of work have OSF-style preregistrations (included in each
study's own `preregistration/` folder, and summarized in each study's own
README), with one exception noted below. As of this handoff:

- **Study 1 (verbal, adults & children):** preregistered. Per a shared
  lab-meeting deck David himself last edited **today** (`reference_
  literature/lab_talk_deck_cause_fault_markman_SZ/`), **adults: 100
  participants completed; children: 26 (ages 3–9) so far.** The actual raw
  adult dataset matching this (`chains_baseline_full_run-responses.csv`,
  n=100) has been placed in `CURRENT/01_study1_causal_chains_verbal/data/
  raw_data/`. Figures believed to belong to this study are in
  `CURRENT/01_study1_causal_chains_verbal/analysis/figures/` (labeled
  `new plots 2` on Sunny's computer, plus extras pulled from the shared
  deck).
- **Study 2 (verbal, adults & children, intentional/accidental):**
  preregistered, and a full preregistered run has since launched — data
  collection is ongoing and not yet complete. Current code is the `_v4`
  version of each condition (see Study 2's own README for the version
  history). Four adult pilot datasets were recovered (`CURRENT/02_.../data/
  raw_data/adult_pilot_rounds_unordered/`) and are kept as archival
  pilot data; which round is which is not important to resolve. Same caveat
  on figure identity as Study 1 — figures believed to belong here are in
  `CURRENT/02_study2_causal_chains_intention_verbal/analysis/figures/`
  (`new plots 1` on Sunny's computer).
- **Single-cause (verbal):** current study code is included and runs as a
  **standalone** study (not a condition within Study 2). It is **not yet
  preregistered**. Per the same today-dated lab-meeting deck: **adults — a
  30-participant pilot (15 per condition) is complete; children — not yet
  run, as of today the Lookit study was still waiting for approval.** The
  matching adult raw data (`single_cause_pilot1-responses.csv`) and several
  pilot-data plots have been added under `CURRENT/03_single_cause_verbal/`.
- **Study 3 (non-verbal looking-time, children & adults):** preregistered
  and, as of the most recent pilot (batch 3, n=29 children, analyzed and
  written up — see
  `CURRENT/04_study3_nonverbal_looking_time/07_analysis_code_and_reports/report_to_david.md`
  and `report_to_david_anticipatory.md`), **actively being iterated on with
  David's input on redesign** (adding an anticipatory-looking window,
  removing the post-punishment star asymmetry). The adult non-verbal arm has
  a completed n=61 pilot (MediaPipe pipeline, results included).

## 4. Where each study's code, materials, data, and analyses live

| Study | Study code (current) | Materials/stimuli (current) | Data | Analysis code & results |
|---|---|---|---|---|
| Study 1 | `CURRENT/01_.../study_code/` | inside study_code (images/mp4/slides per age group) | see study's own README, Section 4 | `CURRENT/01_.../analysis/figures/` (plots only; analysis script that produced them not located — Section 8) |
| Study 2 | `CURRENT/02_.../study_code/` | inside study_code | see study's own README, Section 4 | `CURRENT/02_.../analysis/figures/` (plots only; script not located — Section 8) |
| Single-cause | `CURRENT/03_.../study_code/` | inside study_code | see study's own README, Section 4 | `CURRENT/03_.../analysis/figures/` (plots only; script not located — Section 8) |
| Study 3 (non-verbal) | `CURRENT/04_.../03_study_code_*` | `CURRENT/04_.../02_generated_stimuli/`, generation code in `01_stimulus_source_and_generation_code/` | processed gaze CSVs in `06_processed_gaze_results/`; **raw participant videos are NOT in this repo — see Study 3's own README, section "Where the raw data actually lives"** | `07_analysis_code_and_reports/` plus per-batch folders inside `06_processed_gaze_results/` |

The original GitHub repositories Sunny built the `CURRENT/` code from (kept
live on GitHub, and each one's own commit history is itself an additional
archive of how that code evolved) are:

- Current study code (exp1, exp2, single-cause, exp3 codes/materials):
  https://github.com/SunnyZ-cs/Cause_Fault_Punishment
- Study 1 (exp1) archived pilot materials:
  https://github.com/SunnyZ-cs/lookit_material
- Study 2 (exp2) archived versions (7 folders, `_v1`–`_v4`, both conditions):
  https://github.com/SunnyZ-cs/causal_verb_punish
- Study 3 (non-verbal) GitHub repo (an earlier/partial copy — the more
  complete version, including the Sherlock iCatcher pipeline and every pilot
  folder, was only on Sunny's computer and has been folded into this repo in
  full):
  https://github.com/SunnyZ-cs/non_verbal_adults

**Important for David:** these four repositories are currently under a
personal GitHub account (`SunnyZ-cs`), and David does not yet have
collaborator access to them. Full, durable access (not just to this
consolidated repo but to the underlying commit history of each source
repo) will require either adding David as a collaborator on all four
repositories or transferring them to a lab-controlled GitHub organization/
account — this has not been done as part of this handoff. Flagged again in
Section 8.

## 5. What has already been done

- Two verbal studies (Study 1: causal-chain question-type; Study 2:
  intentional vs. accidental) have been built, piloted, and iterated through
  multiple material versions for both adults and children, with OSF-style
  preregistrations drafted for both age groups in both studies.
- A single-cause verbal comparison arm was built alongside Study 2 as a
  standalone study.
- A non-verbal looking-time paradigm (Study 3) was designed, built, and has
  gone through an extensive pilot history: an initial adult pilot (`pilot1`),
  an "omission" variant, a kids pilot version, a standalone single-cause
  non-verbal pilot, an initial combined "full study," and — most recently —
  an updated combined full study that adds the single-cause context into the
  original chains-only design (batch 3, n=29 children analyzed in depth).
- A complete, reusable Sherlock cluster pipeline exists for turning raw
  child videos into gaze codes (iCatcher+) and a parallel, purpose-built
  pipeline for adult videos (MediaPipe), both documented with their own
  READMEs, including known quirks and lessons learned from debugging real
  runs.
- Deep, statistically-grounded analysis has already been done on the batch-3
  non-verbal child data: a full coding/timing audit (no errors found), a
  time-course analysis, a first-gaze-transition analysis, a fair-vs-unfair
  punishment analysis, and a feasibility assessment of further questions
  David asked about — all written up in the two "report to David" documents
  and the feasibility memo included in this repo. The headline finding is
  that children show a strong, consistent preference to look at the
  **unpunished (star-keeping)** character rather than a causal-structure-
  specific effect, with a more nuanced "innocence-orientation" story emerging
  from the anticipatory-window re-analysis.
- An adult non-verbal pilot (n=61, MediaPipe pipeline) has been run and
  processed, though the detailed statistical write-up (if any exists beyond
  the raw summary results) was not located — see Section 8.

## 6. What is currently happening

- The non-verbal study (Study 3) is the most actively evolving piece:
  David and Sunny have been iterating on the design in direct response to the
  batch-3 findings (adding an anticipatory-looking window, planning to remove
  the post-punishment visual asymmetry between characters). See the two
  "report to David" files for the exact state of that conversation as of
  early September 2026.
- Day-to-day management of live studies (reviewing participants, approving/
  rejecting submissions, paying participants) has been handled by Sunny and
  is being handed over to David directly (communicated separately, outside
  this repo).

## 7. What needs to happen next

- David and Sunny's in-progress redesign of the non-verbal study's timing
  (anticipatory window, symmetric post-punishment scene) needs to be
  finalized, implemented in the stimulus-generation code
  (`CURRENT/04_.../01_stimulus_source_and_generation_code/`), and re-piloted.
- The star-vs-character gaze ambiguity flagged in
  `unfair_punishment_feasibility.md` (iCatcher+'s left/right/away categories
  can't distinguish "looking at the punishing star" from "looking at the
  character below it") needs a design or measurement fix if that question is
  still of interest.
- The analysis code behind the existing plots for Studies 1, 2, and
  single-cause was not located anywhere in the materials reviewed (see
  Section 8) — only the resulting plot images exist. Reproducing or
  extending those analyses will require rebuilding that code from
  scratch.
- Access needs to be sorted out: GitHub collaborator access to the four
  underlying repositories (Section 4), and Lookit/Prolific/Sherlock access
  (Section 8).

## 8. What still needs to be confirmed or provided

This section lists the remaining gaps — things this repo could not answer
from the code, files, and plots collected for this handoff. Live
participant-status numbers, the Lab Manager review/payment workflow, and
the Study 1/2/single-cause open questions raised during an earlier pass of
this handoff have already been communicated directly to David and are not
tracked here.

1. **GitHub access to the four source repositories.** David has been
   invited as a collaborator on this consolidated handoff repo, but does
   not yet have access to the four original source GitHub repositories
   (Section 4) — this would need to be granted separately, or those
   repositories transferred to a lab-controlled account.
2. **Lookit/CHS and Prolific/Proliferate study identifiers, links, and
   settings** for every currently-deployed study (exact study IDs, which
   version is deployed where, recruitment criteria, target Ns) — these live
   in those platforms' dashboards, not in the code repos, and are not
   reproduced here.
3. **Where the underlying analysis code for Studies 1, 2, and single-cause
   actually is.** Raw adult response CSVs for all three were located and
   are included (see each study's own README, Section 4), but the analysis
   scripts that turned that data into the plots already in the repo were
   not located for any of the three studies — only the rendered plot
   images exist. Also missing: children's raw data for all three studies
   (only an older Study 1 pilot export was found).
4. **Whether the adult non-verbal pilot (n=61) has a written statistical
   analysis** beyond the MediaPipe summary CSVs included here — none was
   found.
5. **Sensitive/raw data locations and access.** Raw, potentially
   identifiable participant video (e.g., the 2-year-old toddler batch
   webcam recordings) was intentionally not copied into this repo — see
   Study 3's own README for exactly what was excluded and where it was
   last known to live (local storage / Sherlock). Accessing it will
   require Sherlock/departmental-storage credentials rather than anything
   in this repo.
6. **No walkthrough meeting or screen recording was produced** as part of
   this handoff. Onboarding to the project will need to happen through
   this repo's documentation alone.

---
*This README was written to be the entry point for anyone new to the
project. Each subfolder under `CURRENT/` has its own, more detailed README
covering that specific study.*
