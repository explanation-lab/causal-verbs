"""
make_pilot_animations.py

Makes the Pilot 1 or Pilot 2 animations (chain AND single-cause, each moving
left-to-right AND right-to-left).

HOW TO RUN (in Terminal, from the animation_practice folder):
    python3 make_pilot_animations.py 1      # Pilot 1 (no star punisher)
    python3 make_pilot_animations.py 2      # Pilot 2 (red star, pause, punishment)
    python3 make_pilot_animations.py 3      # Pilot 3 (chain, distal; NO star above the
                                            # scene, but both characters keep their stars)

This file needs these two files in the same folder (do not edit them):
    shared_primitives.py
    generate_causal_chains_test_trials.py   (we reuse its drawing code only)

Results go into a new folder: output_pilot1/, output_pilot2/ or output_pilot3/

Changes compared with the older files:
  * Chain is smooth: character 2 starts moving the very next frame after
    character 1 touches it (no slow-down / pause in between).
  * Single cause: the watching character is completely still (hop removed).
  * Event is shown once.
  * Pilot 1: no star punisher and no little stars above the characters.
  * Pilot 2: the star turns RED when it shakes, stays red through the pause,
    then punishes.
  * Pilot 3: the same chain scene as Pilot 2 (distal characters E and F), but
    with NO star hovering above. The triangle and the square keep the little
    stars above their heads. It runs for the same length as Pilot 2's first part
    and then stays frozen, so a question can be asked.
  * Both directions: the left-to-right scene is mirrored to make right-to-left.
"""
import math
import os
import sys
import json

from PIL import Image

from shared_primitives import (
    Color, Shape, Expression, Agent, Renderer, AnimationHelper,
    FPS, WIDTH, CENTER_X, AGENT_SIZE, GROUND_Y, Timing
)
# Importing this file also switches on the cube drawing and the eyes-only
# faces (it patches Renderer when imported). We reuse BreakableCube and dither.
from generate_causal_chains_test_trials import BreakableCube, dither

MS_PER_FRAME = 1000 // FPS  # 40 ms


class RedStar:
    """Stand-in for a Color so the star can be red. Darker than the red
    square character (#ff6b6b) so the two reds are not identical."""
    value = "#e03131"


# ------------------------------------------------------------------
# Timing (in FRAMES, so the chain and single-cause scenes line up exactly)
# ------------------------------------------------------------------
INTRO_FRAMES = int(2.0 * FPS)        # calm scene before anything happens
RUSH_FRAMES = int(0.35 * FPS)        # how long each "rush" movement takes
# Both scenes: the cube is hit on the SAME frame. Chain needs two rushes
# (char 1 then char 2), single cause only one, so single cause waits longer.
CHAIN_LEAD_FRAMES = int(0.75 * FPS)
SINGLE_LEAD_FRAMES = CHAIN_LEAD_FRAMES + RUSH_FRAMES

POST_BREAK_FRAMES = int(0.15 * FPS)  # shards settle
PRE_SHAKE_FRAMES = int(0.3 * FPS)    # short beat before the star reacts
SHAKE_FRAMES = int(0.48 * FPS)       # the shake itself
SHAKE_AMPLITUDE = 0.14               # radians; star rocks in place
PILOT1_END_HOLD_FRAMES = int(0.5 * FPS)  # after the break, before the freeze
ANTIC_FREEZE_MS = 3000               # Pilot 2: still red star = the looking window
FINAL_FRAME_MS = 30000               # Pilot 2: last frame is held; the experiment ends the trial first


def linear_move(anim, agent, tx, ty, frames):
    """Constant-speed movement. Unlike AnimationHelper.move(), it does NOT
    ease in/out and does NOT repeat the starting frame, so one character can
    hand off to the next with no visible pause."""
    sx, sy = agent.x, agent.y
    for i in range(1, frames + 1):
        t = i / frames
        agent.x, agent.y = sx + (tx - sx) * t, sy + (ty - sy) * t
        anim.snap()


def hold(anim, frames):
    for _ in range(frames):
        anim.snap()


class PilotScene:
    def __init__(self, context, c1, c2, pilot):
        assert context in ("chains", "single_cause")
        self.context, self.pilot = context, pilot
        self.r = Renderer()
        if context == "chains":
            self.start1, self.start2 = AGENT_SIZE / 2, 200 + AGENT_SIZE
        else:
            self.start1, self.start2 = 160, CENTER_X
        self.agent1 = Agent("Agent1", c1["shape"], c1["color"], self.start1, 227)
        self.agent2 = Agent("Agent2", c2["shape"], c2["color"], self.start2, 227)
        self.cube = BreakableCube(WIDTH - 100, GROUND_Y)

        agents = [self.agent1, self.agent2]
        self.authority = None
        if pilot == 2:  # the star only exists in Pilot 2
            self.authority = Agent("authority", Shape.STAR, Color.YELLOW, CENTER_X, 60)
            agents.append(self.authority)
        self.anim = AnimationHelper(self.r, agents, [self.cube])
        self.split_frame = None   # Pilot 2: end of part 1 (anticipatory freeze)
        self.sound_frame = None   # Pilot 2: frame where red shake + sound begins

    # ---------------- the causal event ----------------
    def run_event(self):
        a = self.anim
        stop_x_2 = WIDTH - 100 - AGENT_SIZE + 5  # character 2 ends touching the cube

        if self.context == "chains":
            hold(a, CHAIN_LEAD_FRAMES)
            # Character 1 rushes until it touches character 2 ...
            contact_x_1 = self.start2 - AGENT_SIZE
            linear_move(a, self.agent1, contact_x_1, 227, RUSH_FRAMES)
            # ... and character 2 moves on the very next frame (smooth handoff).
            linear_move(a, self.agent2, stop_x_2, 227, RUSH_FRAMES)
        else:
            hold(a, SINGLE_LEAD_FRAMES)
            # Character 1 (watcher) does NOTHING: no hop, completely still.
            linear_move(a, self.agent2, stop_x_2, 227, RUSH_FRAMES)

        self._break_cube()

    def _break_cube(self):
        self.cube.state = "broken"
        cx = WIDTH - 100
        self.cube.fragments = [
            (cx-5, 230, -4, -7, 0), (cx+5, 220, 2, -12, 45),
            (cx+15, 235, 6, -10, 90), (cx-15, 245, -7, -5, 15),
            (cx-5, 250, -2, -15, 200), (cx+5, 240, 1, -7, 75),
            (cx+15, 255, 9, -6, -45), (cx-10, 260, -1, -4, 120),
            (cx, 265, 4, -2, 60), (cx+20, 260, 11, -9, -90),
        ]
        gravity, active, n = 1.5, True, 0
        while active and n < 100:
            active, new = False, []
            for fx, fy, dx, dy, rot in self.cube.fragments:
                nfx, nfy, ndy, nrot = fx + dx, fy + dy, dy + gravity, rot + dx * 3
                if nfy >= GROUND_Y - 11:
                    nfy, ndy, dx = GROUND_Y - 11, 0, dx * 0.8
                    if abs(dx) < 0.5:
                        dx = 0
                if ndy != 0 or dx != 0:
                    active = True
                new.append((nfx, nfy, dx, ndy, nrot))
            self.cube.fragments = new
            self.anim.snap()
            n += 1
        hold(self.anim, POST_BREAK_FRAMES)

    # ---------------- Pilot 2 only: red shake, pause, punishment ----------------
    def anticipatory_cue(self):
        a = self.anim
        hold(a, PRE_SHAKE_FRAMES)
        self.sound_frame = len(a.frames)
        self.authority.expression = Expression.ANGRY
        self.authority.color = RedStar          # <-- star turns red as it shakes
        for i in range(SHAKE_FRAMES):
            self.authority.shake_rotation = SHAKE_AMPLITUDE * math.sin(i * 1.8)
            a.snap()
        self.authority.shake_rotation = 0.0
        a.snap()                                # settled frame (still red, angry)
        self.split_frame = len(a.frames)        # JS holds this frame as the pause

    def reveal_and_punish(self, target):
        a, au = self.anim, self.authority
        a.move(au, target.x, target.y - 140, Timing.MOVE_DURATION)
        star_x, star_y = target.x, target.y - (AGENT_SIZE / 2) - 25
        au.arm_target_r = (star_x, star_y)
        a.pause(0.2)
        start_x = au.x
        for i in range(25):
            off = 5 * math.sin(i * 1.5)
            au.x = start_x + off
            target.expression = Expression.SAD
            au.arm_target_r = (star_x + off, star_y)
            a.snap()
        au.x = start_x
        target.has_star = False
        target.expression = Expression.SAD
        au.has_star = False
        au.arm_target_r = None
        a.pause(0.5)

    # ---------------- build + save ----------------
    def build(self, target=None):
        """Pilot 2 needs target (agent1 = distal punished, agent2 = proximal)."""
        if self.pilot in (2, 3):
            self.agent1.has_star = True
            self.agent2.has_star = True
        hold(self.anim, INTRO_FRAMES)
        self.run_event()
        if self.pilot == 2:
            self.anticipatory_cue()
            self.reveal_and_punish(target)
        elif self.pilot == 3:
            # Same number of frames as Pilot 2's part 1 (calm beat + shake +
            # settled frame), but with no star: the scene simply holds.
            hold(self.anim, PRE_SHAKE_FRAMES + SHAKE_FRAMES + 1)
        else:
            hold(self.anim, PILOT1_END_HOLD_FRAMES)
        self.anim.frames = dither(self.anim.frames)
        return self.anim.frames


def flip(frames):
    return [f.transpose(Image.FLIP_LEFT_RIGHT) for f in frames]


def save_full_gif(frames, split_frame, path):
    """Pilot 2 as ONE continuous GIF (no swapping between files, so no flicker):
    part 1 -> the still red star held for ANTIC_FREEZE_MS -> part 2 -> final frame held.
    The settled frame (last frame of part 1) is simply held longer, so the timeline is
    identical to the old part1 / freeze / part2 setup:
        0 ms ........ part 1 ........ 5360 ms
        5360 ........ still star ..... 8360 ms   <- looking window
        8360 ........ part 2 ......... 11280 ms
        11280 ....... outcome held (experiment ends the trial)"""
    durs = [MS_PER_FRAME] * len(frames)
    durs[split_frame - 1] = MS_PER_FRAME + ANTIC_FREEZE_MS
    durs[-1] = FINAL_FRAME_MS
    frames[0].save(path, save_all=True, append_images=frames[1:],
                   duration=durs, loop=1, optimize=False)
    print("  saved", path)


def save_gif(frames, path, loop, last_ms=None):
    durs = [MS_PER_FRAME] * len(frames)
    if last_ms:
        durs[-1] = last_ms
    frames[0].save(path, save_all=True, append_images=frames[1:],
                   duration=durs, loop=loop, optimize=False)
    print("  saved", path)


def main():
    if len(sys.argv) != 2 or sys.argv[1] not in ("1", "2", "3"):
        print("Usage: python3 make_pilot_animations.py 1   (or 2, or 3)")
        sys.exit(1)
    pilot = int(sys.argv[1])
    out = f"output_pilot{pilot}"
    os.makedirs(out, exist_ok=True)

    # Characters (same as the older files): E teal triangle, F red square,
    # G brown triangle, H blue square.
    E = {"shape": Shape.TRIANGLE, "color": Color.TEAL}
    F = {"shape": Shape.SQUARE, "color": Color.RED}
    G = {"shape": Shape.TRIANGLE, "color": Color.BROWN}
    H = {"shape": Shape.SQUARE, "color": Color.BLUE}

    timing = {}
    for context in ("chains", "single_cause"):
        if pilot == 1:
            # No punisher, so "distal"/"proximal" is not a thing: one scene per
            # context. Brown triangle (first character) + blue square (second).
            jobs = [("scene", G, H, None)]
        elif pilot == 3:
            # Pilot 3 is ONLY the chain scene with the distal characters (E, F).
            if context != "chains":
                continue
            jobs = [("distal", E, F, None)]
        else:
            jobs = [("distal", E, F, "agent1"), ("proximal", G, H, "agent2")]

        for cond, c1, c2, who in jobs:
            print(f"{context} / {cond}")
            scene = PilotScene(context, c1, c2, pilot)
            target = getattr(scene, who) if who else None
            frames = scene.build(target)

            for rev, fr in (("", frames), ("reverse_", flip(frames))):
                stem = f"{context}_{rev}{cond}_pilot{pilot}"
                if pilot in (1, 3):
                    save_gif(fr, f"{out}/{stem}_event.gif", loop=1)
                    fr[-1].save(f"{out}/{stem}_final_freeze.png")
                else:
                    sf = scene.split_frame
                    # NEW: one continuous file (this is what the experiment plays)
                    save_full_gif(fr, sf, f"{out}/{stem}_full.gif")
                    # older separate pieces (kept for reference; not used by the new experiment)
                    save_gif(fr[:sf], f"{out}/{stem}_part1.gif", loop=1)
                    save_gif(fr[sf:], f"{out}/{stem}_part2.gif", loop=1)
                    fr[sf - 1].save(f"{out}/{stem}_anticipatory_freeze.png")
                    fr[-1].save(f"{out}/{stem}_final_freeze.png")
            if pilot == 2:
                timing[f"{context}_{cond}"] = {
                    "part1_ms": scene.split_frame * MS_PER_FRAME,
                    "sound_ms": scene.sound_frame * MS_PER_FRAME,
                    "part2_ms": (len(frames) - scene.split_frame) * MS_PER_FRAME,
                }
            else:
                timing[f"{context}_{cond}"] = {"event_ms": len(frames) * MS_PER_FRAME}

    with open(f"{out}/timing.json", "w") as fh:
        json.dump(timing, fh, indent=2)
    print("\nTiming (copy these numbers into the experiment code):")
    print(json.dumps(timing, indent=2))


if __name__ == "__main__":
    main()
