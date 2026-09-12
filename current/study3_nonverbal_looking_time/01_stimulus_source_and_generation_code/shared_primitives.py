import math
from enum import Enum
from typing import List, Dict, Optional, Any, Tuple
from PIL import Image, ImageDraw

# ==========================================
# 1. CONFIG / CONSTANTS
# ==========================================

def hex_to_rgb(hex_str: str):
    h = hex_str.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

class Color(Enum):
    RED = "#ff6b6b"
    BLUE = "#4dabf7"
    GREEN = "#69db7c"
    YELLOW = "#fcc419"
    PURPLE = "#be4bdb"
    PINK = "#faa2c1"
    ORANGE = "#ff922b"
    TEAL = "#20c997"
    BROWN = "#8b4513"
    TRASH = "#ced4da"
    BG_PASTEL = "#ffffff"
    BLACK = "#212529"

class Shape(Enum):
    CIRCLE = "circle"
    SQUARE = "square"
    TRIANGLE = "triangle"
    STAR = "star"

class Expression(Enum):
    NEUTRAL = "neutral"
    HAPPY = "happy"
    SAD = "sad"
    ANGRY = "angry"

class Timing:
    MOVE_DURATION = 1.2
    PAUSE_SHORT = 1.0
    PAUSE_MEDIUM = 2.0
    REWARD_DURATION = 2.5
    TRANSITION_BLANK = 1.0
    TRANSITION_AG = 1.5
    JUMP_DURATION = 0.5

FPS = 25
WIDTH = 800
HEIGHT = 300
CENTER_X = WIDTH // 2
AGENT_SIZE = 65
GROUND_Y = 260

# ==========================================
# 2. DATA MODELS
# ==========================================

class Agent:
    def __init__(self, name: str, shape: Shape, color: Color, x: float, y: float):
        self.name, self.shape, self.color = name, shape, color
        self.x = self.start_x = x
        self.y = self.start_y = y
        self.expression = Expression.NEUTRAL
        self.has_star = False
        self.visible = True
        self.arm_target_l: Optional[Tuple[float, float]] = None
        self.arm_target_r: Optional[Tuple[float, float]] = None
        self.shake_rotation = 0.0  # radians; used for the star authority's in-place "shake" (no x/y translation)

class Prop:
    def __init__(self, obj_type: str, x: float, y: float, visible: bool = False):
        self.type, self.x, self.y, self.visible = obj_type, x, y, visible
        self.expression = Expression.NEUTRAL

# ==========================================
# 3. RENDER LAYER
# ==========================================

class Renderer:
    def draw_sphere_3d(self, draw, cx, cy, radius, color):
        rgb = hex_to_rgb(color)
        hl_x, hl_y = cx - radius * 0.3, cy - radius * 0.3
        draw.ellipse([cx - radius-1, cy - radius-1, cx + radius+1, cy + radius+1], fill=Color.BLACK.value)
        for i in range(20):
            t = i / 20.0
            r_val = radius * (1.0 - t)
            curr_c = tuple(int(c + (255 - c) * (t**1.8)) for c in rgb)
            draw.ellipse([cx + (hl_x-cx)*t - r_val, cy + (hl_y-cy)*t - r_val, cx + (hl_x-cx)*t + r_val, cy + (hl_y-cy)*t + r_val], fill=curr_c)

    def draw_face(self, draw, x, y, expression, scale=1.0):
        fc = "#495057"
        # Eyes
        ex_off, ey_top, ey_bot = 10 * scale, 11 * scale, 3 * scale
        draw.ellipse([x - ex_off, y - ey_top, x - (6*scale), y - ey_bot], fill=fc)
        draw.ellipse([x + (6*scale), y - ey_top, x + ex_off, y - ey_bot], fill=fc)
        
        if expression == Expression.NEUTRAL:
            draw.line([x - 6*scale, y + 7*scale, x + 6*scale, y + 7*scale], fill=fc, width=max(1, int(3*scale)))
        elif expression == Expression.HAPPY:
            draw.arc([x-8*scale, y+2*scale, x+8*scale, y+13*scale], 0, 180, fill=fc, width=max(1, int(3*scale)))
        elif expression == Expression.SAD:
            draw.arc([x-8*scale, y+4*scale, x+8*scale, y+15*scale], 180, 360, fill=fc, width=max(1, int(3*scale)))
        elif expression == Expression.ANGRY:
            draw.line([x - 14*scale, y - 17*scale, x - 4*scale, y - 11*scale], fill=fc, width=max(1, int(3*scale)))
            draw.line([x + 14*scale, y - 17*scale, x + 4*scale, y - 11*scale], fill=fc, width=max(1, int(3*scale)))
            draw.arc([x-8*scale, y+4*scale, x+8*scale, y+15*scale], 180, 360, fill=fc, width=max(1, int(3*scale)))

    def get_highlight(self, color_hex):
        rgb = hex_to_rgb(color_hex)
        return '#%02x%02x%02x' % tuple(min(255, int(c + (255 - c) * 0.45)) for c in rgb)

    def draw_star(self, draw, x, y, r=25, color="#fcc419", rotation=0.0):
        # rotation (radians) spins the star's points in place around (x, y)
        # -- used for the authority's "shake" so it can convey agitation
        # without ever translating its x/y position.
        pts = []
        hl_pts = []
        for i in range(10):
            curr_r = r if i % 2 == 0 else r * 0.4
            a = i * (math.pi / 5) - (math.pi / 2) + rotation
            pts.append((x + curr_r * math.cos(a), y + curr_r * math.sin(a)))
            if i <= 4: # Top left edges for highlight
                hl_pts.append((x - r*0.1 + curr_r * 0.7 * math.cos(a), y - r*0.1 + curr_r * 0.7 * math.sin(a)))
        
        draw.polygon(pts, fill=color)
        if len(hl_pts) >= 3:
            draw.polygon(hl_pts, fill=self.get_highlight(color))

    def draw_wand(self, draw, root_x, root_y, target_x, target_y):
        # Draw a brown stick with a tiny star at the end
        draw.line([root_x, root_y, target_x, target_y], fill="#8b4513", width=5)
        self.draw_star(draw, target_x, target_y, r=10)

    def draw_agent(self, draw, agent):
        r = AGENT_SIZE / 2
        ac = "#495057" # Soft dark brown for arms
        
        if agent.shape == Shape.TRIANGLE:
            root_lx, root_rx = agent.x - r/2, agent.x + r/2
        elif agent.shape == Shape.STAR:
            root_lx, root_rx = agent.x - 15, agent.x + 15
        else:
            root_lx, root_rx = agent.x-r+8, agent.x+r-8
        root_y = agent.y
        if agent.name == "authority":
            if agent.arm_target_r: 
                self.draw_wand(draw, root_rx, root_y, agent.arm_target_r[0], agent.arm_target_r[1])
            else:
                self.draw_wand(draw, root_rx, root_y, root_rx+20, root_y-25)
            if agent.arm_target_l:
                draw.line([root_lx, root_y, agent.arm_target_l[0], agent.arm_target_l[1]], fill=ac, width=4)
            else:
                draw.line([root_lx, root_y, root_lx-15, root_y+20], fill=ac, width=4)
        else:
            if agent.arm_target_l: draw.line([root_lx, root_y, agent.arm_target_l[0], agent.arm_target_l[1]], fill=ac, width=4)
            else: draw.line([root_lx, root_y, root_lx-15, root_y+20], fill=ac, width=4)
            if agent.arm_target_r: draw.line([root_rx, root_y, agent.arm_target_r[0], agent.arm_target_r[1]], fill=ac, width=4)
            else: draw.line([root_rx, root_y, root_rx+15, root_y+20], fill=ac, width=4)

        color = agent.color.value
        hl = self.get_highlight(color)

        if agent.shape == Shape.CIRCLE: 
            self.draw_sphere_3d(draw, agent.x, agent.y, r, color)
        elif agent.shape == Shape.SQUARE:
            draw.rectangle([agent.x-r, agent.y-r, agent.x+r, agent.y+r], fill=color)
            # Add glossy highlight curve
            draw.polygon([(agent.x-r, agent.y-r), (agent.x, agent.y-r), (agent.x-r*0.2, agent.y-r*0.2), (agent.x-r, agent.y)], fill=hl)
        elif agent.shape == Shape.TRIANGLE:
            draw.polygon([(agent.x-r, agent.y+r), (agent.x+r, agent.y+r), (agent.x, agent.y-r)], fill=color)
            # Add glossy highlight curve
            draw.polygon([(agent.x, agent.y-r), (agent.x-r, agent.y+r), (agent.x-r*0.6, agent.y+r*0.8), (agent.x-r*0.1, agent.y-r*0.6)], fill=hl)
        elif agent.shape == Shape.STAR:
            self.draw_star(draw, agent.x, agent.y, r * 1.5 if agent.name == "authority" else r, color, rotation=getattr(agent, 'shake_rotation', 0.0))

        face_y = agent.y + (12 if agent.shape == Shape.TRIANGLE else 0)
        f_scale = 0.75 if agent.shape == Shape.STAR else 1.0
        self.draw_face(draw, agent.x, face_y, agent.expression, scale=f_scale)
        if agent.has_star: self.draw_star(draw, agent.x, agent.y-r-25)

    def draw_bullseye(self, draw, x, y, scale):
        for i in range(4):
            r = 40 * scale * (1.0 - i/4.0)
            draw.ellipse([x-r, y-r, x+r, y+r], fill=Color.BLACK.value if i%2==0 else Color.BG_PASTEL.value)

    def draw_trash_blob(self, draw, x, y):
        pts = [(x-10, y-2), (x-6, y-10), (x, y-6), (x+6, y-11), (x+11, y-3), (x+9, y+8), (x+2, y+6), (x-5, y+10), (x-12, y+4)]
        draw.polygon(pts, fill=Color.TRASH.value)
        draw.polygon([(x-10, y-2), (x-6, y-10), (x, y-6), (x-3, y-2)], fill=self.get_highlight(Color.TRASH.value))
        draw.line([x-5, y-10, x+2, y+6], fill="#adb5bd", width=1)
        draw.line([x+2, y-11, x-6, y+4], fill="#adb5bd", width=1)

    def render(self, agents, props, ag_scale=None):
        img = Image.new("RGB", (WIDTH, HEIGHT), Color.BG_PASTEL.value)
        draw = ImageDraw.Draw(img)
        if ag_scale: self.draw_bullseye(draw, WIDTH/2, HEIGHT/2, ag_scale); return img
        draw.line([0, GROUND_Y, WIDTH, GROUND_Y], fill=Color.BLACK.value, width=2)
        
        # Draw background props first
        for p in props:
            if p.visible:
                if p.type == "bin":
                    draw.rectangle([p.x-25, p.y-35, p.x+25, p.y+15], fill="#adb5bd", outline=Color.BLACK.value, width=2)
                    for lx in range(int(p.x-15), int(p.x+20), 10):
                        draw.line([lx, p.y-35, lx, p.y+15], fill="#868e96", width=2)
                    draw.ellipse([p.x-28, p.y-42, p.x+28, p.y-28], fill="#6c757d", outline=Color.BLACK.value, width=2)
                    draw.ellipse([p.x-25, p.y-40, p.x+25, p.y-30], fill=Color.BLACK.value)
                elif p.type == "tower_base":
                    draw.rectangle([p.x-15, p.y, p.x+15, p.y+30], fill="#fcc419", outline=Color.BLACK.value, width=2)
                    draw.rectangle([p.x-15, p.y-30, p.x+15, p.y], fill="#fcc419", outline=Color.BLACK.value, width=2)
                elif p.type == "baby":
                    r = 20
                    self.draw_sphere_3d(draw, p.x, p.y, r, Color.BLUE.value)
                    self.draw_face(draw, p.x, p.y, p.expression, scale=0.8)
                elif p.type == "flower":
                    # Stem
                    draw.line([p.x, p.y, p.x, p.y+30], fill=Color.GREEN.value, width=4)
                    if p.expression == Expression.SAD:
                        # Wilted flower head
                        draw.ellipse([p.x-10, p.y+20, p.x+10, p.y+35], fill=Color.RED.value, outline=Color.BLACK.value)
                    else:
                        # Healthy flower head
                        for i in range(5):
                            a = i * (2*math.pi/5)
                            px, py = p.x + 12*math.cos(a), p.y + 12*math.sin(a)
                            draw.ellipse([px-8, py-8, px+8, py+8], fill=Color.RED.value, outline=Color.BLACK.value)
                        draw.ellipse([p.x-6, p.y-6, p.x+6, p.y+6], fill=Color.YELLOW.value, outline=Color.BLACK.value)

        for a in agents: self.draw_agent(draw, a)
        
        # Draw foreground props (carried ones)
        for p in props:
            if p.visible:
                if p.type == "trash":
                    self.draw_trash_blob(draw, p.x, p.y)
                elif p.type == "block":
                    draw.rectangle([p.x-15, p.y-15, p.x+15, p.y+15], fill="#fcc419", outline=Color.BLACK.value, width=2)
                elif p.type == "toy":
                    r = 8
                    self.draw_sphere_3d(draw, p.x, p.y, r, Color.PINK.value)
                    
        return img

# ==========================================
# 4. ANIMATION HELPERS
# ==========================================

class AnimationHelper:
    def __init__(self, renderer, agents, props):
        self.renderer, self.agents, self.props = renderer, agents, props
        self.frames = []

    def snap(self, ag_scale=None): self.frames.append(self.renderer.render(self.agents, self.props, ag_scale))
    def pause(self, d):
        for _ in range(int(d*FPS)): self.snap()
    def blank(self, d):
        img = Image.new("RGB", (WIDTH, HEIGHT), Color.BG_PASTEL.value)
        for _ in range(int(d*FPS)): self.frames.append(img.copy())
    def ag(self, d):
        for i in range(int(d*FPS)): self.snap(ag_scale=1.0 + 0.15*math.sin(i*0.4))

    def move(self, agent, tx, ty, d, carry_prop=None, carry_side=None):
        sx, sy = agent.x, agent.y
        num = int(d*FPS)
        for i in range(num+1):
            t = i/num
            v = t*t*(3-2*t)
            agent.x, agent.y = sx+(tx-sx)*v, sy+(ty-sy)*v
            if carry_prop:
                if carry_side: offset = 45 if carry_side == "right" else -45
                else: offset = 45 if tx >= sx else -45
                carry_prop.x, carry_prop.y = agent.x + offset, agent.y - 30
                if offset > 0:
                    agent.arm_target_r = (carry_prop.x, carry_prop.y)
                    agent.arm_target_l = None
                else:
                    agent.arm_target_l = (carry_prop.x, carry_prop.y)
                    agent.arm_target_r = None
            self.snap()

    def jump(self, agent):
        sy = agent.y
        num = int(Timing.JUMP_DURATION*FPS)
        for i in range(num+1):
            t = i/num
            v = math.sin(t*math.pi)
            agent.y = sy - 25*v
            self.snap()
        agent.y = sy
