# Non-Verbal Looking Time Study Animation Codes

This directory contains the Python scripts used to generate and reproduce the counterbalanced visual stimuli (Warmup and Test Trial GIFs/PNGs) for the unified **`non_verbal_full_study`** experiment, as well as the main jsPsych experiment script.

All animations use the bubbly/glossy 3D visual style (with sphere highlights, gradient shading, and custom facial expressions) and feature the yellow star "authority" character carrying out star yanks using a magic wand.

**Anticipatory-cue shake mechanics (post-David-feedback revision):** the star's brief angry shake (the moment the sound cue fires, in `anticipatory_cue()` in all three of `warmup_single_character_trials.py`, `generate_causal_chains_test_trials.py`, and `generate_single_cause_test_trials.py`) is a **rotation-only wobble** of the star's points around its own center (`Agent.shake_rotation`, consumed by `Renderer.draw_star`'s `rotation` argument) -- the star's x/y position is never touched during the shake, so it never visibly shifts. All three scripts use the identical `SHAKE_ROTATION_AMPLITUDE = 0.14` (radians) and phase step, so the shake looks the same in warmup and test. The test-trial scripts also now call `dither()` (the same frame-collapse fix warmup already used) once on the full animation before any GIF is saved, so Pillow can no longer silently merge near-identical shake frames -- test-trial shakes now render every frame, same as warmup. After the shake loop, both test-trial scripts snap one extra "settled" frame at `shake_rotation=0.0` before capturing `split_frame` -- without it, the anticipatory-freeze PNG (and the last frame of part1) still showed the star mid-tilt from the shake's final oscillation step, reading as if the shake got cut off early; warmup didn't need this since its post-shake `pause()` already re-renders at the reset rotation. Note: the *separate*, later shake during star removal (`give_punishment()` / `reveal_and_punish()`) is unrelated to the sound cue and still moves the star slightly toward the target -- only the anticipatory-cue shake was changed.

**No circles or pink in test trials:** since the warmup's single character is a pink circle, none of the test-trial agents use `Shape.CIRCLE` or `Color.PINK` -- agent `G` (previously a Brown Circle) is now a Brown Triangle in both `generate_causal_chains_test_trials.py` and `generate_single_cause_test_trials.py`.

**`part1.gif`/`part2.gif` now use `loop=1`, not `loop=0`:** with `loop=0` (infinite loop), if the JS's `<img src>` swap from `part1.gif` to the anticipatory-freeze PNG happened even slightly late, the GIF would already have restarted from frame 0 (the neutral pre-outcome scene) -- so the shake could appear to not play at all, or the star could look like it jumped straight to angry, depending on exactly how late the swap landed. `loop=1` makes the GIF play once and then hold on its last frame (same behavior already relied on in `warmup_single_character_trials.py`), and that last frame is pixel-identical to the anticipatory-freeze PNG it gets swapped to, so there's no visible discontinuity no matter how the timing lands. Also applies to `part2.gif` (belt-and-suspenders; it already had a 10s hold on its own last frame, so it wasn't actually at risk, but there's no downside to matching `part1.gif`'s setting).

---

## File Registry

### 1. [shared_primitives.py](shared_primitives.py)
*   **Intention**: Shared graphics drawing primitives (`Renderer`), data models (`Agent`, `Prop`), animation helpers (`AnimationHelper`), and configuration constants (canvas dimensions, colors, and timing parameters).

### 2. [warmup_single_character_trials.py](warmup_single_character_trials.py)
*   **Intention**: Generates the 3 single-character punishment warmup animations used in the study design (replacing the old two-character familiarization combos as the warmup phase). Reuses the exact punishment choreography (approach → steal/damage → carry back) from the trash/tower/flower scenes, but with a single pink-circle character. The character is drawn **eyes-only**; the star authority keeps its full expressions, exactly as in the test trials.
*   **Left/center/right labeling**: the `left`/`center`/`right` in each output filename refers to the pink circle's x-position **at the punish moment**, not the prop's position. Current assignment: **tower** scene → `left` (x=200, tower at x=270), **trash** scene → `center` (x=400, exact canvas center; bin at x=330), **flower** scene → `right` (x=600, flower at x=530).
*   **Execution**:
    ```bash
    python3 warmup_single_character_trials.py
    ```
*   **Outputs**: `warmup_punish_left.gif`, `warmup_punish_center.gif`, `warmup_punish_right.gif` (~16.7-17.1 s each, loop=1, holds last frame), automatically copied to `../materials/`.

### 3. [generate_single_cause_test_trials.py](generate_single_cause_test_trials.py)
*   **Intention**: Generates standard and reverse mirrored test trial animations representing the **single-cause** condition. The proximal agent directly collides with and breaks the gray cube. Before that, the distal/bystander agent makes a small, clearly irrelevant hop-in-place (temporally separated by pauses on both sides, `HOP_PRE_PAUSE`/`HOP_POST_PAUSE` around `AnimationHelper.jump()`), so it isn't the only character that never moves at all. The causal event is shown **once**. Characters are drawn **eyes-only**; the star authority keeps its full expressions.
*   **Execution**:
    ```bash
    python3 generate_single_cause_test_trials.py
    ```
*   **Outputs**: Exports standard/reverse animations and freeze PNGs, automatically copying them to `../materials/` under the prefix `single_cause_`.

### 4. [generate_causal_chains_test_trials.py](generate_causal_chains_test_trials.py)
*   **Intention**: Generates standard and reverse mirrored test trial animations representing the **causal chain** condition. The distal agent rushes violently into the proximal agent, propelling it into the gray cube to break it -- shown **once**. Characters are drawn **eyes-only**; the star authority keeps its full expressions.
*   **Execution**:
    ```bash
    python3 generate_causal_chains_test_trials.py
    ```
*   **Outputs**: Exports standard/reverse animations and freeze PNGs, automatically copying them to `../materials/` under the prefix `chains_`.

### 5. [CHS_jsPsych.js](CHS_jsPsych.js)
*   **Intention**: The main experimental jsPsych codebase. Includes the full trial timeline logic, consent, instructions, warmup ordering randomization, eye-tracking web camera recording controls, dynamic split-GIF slide sequence with anticipatory freezes, and exit survey integrations. Paste the contents of this file directly into the "jsPsych Experiment Code" editor on childrenhelpingscience.com.

---

## Replication Guide

To generate and sync all material assets (test stimuli and warmups):
1. Make sure you have python `pillow` installed (`pip install Pillow`).
2. Run the scripts in order:
    ```bash
    python3 generate_single_cause_test_trials.py
    python3 generate_causal_chains_test_trials.py
    python3 warmup_single_character_trials.py
    ```
