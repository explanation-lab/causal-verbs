# Response to data-digging requests (batch3, n=29)

Hi David,

I completed the audit and the frame-level analyses. Summary below; figures and CSVs are attached (time-course plot, individual-child plot, window comparisons, first transitions).

## 1. What the iCatcher categories are
Output is per-frame: **left, right, away**, plus separate invalid codes (**noface / none**) and a **confidence score** for every frame. "Away" means looking away from the screen, not center — iCatcher+ has no center category. Invalid/no-face frames were never mixed into the character bars in the earlier plots (they were excluded), and away frames were plotted separately. Invalid frames were rare (4%); away was 19%.

## 2. Coding audit — no errors found
- Verified all 29 participants' context / punished-character / direction labels in the analysis CSV against the raw CHS session JSON: 29/29 match.
- Verified side mappings against the actual stimulus GIFs and freeze frames in the repo: forward = distal on left; backward versions are exact mirrors; both characters stay on their sides throughout the analysis window. The left/right→distal/proximal conversion (reversed for backward trials) is applied correctly on every row.
- Timing: the recording/analysis window is exactly the 20 s freeze frame. In the animation, the star authority approaches the to-be-punished character at ~16.5 s and removes its reward star at ~17.5–18.7 s, so "punishment onset" is ~1–2 s **before** our window begins. A pre-punishment baseline isn't available from the current annotations (videos were cropped at freeze onset before iCatcher ran); if we want the −1 to 0 s window we'd need to re-run iCatcher on the uncropped videos — feasible, just another Sherlock pass.
- One design point relevant to interpretation: punishment is star **removal**, and the unpunished character keeps its reward star throughout the freeze. So "looking at the unpunished character" is equivalently "looking at the character that still has a star."

## 3. Time course (4-cell plot attached)
The aggregate effect is driven by a very strong early component: in the **first second** of the freeze, gaze is almost entirely on the unpunished character (distal-punished trials: 12% distal-looking; proximal-punished: 89–95% distal-looking; identical in both contexts). Preference then relaxes over the window (e.g., chains distal-punished climbs from 0.12 to ~0.49 by 3–20 s). Notably, the final animation motion is on the **punished** character's side (the star removal), so the early unpunished-side looking is an active shift away from the punished character, not passive motion tracking — children have already moved their eyes to the unpunished character by the time the freeze starts.

## 4. Window comparisons (0–1 s / 1–3 s / 3–20 s)
Unpunished-preference is strongest at 0–1 s, still present at 1–3 s, and weakens but persists at 3–20 s in all four cells. Chains and single-cause remain near-identical in every window (largest context difference: 1–3 s proximal-punished, single-cause 0.84 vs chains 0.71 distal-looking — small and within noise at these n's).

## 5. First gaze transition
At freeze onset, 46/47 analyzable trials begin on the unpunished character (or away); essentially none begin on the punished one. The modal first transition is **unpunished → punished** (34/57 trials, median latency ~1.1–2.0 s) — children check the punished character after about a second. This pattern is the same for congruent and incongruent punishments.

## 6. Third category (away/invalid)
Away-looking is modest early (9–12%) and rises later (~20–21%), with no meaningful difference between congruent and incongruent punishment (early away: congruent 12.3%, incongruent 9.2%) or between contexts. No evidence of punishment-induced disengagement specific to incongruent outcomes.

## 8. Confidence / missing data
Robust. Excluding low-confidence frames (<0.8; 18% of L/R frames) or trials with <5 s of valid looking changes cell means by ≤0.04 and no conclusions. Usable-frame rates are similar across condition (74–81%), context, direction, and age; low-confidence rates don't differ systematically by cell.

## 9. Trial order
The unpunished-preference is already present on the very first critical trial (mean unpunished-looking 0.67 first trial vs 0.60 second), so it is not learned across test trials. (Context is between-subjects, so no chain-before-single-cause carryover exists in this design.)

## 10. Individual children
The pattern is broadly shared, not outlier-driven: 13/16 chains and 12/13 single-cause children look more at the distal character when proximal is punished than when distal is punished (mean within-child shift +0.25 / +0.29). Individual-level plot attached, with line weight showing usable frames per child.

## Bottom line
No coding, mapping, or timing error — the effect is real in the data and remarkably uniform: children arrive at the freeze already fixating the unpunished (star-retaining) character, check the punished one after ~1 s, and maintain a weaker unpunished preference thereafter, identically in both causal contexts and regardless of congruence. The current measure looks like a general response to the punishment/reward outcome (plausibly drawn to the remaining star) rather than a causal-structure effect. Two things that could give the causal-context question a fairer test: (1) re-run iCatcher on uncropped videos to get the pre-punishment and punishment-anticipation window — if children's causal understanding shows anywhere, it may be in anticipatory looking as the authority approaches, before the outcome; and (2) unpause the study for more single-cause data, as you suggested.

Best,
Sunny
