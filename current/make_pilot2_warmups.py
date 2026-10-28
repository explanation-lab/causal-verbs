"""
make_pilot2_warmups.py   (Pilot 2 ONLY)

Makes the three single-character warm-ups (punished by the star) with the
Pilot 2 change: the star turns RED while it shakes, stays red through the
pause, and then punishes. Everything else is exactly the existing warm-up.

HOW TO RUN (Terminal, from the animation_practice folder):
    python3 make_pilot2_warmups.py

Needs these files in the same folder (do not edit them):
    shared_primitives.py
    warmup_single_character_trials.py

Results go into output_pilot2/ :
    warmup_punish_left_pilot2.gif
    warmup_punish_center_pilot2.gif
    warmup_punish_right_pilot2.gif
    warmup_pilot2_timing.json
"""
import json
import math
import os

import warmup_single_character_trials as w
from shared_primitives import Color, Expression, Timing, FPS, CENTER_X, AGENT_SIZE


class RedStar:
    """Same red as the Pilot 2 test animations (darker than the red square)."""
    value = "#e03131"


def red_anticipatory_cue(anim, authority):
    """Same as the original, plus: the star turns red as it starts to shake.
    It stays red and still for the 2.5 s pause (the looking window)."""
    anim.pause(w.PRE_SHAKE_PAUSE)
    sound_cue_frame = len(anim.frames)
    authority.expression = Expression.ANGRY
    authority.color = RedStar                      # <-- star turns red
    for i in range(int(w.SHAKE_DURATION * FPS)):
        authority.shake_rotation = w.SHAKE_ROTATION_AMPLITUDE * math.sin(i * 1.8)
        anim.snap()
    authority.shake_rotation = 0.0
    anim.pause(w.ANTICIPATORY_PAUSE)
    return sound_cue_frame


def red_give_punishment(anim, mischief, authority):
    """Same as the original punishment. The only addition: once the star
    calms down (neutral face) it goes back to yellow."""
    anim.move(authority, mischief.x, mischief.y - 140, Timing.MOVE_DURATION)
    authority.arm_target_r = (mischief.x, mischief.y - (AGENT_SIZE / 2) - 25)
    start_gx = authority.x
    for i in range(15):
        authority.x = start_gx + 5 * math.sin(i * 1.5)
        anim.snap()
    authority.x = start_gx
    mischief.has_star, mischief.expression = False, Expression.SAD
    anim.pause(Timing.REWARD_DURATION)
    authority.arm_target_l = authority.arm_target_r = None
    authority.expression = Expression.NEUTRAL
    authority.color = Color.YELLOW                 # <-- calm again = yellow again
    anim.move(authority, CENTER_X, 60, Timing.MOVE_DURATION)


# Swap the original functions for the red versions. The warm-up code looks
# these up by name each time, so this is all that is needed.
w.anticipatory_cue = red_anticipatory_cue
w.give_punishment = red_give_punishment


if __name__ == "__main__":
    out = "output_pilot2"
    os.makedirs(out, exist_ok=True)
    here = os.getcwd()
    os.chdir(out)  # the original code saves into the current folder
    durations, sounds = {}, {}
    try:
        for pos in ("left", "center", "right"):
            name, dur, sound_ms = w.build_warmup(pos)
            new_name = f"warmup_punish_{pos}_pilot2.gif"
            os.replace(name, new_name)
            durations[pos], sounds[pos] = dur, sound_ms
            print("  renamed ->", new_name)
        with open("warmup_pilot2_timing.json", "w") as fh:
            json.dump({"durations_ms": durations, "sound_cue_offset_ms": sounds}, fh, indent=2)
    finally:
        os.chdir(here)
    print("Durations (ms):", durations)
    print("Sound cue offsets (ms):", sounds)
