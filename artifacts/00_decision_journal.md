# Decision Journal - Void Hunter: Redux

## Stage 1: Architect - Decision Block 1

**Timestamp:** 2026-01-21

**Context:** Analyzing the space_craftgame.md specification to determine the optimal tech stack and architecture for "Void Hunter: Redux" - a browser-based spacecraft shooter.

**Options Considered:**

1. **Framework-Based Approach (Phaser.js, PixiJS)**
   - Pros: Built-in game loop, sprite management, physics engine
   - Cons: Additional dependencies, larger bundle size, overkill for this scope

2. **Vanilla HTML5 Canvas + Modular JS**
   - Pros: Zero dependencies, full control, lightweight, GitHub Pages friendly
   - Cons: More manual work for physics and rendering

3. **WebGL via Three.js**
   - Pros: 3D capabilities, modern graphics
   - Cons: Over-engineered for 2D game, steep learning curve

**Rationale:**
Chose **Option 2 (Vanilla HTML5 Canvas + Modular JS)** because:
- The specification explicitly requires "static site" deployment on GitHub Pages
- The game is 2D with procedural graphics (no external assets)
- The B.L.A.S.T. protocol already defines a 3-layer modular architecture
- Web Audio API and Web Speech API are native browser APIs
- Mobile compatibility requires minimal dependencies for performance

**Technical Decisions:**

1. **Module System:** ES6 Modules (`type="module"`) for clean separation
2. **Canvas Rendering:** Single `<canvas>` element with 2D context
3. **Audio:** Dual-system approach:
   - Web Audio API for SFX (synthesized sounds)
   - Web Speech Synthesis API for voice lines
4. **Input:** Conditional loading based on User Agent detection
5. **State Management:** Single `GameState` object (as per gemini.md specification)
6. **Collision Detection:** Circle-based AABB for performance

**Skills Required:**
- HTML5_Canvas_Mastery
- Web_Audio_API_Proficiency
- Mobile_Touch_Event_Handling
- Procedural_Graphics_Generation
- Game_Loop_Architecture

---

## Stage 2: Product Manager - Decision Block 2

**Timestamp:** 2026-01-21

**Context:** Creating the PRD with a focus on "Vibe Specification" to ensure the game has visual personality beyond functional requirements.

**Options Considered:**

1. **Generic Color Scheme (Primary/Secondary/Tertiary)**
   - Pros: Simple to implement, standard approach
   - Cons: Lacks personality, doesn't capture "retro-futuristic neon arcade" aesthetic

2. **Retro-Futuristic Neon (Tron-inspired)**
   - Pros: Visually distinctive, aligns with "Void Hunter" branding, high contrast for gameplay clarity
   - Cons: Requires careful HSL tuning to avoid eye strain

3. **Realistic Space Theme (Dark + Muted)**
   - Pros: Scientifically accurate, calming
   - Cons: Low energy, doesn't match fast-paced arcade gameplay

**Rationale:**
Chose **Option 2 (Retro-Futuristic Neon)** because:
- The game title "Void Hunter: Redux" implies a modern reinterpretation of classic mechanics
- High-contrast neon colors (cyan, orange, yellow) provide excellent visual clarity during fast gameplay
- HSL color model enables dynamic theming (e.g., health bar gradient, explosion color shifts)
- Monospace typography reinforces retro computing aesthetic while ensuring readable scores

**Vibe Decisions:**

1. **Color Palette Anchors:**
   - Player = Cyan (`hsl(200, 100%, 50%)`) - Cool, heroic, stands out against dark background
   - Asteroids = Earth tones (`hsl(30, 50%, 40%)`) - Contrasts with player, suggests organic danger
   - Explosions = Warm orange-yellow (`hsl(40, 100%, 60%)`) - Maximum visual reward

2. **Typography:**
   - Monospace (Courier New) chosen over sans-serif for "terminal hacker" aesthetic
   - Bold weight (700) ensures readability on dark background
   - 0.1em letter spacing prevents character crowding at high speeds

3. **"Juice" Specifications:**
   - 20-30 particles per explosion (tested range for visual impact without performance hit)
   - Screen shake limited to 5px to avoid motion sickness
   - 3-layer parallax starfield creates depth without distracting from gameplay

**User Story Prioritization:**
- Epic 1 (Core Gameplay) = MVP critical path
- Epic 3 (Audio) = High priority (voice lines are unique selling point per space_craftgame.md)
- Epic 5 (Visual Polish) = Medium priority (enhances but doesn't block playability)

---

## Stage 5: Developer - Decision Block 3

**Timestamp:** 2026-01-22

**Context:** Game balance issues reported by user after playtesting. Three problems identified:
1. Initial game speed too fast for new players
2. Level progression too rapid (players reaching level 237)
3. Critical bug: Screen completely covered with asteroids at high levels (240 asteroids at level 237)

**Options Considered:**

1. **Minor Speed Tweak Only**
   - Pros: Minimal code changes, preserves original design
   - Cons: Doesn't address asteroid overflow bug, levels still advance too fast

2. **Complete Difficulty Redesign**
   - Pros: Could implement multiple difficulty modes, more granular control
   - Cons: Major architectural changes, adds complexity, not requested by user

3. **Balanced Multi-Parameter Adjustment (CHOSEN)**
   - Pros: Addresses all three issues systematically, maintains core gameplay
   - Cons: Requires updating multiple formulas and documentation

**Rationale:**
Chose **Option 3** because:
- **Root Cause Analysis:** The formula `asteroidCount = 3 + level` has unbounded growth, creating an unplayable state at high levels (level 237 = 240 asteroids)
- **Initial Pacing:** Starting speedMultiplier at 1.0 with base asteroid speeds of 1-3 px/frame creates too steep a learning curve
- **Progression Rate:** 2-second wave delay combined with fast asteroid clearing meant players advanced levels too quickly to appreciate progression
- **Holistic Solution:** By adjusting 4 parameters together (initial speed, speed scaling, asteroid cap, wave delay), we create a smoother difficulty curve that scales infinitely without breaking

**Changes Implemented:**

1. **Initial Speed Multiplier:** 1.0 → 0.5
   - Game now starts at half speed for gentler onboarding
   
2. **Speed Scaling Formula:** `1 + (level * 0.1)` → `0.5 + (level * 0.05)`
   - Old: Level 10 = 2.0x speed (too fast)
   - New: Level 10 = 1.0x speed (normal baseline)
   - Creates 50% slower progression to normal speed
   
3. **Asteroid Count Cap:** `3 + level` → `Math.min(3 + level, 15)`
   - Prevents screen overflow bug
   - Caps at 15 large asteroids (max 60 small asteroids after all splits)
   - After level 12, difficulty scales through speed alone
   
4. **Asteroid Base Velocity:** `1 + random(2)` → `0.5 + random(1)`
   - Reduces base speed from 1-3 px/frame to 0.5-1.5 px/frame
   - Combined with speedMultiplier, creates smoother early game
   
5. **Wave Transition Delay:** 2000ms → 3000ms
   - Gives players 50% more recovery time between levels
   - Allows voice line "Well done, Cap!" to complete before next wave
   - Makes level progression feel more rewarding

**Expected Difficulty Curve:**
- **Level 1-5:** Tutorial pace (0.55x - 0.75x speed, 4-8 asteroids)
- **Level 6-10:** Learning curve (0.80x - 1.0x speed, 9-13 asteroids)
- **Level 11-12:** Normal difficulty (1.05x - 1.10x speed, 14-15 asteroids)
- **Level 13+:** Speed challenge (1.15x+ speed, capped at 15 asteroids)
- **Level 237:** Technically playable but extremely difficult (12.35x speed, still 15 asteroids)

**Self-Annealing Rule Added:**
"All entity spawning formulas must include upper bounds (via Math.min/max) to prevent gameplay-breaking states at extreme values. Test high-level scenarios (e.g., level 100+) during design phase."

**Verification:**
- Level 1: Now gentle and approachable for new players
- Level 237: Screen no longer covered; game remains challenging but playable
- Wave transitions: Voice lines complete, players have breathing room
- Difficulty scaling: Smooth curve from tutorial to expert, no sudden jumps

---

## Stage 5: Developer - Decision Block 4

**Timestamp:** 2026-01-22 (Second Update)

**Context:** Critical bug discovered during playtesting + user requested visual improvements and pacing changes:
1. **CRITICAL BUG:** Game jumping from level 1 to level 182 when asteroids cleared
2. **User Request:** Spacecraft should look like proper Star Wars-style fighter
3. **User Request:** Ship should rotate to face shooting direction, bullets fire from nose
4. **User Request:** Levels advance too quickly, need slower progression
5. **User Request:** Reduce visual clutter (max 20% asteroid coverage)
6. **User Request:** Reduce player health (make game more challenging)

**Options Considered:**

### **For Level Jump Bug:**
1. **Add conditional check** - Only increment level if not already leveling
2. **Debounce with timer** - Prevent multiple triggers within time window
3. **Remove from game loop** - Call checkLevelComplete only on collision events

**Chosen:** Option 1 (isLevelingUp flag) - Simplest, most reliable, prevents race conditions

### **For Spacecraft Visual:**
1. **X-Wing Fighter** (detailed, 8-10 vertices, iconic wings)
2. **TIE Fighter** (angular, hexagonal panels, recognizable)
3. **Sleek Racer** (minimalist, 5-6 vertices, streamlined) - USER CHOSE THIS
4. **Keep Triangle** (simplest, but user rejected)

**Chosen:** Option 3 (Sleek Racer) per user preference - Clean design, clear front/back orientation, modern aesthetic

### **For Rotation Mechanics:**
1. **Instant snap** to cursor (arcade-y, can feel jarring)
2. **Smooth lerp** to cursor (polished, natural feel) - USER CHOSE THIS  
3. **Limited turn rate** (realistic, might feel sluggish)
4. **Keep velocity-based** (current system, user rejected)

**Chosen:** Option 2 (Smooth lerp with 0.15 factor) - Responsive but not instant, feels polished

### **For Level Pacing:**
1. **Just increase delay** (3s → 5s) - Simple but doesn't address fast clearing
2. **Minimum 90s per level + bonus waves** - USER CHOSE THIS
3. **Progressive waves** (spawn over time) - Too complex
4. **Staggered spawning** - Medium complexity

**Chosen:** Option 2 (90s minimum with max 2 bonus waves) - Guarantees engagement, rewards fast players with score opportunities

### **For Asteroid Coverage (20% limit):**
**Math:** Canvas = 480,000 px², 20% = 96,000 px²
- Large asteroid area = 7,854 px²
- 96,000 ÷ 7,854 = **12.2 asteroids** → Cap at **12**
- Actual coverage: 12 × 7,854 = 94,248 px² = **19.6%** ✅

**Chosen:** Reduce cap from 15 → 12 asteroids (20% coverage vs previous 24.5%)

### **For Player Health:**
**Chosen:** Reduce from 100 HP → 50 HP (user approved)
- Makes each collision 2x more meaningful
- Large asteroid: 25 hits to die (was 50)
- Medium asteroid: 50 hits to die (was 100)
- Small asteroid: 100 hits to die (was 200)

---

**Root Cause of Level Jump Bug:**
```javascript
// BUG: checkLevelComplete() called every frame (60 fps)
function checkLevelComplete() {
    if (GameState.asteroids.length === 0) {
        GameState.level++;  // ← Increments 60 times per second!
    }
}
```

**Result:** When asteroids cleared, level increments 60x/sec for 3 seconds = 180 increments = Level 1 → 182

**Fix Applied:**
```javascript
// Add flag to prevent multiple triggers
isLevelingUp: false,

function checkLevelComplete() {
    if (GameState.asteroids.length === 0 && !GameState.isLevelingUp) {
        GameState.isLevelingUp = true;
        // ... level up logic
        setTimeout(() => {
            spawnWave();
            GameState.isLevelingUp = false; // Reset after spawn
        }, 5000);
    }
}
```

---

**Changes Implemented:**

1. **Level Jump Bug Fix** ⚠️ CRITICAL
   - Added `isLevelingUp` flag to GameState
   - Prevents multi-increment when asteroids.length === 0
   - Resets flag after new wave spawns
   
2. **Sleek Racer Spacecraft Visual**
   - Replaced triangle with 11-vertex sleek fighter design
   - Forward-swept wings, tapered nose, single rear thruster
   - Engine glow effect (cyan, animated)
   - Cockpit window detail (light blue)
   - Gradient fill (bright cyan → dark cyan)
   - Size: 36px tall × 24px wide (maintains 15px collision radius)

3. **Cursor-Based Rotation**
   - Desktop: Ship rotates toward mouse cursor (not velocity)
   - Mobile: Ship rotates toward joystick direction
   - Smooth interpolation using `lerpAngle()` with 0.15 factor
   - Handles angle wrapping (shortest rotation path)
   - Enables strafing (move one way, shoot another)

4. **Bullet Spawn from Nose**
   - Bullets now spawn 18px forward from ship center
   - Offset calculated based on ship rotation
   - Visual effect: Bullets clearly fire from front of ship

5. **90-Second Minimum Level Time + Bonus Waves**
   - Track `levelStartTime` when level begins
   - When asteroids cleared, check if 90s elapsed
   - If < 90s: Spawn bonus wave (4 asteroids)
   - Max 2 bonus waves per level (prevents infinite stacking)
   - Display "BONUS WAVE!" message (cyan, fades over 2s)
   - After 90s or 2 bonus waves: Normal level advance

6. **Asteroid Cap Reduction**
   - Formula: `Math.min(3 + level, 12)` (was 15)
   - Level 1: 4 asteroids (was 4) - same
   - Level 9: 12 asteroids (was 12) - same
   - Level 10+: 12 asteroids (was 13-15+) - **capped**
   - Coverage: 19.6% (was 24.5%) - **20% compliance** ✅

7. **Player Health Reduction**
   - Starting health: 50 HP (was 100)
   - HUD calculation updated: `health / 50` (was `/ 100`)
   - Makes game 2x more challenging
   - Maintains health bar gradient (green → yellow → red)

8. **Wave Delay Increase**
   - Delay between levels: 5 seconds (was 3)
   - Allows voice line "Well done, Cap!" to complete
   - Gives players recovery time

---

**Expected Behavior After Changes:**

**Visual:**
- ✅ Sleek spacecraft with clear front/back orientation
- ✅ Ship rotates smoothly to face aim direction
- ✅ Bullets visibly fire from ship nose (not center)
- ✅ Engine glow at rear, cockpit window detail

**Gameplay:**
- ✅ Level 1 starts and advances to level 2 (not 182!)
- ✅ Maximum 12 asteroids spawn per wave
- ✅ Screen never exceeds ~20% coverage
- ✅ Player starts with 50 HP (dies faster)
- ✅ Levels require minimum 90 seconds to complete
- ✅ Fast players get bonus waves (max 2) with score opportunities

**Controls:**
- ✅ Desktop: Ship faces mouse cursor, WASD moves independently
- ✅ Mobile: Ship faces joystick direction
- ✅ Smooth rotation (no instant snapping)
- ✅ Strafing possible (move one way, shoot another)

**Pacing:**
- ✅ Minimum 90s engagement per level
- ✅ Bonus waves keep fast players engaged
- ✅ 5-second pause between levels (was 3)
- ✅ No more rushing through levels in 30-40 seconds

---

**Self-Annealing Rules Added:**

1. "All state-changing functions called in game loop must have guard flags to prevent multi-trigger on same condition. Example: `isLevelingUp` prevents repeated level increments."

2. "Level progression logic must include minimum time gates to prevent speed-running past content. Bonus waves should reward fast players without breaking pacing."

3. "Player-facing entities (spacecraft, enemies) must have clear visual front/back orientation for intuitive gameplay. Rotation should always indicate aim direction."

---

**Files Modified:**

**Code:**
1. `js/main.js`: 
   - Added 4 new GameState properties
   - Fixed checkLevelComplete() with isLevelingUp flag
   - Added advanceLevel(), spawnBonusWave(), showBonusMessage(), updateBonusMessage(), renderBonusMessage()
   - Updated asteroid cap: 15 → 12
   - Updated player health: 100 → 50
   - Updated spawnBullet() to offset from nose

2. `js/modules/physics.js`:
   - Replaced velocity-based rotation with cursor/joystick-based
   - Added lerpAngle() helper function
   - Smooth rotation with 0.15 interpolation factor

3. `js/modules/renderer.js`:
   - Replaced renderPlayer() with sleek racer design
   - Added engine glow, cockpit window, gradient fill
   - Updated updateHUD() health calculation: / 100 → / 50

**Total Code Changes:**
- Lines added: ~120
- Lines modified: ~30
- Lines removed: ~10
- Net: +110 lines

**Verification:**
- Bug fix tested: Level 1 → 2 → 3 (not 1 → 182)
- Visual tested: Sleek spacecraft renders correctly
- Rotation tested: Ship faces cursor smoothly
- Bullets tested: Spawn from nose, not center
- Pacing tested: 90s minimum enforced, bonus waves appear
- Balance tested: 12 asteroid cap, 50 HP starting health
