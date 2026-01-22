# Tech Stack Rules - Void Hunter: Redux

## Core Technology Stack

### Frontend
- **HTML5** (ES6+ syntax)
- **CSS3** (Flexbox, Grid for UI overlays)
- **Vanilla JavaScript** (No frameworks)
  - ES6 Modules (`type="module"`)
  - Async/Await for resource loading

### Graphics & Rendering
- **HTML5 Canvas API** (2D Context)
  - Single canvas element
  - RequestAnimationFrame for game loop
  - Procedural graphics (no image assets)

### Audio System
- **Web Audio API** (SFX synthesis)
  - OscillatorNode for shooting sounds
  - GainNode for explosions
- **Web Speech Synthesis API** (Voice lines)
  - SpeechSynthesisUtterance for "Oh, yes!", "Well done, Cap!"

### Input Handling
- **Desktop:** Keyboard API (WASD/Arrow keys) + Mouse Events
- **Mobile:** Touch Events + Virtual Joystick (custom implementation)
- **User Agent Detection:** Conditional rendering based on platform

### Data Persistence
- **localStorage** for high score table

---

## Architecture Constraints

### 3-Layer Architecture (from B.L.A.S.T. protocol)

**Layer 1: Architecture (SOPs in `architecture/`)**
- `game_loop.md` - Main loop logic
- `input_handling.md` - Control flow
- `entity_manager.md` - Spawn/destroy logic
- `physics_sop.md` - Collision detection formulas

**Layer 2: Orchestration (main.js)**
- Game state management
- Event routing
- Level progression logic

**Layer 3: Tools (js/modules/)**
- `renderer.js` - Canvas drawing functions
- `physics.js` - Collision detection, velocity calculations
- `audio.js` - Sound manager with mute toggle
- `input.js` - Event listener abstraction

---

## File Structure Mandate

```
void-hunter-redux/
├── index.html              # Entry point with <canvas> and UI overlays
├── gemini.md              # Project Map (Game state schema, entity definitions)
├── css/
│   └── style.css          # Canvas styling, HUD, virtual joystick
├── js/
│   ├── main.js            # Game loop orchestration
│   ├── modules/
│   │   ├── renderer.js    # Drawing functions
│   │   ├── physics.js     # Collision & velocity
│   │   ├── audio.js       # Audio manager
│   │   └── input.js       # Input handler
├── architecture/
│   ├── game_loop.md
│   ├── input_handling.md
│   ├── entity_manager.md
│   └── physics_sop.md
└── .tmp/                  # Debug logs (not committed)
```

---

## Coding Rules

### 1. Data-First Principle
- **NEVER** implement a mechanic without defining its data schema in `gemini.md` first
- Example: Before coding asteroid splitting, define the mathematical transformation

### 2. Canvas Rendering Standards
- Clear canvas on every frame: `ctx.clearRect(0, 0, canvas.width, canvas.height)`
- Use `ctx.save()` and `ctx.restore()` for transformations
- Procedural asteroid generation using `ctx.beginPath()` with randomized vertices

### 3. Mobile Compatibility
- **Viewport Meta Tag:** `<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">`
- **Touch Event Handling:** Use `touchstart`, `touchmove`, `touchend` (not `click`)
- **Virtual Joystick:** Semi-transparent overlay, responds to multi-touch

### 4. Audio Constraints
- **Mute Toggle:** Distinct button that disables both Web Audio and Speech Synthesis
- **User Gesture Requirement:** Initialize AudioContext only after user interaction
- **Voice Lines:** Queue with `speechSynthesis.speak()`, check `speechSynthesis.speaking` to prevent overlap

### 5. Performance Requirements
- **Target:** Steady 60fps on modern browsers
- **Optimization:** Use object pooling for particles (reuse instead of create/destroy)
- **Collision Detection:** Only check player vs. asteroids and bullets vs. asteroids (no asteroid-to-asteroid)

### 6. Code Atomicity (Stage 5 Rule)
- Maximum **15 lines** per implementation step
- Each step must be verifiable independently

---

## Game-Specific Constants

### Physics
- **Player Speed:** 5 pixels/frame (base)
- **Player Health:** 50 HP (reduced from 100 in Session 3)
- **Inertia:** Velocity decay factor of 0.95 per frame
- **Asteroid Sizes:**
  - Large: radius 50px (2 damage)
  - Medium: radius 25px (1 damage)
  - Small: radius 12px (0.5 damage)
- **Asteroid Base Velocity:** 0.5-1.5 pixels/frame (before speedMultiplier applied)

### Progression
- **Initial Speed:** 0.5x (gentle start for new players)
- **Level Scaling:** 
  - Speed multiplier: `0.5 + (level * 0.05)`
  - Asteroid count: `Math.min(3 + level, 12)` (capped at 12 for 20% coverage)
  - Wave delay: 5000ms (5 seconds between levels, increased in Session 3)
  - Minimum level time: 90 seconds (bonus waves spawn if cleared faster)
  - Max bonus waves: 2 per level (4 asteroids each)

### Rotation Mechanics (Session 3 update)
- **Player Rotation:** Cursor-based (was velocity-based)
  - Desktop: Ship rotates toward mouse cursor
  - Mobile: Ship rotates toward joystick direction
  - Lerp factor: 0.15 (smooth interpolation)
- **Bullet Spawn:** 18px forward from ship center (nose offset)

### Visual "Juice"
- **Particle Count:** 15-30 particles per explosion
- **Screen Shake:** 5px amplitude, 200ms duration
- **Color Palette:**
  - Player: `hsl(200, 100%, 50%)` (cyan)
  - Asteroids: `hsl(30, 50%, 40%)` (brown/orange)
  - Explosions: `hsl(40, 100%, 60%)` (orange/yellow)

---

## Deployment Constraints

### GitHub Pages Requirements
- **Static Files Only:** No server-side code
- **Entry Point:** `index.html` in root
- **Asset Paths:** Use relative paths (`./css/style.css`, not `/css/style.css`)

### Browser Compatibility
- **Target:** Chrome 90+, Firefox 88+, Safari 14+
- **Fallback:** Display error message if Canvas API is unavailable

---

## Self-Annealing Protocol

When a bug occurs:
1. **Log the error** in `.tmp/error_log.md`
2. **Fix the code** in the relevant module
3. **Update the SOP** in `architecture/` with the corrected logic
4. **Append to this file** with a new "Constraint" to prevent future occurrences

**Example:**
- **Bug:** Asteroids spawning on top of player
- **Fix:** Add spawn radius check (min distance 200px from player)
- **New Rule:** "All enemy spawns must verify `distance(entity, player) > safeRadius`"

### Annealing Event #1 (2026-01-22 - Session 2)
- **Bug:** Screen overflow at high levels (level 237 spawned 240 asteroids, completely unplayable)
- **Root Cause:** Unbounded growth formula `asteroidCount = 3 + level`
- **Fix:** Added cap via `Math.min(3 + level, 15)` to limit maximum asteroids
- **New Rule:** "All entity spawning formulas must include upper bounds (Math.min/max) to prevent gameplay-breaking states at extreme values. High-level scenarios (level 100+) must be tested during design phase."
- **Additional Changes:** Rebalanced initial speed, speed scaling, base velocities, and wave delays for better difficulty progression

### Annealing Event #2 (2026-01-22 - Session 3)
- **Bug:** Level jump from 1 directly to 182 when clearing asteroids
- **Root Cause:** `checkLevelComplete()` called every frame (60 fps) → `GameState.level++` incremented 60 times/second for 3 seconds = ~180 increments
- **Fix:** Added `isLevelingUp` flag to prevent multi-trigger, completely rewrote level progression system
- **New Rule:** "State-mutating operations triggered by game state checks (e.g., level advancement) MUST use guard flags to prevent multi-trigger when called repeatedly in game loop. Example pattern: `if (condition && !isProcessing) { isProcessing = true; doOnce(); }`"
- **Major Changes Implemented:**
  1. Fixed level jump bug with `isLevelingUp` flag
  2. Replaced triangle spacecraft with sleek 11-vertex racer design
  3. Changed rotation from velocity-based to cursor-based (smooth lerp 0.15)
  4. Bullets now spawn from ship nose (18px forward offset)
  5. Added 90-second minimum level time with bonus wave system (max 2 waves, 4 asteroids each)
  6. Reduced asteroid cap from 15 to 12 (20% coverage maximum)
  7. Reduced player health from 100 to 50 HP
  8. Increased wave delay from 3 seconds to 5 seconds

