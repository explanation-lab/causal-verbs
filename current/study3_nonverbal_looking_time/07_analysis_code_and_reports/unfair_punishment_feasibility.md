# Can we test "unfair punishment -> longer looking"? (feasibility + results)

## Question 1: looking longer at the *punished character* when the punishment is unfair

**Yes, answerable now with existing batch3 data (n=29) — and I ran it.**

Defined fair/unfair via the same congruence rule already used elsewhere in this project:
distal-punished is the "fair"/congruent outcome in chains (distal caused the chain), and
proximal-punished is "fair"/congruent in single cause (proximal is the only active cause).
For each child, I compared looking time at the punished character (as a proportion of all
character-directed looking, excluding away) on their fair-punishment trial vs. their
unfair-punishment trial (paired, since context is between-subjects but punishment condition
is within-subject).

| Context | Fair (congruent) looking at punished char | Unfair (incongruent) looking at punished char | Paired diff (unfair − fair) | 95% CI | p | n |
|---|---|---|---|---|---|---|
| Chains | 0.482 (distal punished) | 0.268 (proximal punished) | **−0.214** | [−0.403, −0.025] | **.029** | 15 |
| Single cause | 0.332 (proximal punished) | 0.378 (distal punished) | +0.047 | [−0.091, +0.184] | .47 | 13 |

**The result is real, but backwards from the hypothesis.** In chains, kids look *less* at the
punished character when the punishment is unfair (proximal punished), not more — they look
away toward the other (true-cause, un-punished) character instead. In single cause the same
comparison is in the hypothesized direction (unfair > fair) but small and not significant,
likely underpowered at n=13.

This lines up with what's already in `report_to_david.md`: the dominant pattern in this
dataset is a general **preference for the unpunished/star-keeping character**, and this new
analysis shows that preference gets *stronger*, not weaker, specifically when the punishment
looks unfair (at least in chains). So rather than "surprise/protest looking pulls kids toward
the unfairly-punished character," it looks more like "kids actively look away from an
unfairly-punished character, toward the one who (correctly) got away with it." Worth flagging
to the lab as the opposite-sign version of the hypothesis, not a null result.

Figure: `punished_char_fair_vs_unfair.png` (bar chart, both contexts, fair vs. unfair, SEM
error bars).

## Question 2: looking longer at the *star* (authority) when it unfairly punishes

**Not reliably answerable with the current gaze-coding setup — this is a measurement problem, not a power problem.**

iCatcher+'s output has exactly three spatial categories: `left`, `right`, `away` (plus
invalid/no-face). It has no finer spatial resolution — no pixel coordinates, no separate
"center" or "upper" region. The star authority isn't in a fixed, separate location during the
punishment/outcome window: per `report_to_david.md`, "the star authority approaches the
to-be-punished character... and removes its reward star," and the redesigned stimuli confirm
the same thing — the authority flies to hover *directly above* whichever character is being
punished (same horizontal side, just higher up) and stays there through the freeze. Since
iCatcher's left/right classification is a coarse horizontal judgment, a child looking at the
authority and a child looking at the character below it would very likely get coded
identically. With the current setup, "looking at the star during punishment" and "looking at
the punished character" are the same signal, not two separable ones — so this analysis would
just reproduce Question 1's numbers under a different label, not test a distinct hypothesis.

**What would make this answerable:**
1. **Finer gaze localization.** Either a different automated tool that outputs actual gaze
   coordinates/AOI-of-fixation rather than a 3-way left/right/away label (there's already a
   MediaPipe-based pipeline in this project, used for the adult pilot — worth checking whether
   it's accurate enough on child webcam footage to give real x/y or fixation-region output), or
   manual frame coding of a subsample specifically for star-vs-character fixations.
2. **Or, redesign the stimulus** so the star occupies a screen region no character ever
   occupies (e.g., it returns to top-center immediately after removing the star, instead of
   staying parked above the punished character through the whole freeze). That would make
   "looking at center" a genuinely distinct, codable signal from "looking at either character" —
   but it's a real design change (re-timing the animation, re-collecting data with the new
   timing) and changes what "outcome freeze" looking time means, so it's not a quick fix.

My recommendation: hold off on the star-specific analysis until one of those is in place rather
than reporting a number that's actually just Question 1 relabeled.
