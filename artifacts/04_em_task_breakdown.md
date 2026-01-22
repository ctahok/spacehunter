# Task Breakdown - Void Hunter: Redux
# Engineering Manager (Stage 4)
# Source: /artifacts/03_tl_gherkin_specs.feature

---

## Parent Task 0: Project Foundation & Link Handshake

### Task 0.0: Verify Development Environment
**Description:** Ensure the development environment can serve static files and browser APIs are accessible.

**Sub-tasks:**
- 0.0.1: Create base directory structure (css/, js/, js/modules/, architecture/)
- 0.0.2: Create gemini.md with GameState schema from PRD
- 0.0.3: Test Canvas API availability in target browsers
- 0.0.4: Test Web Audio API availability (AudioContext)
- 0.0.5: Test Web Speech Synthesis API availability

**Verification Conditions:**
- [ ] Directory structure matches /artifacts/00_tech_stack_rules.md
- [ ] gemini.md contains complete GameState JSON schema
- [ ] Console confirms: "Canvas API: Available"
- [ ] Console confirms: "Web Audio API: Available"
- [ ] Console confirms: "Speech Synthesis API: Available"

**Acceptance Test:** All browser API checks pass on Chrome 90+, Firefox 88+, Safari 14+

---

## Parent Task 1: Core Game Loop & Canvas Setup

### Task 1.0: Initialize HTML Entry Point
**Description:** Create index.html with canvas element, viewport meta tag, and module script imports.

**Sub-tasks:**
- 1.0.1: Create index.html with DOCTYPE and meta tags
- 1.0.2: Add viewport meta: `width=device-width, initial-scale=1.0, user-scalable=no`
- 1.0.3: Create <canvas> element with id="gameCanvas"
- 1.0.4: Add script tag: `<script type="module" src="./js/main.js"></script>`
- 1.0.5: Add div containers for HUD and mobile controls

**Verification Conditions:**
- [ ] HTML validates (no syntax errors)
- [ ] Canvas element is accessible via `document.getElementById('gameCanvas')`
- [ ] Module script loads without CORS errors
- [ ] Viewport meta prevents mobile zooming

**Acceptance Test:** Opening index.html displays a blank canvas filling the viewport

---

### Task 1.1: Implement Game Loop Architecture
**Description:** Create main.js with requestAnimationFrame loop, delta time calculation, and state management.

**Sub-tasks:**
- 1.1.1: Initialize GameState object from gemini.md schema
- 1.1.2: Create gameLoop() function with requestAnimationFrame
- 1.1.3: Implement delta time tracking (target 16.67ms per frame)
- 1.1.4: Add state machine: 'menu', 'playing', 'paused', 'gameover'
- 1.1.5: Create startGame() and resetGame() functions

**Verification Conditions:**
- [ ] Console logs "Game loop started at [timestamp]"
- [ ] Console reports FPS counter (should read ~60fps)
- [ ] Delta time between frames averages 16.67ms ± 2ms
- [ ] State transitions log correctly (menu → playing → gameover)

**Acceptance Test:** Empty canvas renders at steady 60fps for 10 seconds

---

### Task 1.2: Create SOP Documentation
**Description:** Write Standard Operating Procedures in architecture/ directory.

**Sub-tasks:**
- 1.2.1: Write architecture/game_loop.md (loop logic, state transitions)
- 1.2.2: Write architecture/input_handling.md (event listener patterns)
- 1.2.3: Write architecture/entity_manager.md (spawn/destroy rules)
- 1.2.4: Write architecture/physics_sop.md (collision formulas)

**Verification Conditions:**
- [ ] Each SOP file contains at least: Purpose, Algorithm, Edge Cases
- [ ] SOPs reference specific code locations (e.g., "See main.js:45")
- [ ] Collision formula matches: `distance < radius1 + radius2`

**Acceptance Test:** SOPs can be used to debug issues without reading code

---

## Parent Task 2: Rendering System

### Task 2.0: Initialize Renderer Module
**Description:** Create renderer.js with canvas context and clear/draw functions.

**Sub-tasks:**
- 2.0.1: Export `initRenderer(canvas)` function
- 2.0.2: Create `clearCanvas(ctx, width, height)` function
- 2.0.3: Implement canvas resize handler for responsive layout
- 2.0.4: Set canvas 2D context properties (lineWidth, lineCap, lineJoin)
- 2.0.5: Create helper: `drawCircle(ctx, x, y, radius, color)`

**Verification Conditions:**
- [ ] Canvas clears to `hsl(240, 30%, 8%)` (deep space background)
- [ ] Canvas resizes when browser window changes
- [ ] Test circle renders at (100, 100) with radius 50, color cyan

**Acceptance Test:** Running `drawCircle(ctx, 100, 100, 50, 'hsl(200, 100%, 50%)')` displays cyan circle

---

### Task 2.1: Implement Parallax Starfield
**Description:** Create 3-layer starfield with different scroll speeds.

**Sub-tasks:**
- 2.1.1: Generate 50 stars for layer 1 (hsl(0, 0%, 40%))
- 2.1.2: Generate 100 stars for layer 2 (hsl(0, 0%, 60%))
- 2.1.3: Generate 150 stars for layer 3 (hsl(0, 0%, 80%))
- 2.1.4: Implement `updateStarfield(speedMultiplier)` with scroll speeds 0.5x, 1.0x, 1.5x
- 2.1.5: Implement star wrapping (Y > canvas.height → Y = 0)

**Verification Conditions:**
- [ ] 300 total stars render on initialization
- [ ] Layer 3 stars move 3x faster than layer 1 stars
- [ ] Stars wrap seamlessly (no flicker at edge)
- [ ] Stars render BEFORE player/asteroids (correct z-index)

**Acceptance Test:** Screenshot shows 3 distinct layers of stars moving at different speeds

---

### Task 2.2: Implement Procedural Player Rendering
**Description:** Draw player spacecraft as triangular ship with cyan glow.

**Sub-tasks:**
- 2.2.1: Create `drawPlayer(ctx, player)` function
- 2.2.2: Use `ctx.save()` and `ctx.restore()` for rotation
- 2.2.3: Draw triangle: vertices at (0, -15), (-10, 10), (10, 10) relative to player position
- 2.2.4: Apply fill color `hsl(200, 100%, 50%)`
- 2.2.5: Add 3-frame motion blur trail (fading copies)

**Verification Conditions:**
- [ ] Player renders as upward-pointing triangle
- [ ] Rotation matches movement direction
- [ ] Cyan glow trail follows player
- [ ] Spacecraft flashes red during invulnerability (hsl(0, 80%, 50%))

**Acceptance Test:** Player renders at center screen and rotates smoothly when moved

---

### Task 2.3: Implement Procedural Asteroid Rendering
**Description:** Draw asteroids as jagged polygons with randomized vertices.

**Sub-tasks:**
- 2.3.1: Create `generateAsteroidVertices(radius, vertexCount)` returning array of {x, y}
- 2.3.2: Generate 8-12 random vertices with ±20% radius variation
- 2.3.3: Create `drawAsteroid(ctx, asteroid)` using `ctx.beginPath()` and `ctx.lineTo()`
- 2.3.4: Apply gradient fill: inner `hsl(30, 60%, 55%)`, outer `hsl(30, 50%, 40%)`
- 2.3.5: Apply rotation via `ctx.rotate(asteroid.rotation)`

**Verification Conditions:**
- [ ] Each asteroid has unique jagged shape
- [ ] Large asteroids (radius 50) render correctly
- [ ] Medium asteroids (radius 25) render correctly
- [ ] Small asteroids (radius 12) render correctly
- [ ] Rotation animation is smooth at 60fps

**Acceptance Test:** 10 asteroids render with distinct shapes and visible rotation

---

### Task 2.4: Implement Particle System Rendering
**Description:** Draw explosion particles with color variation and alpha fade.

**Sub-tasks:**
- 2.4.1: Create particle object pool (array of 300 reusable particles)
- 2.4.2: Create `spawnParticles(x, y, count, colors)` function
- 2.4.3: Implement `updateParticles(particles)` with velocity and alpha decay
- 2.4.4: Create `drawParticles(ctx, particles)` with `ctx.globalAlpha`
- 2.4.5: Recycle particles when alpha reaches 0

**Verification Conditions:**
- [ ] 20-30 particles spawn per explosion
- [ ] Particles fade from alpha 1.0 to 0.0 over 30 frames
- [ ] Colors alternate between `hsl(40, 100%, 60%)` and `hsl(20, 90%, 50%)`
- [ ] No garbage collection pauses > 5ms (check Chrome DevTools)

**Acceptance Test:** Destroying asteroid produces radial particle burst with smooth fade-out

---

## Parent Task 3: Physics & Collision System

### Task 3.0: Implement Player Physics
**Description:** Create player movement with inertia and screen wrapping.

**Sub-tasks:**
- 3.0.1: Create `updatePlayer(player, input, deltaTime)` in physics.js
- 3.0.2: Apply velocity changes based on input (WASD/joystick)
- 3.0.3: Apply inertia decay: `player.vx *= 0.95`, `player.vy *= 0.95`
- 3.0.4: Update position: `player.x += player.vx`, `player.y += player.vy`
- 3.0.5: Implement toroidal wrapping for all 4 edges

**Verification Conditions:**
- [ ] Player accelerates to max 5 pixels/frame when key held
- [ ] Player drifts to stop after releasing keys (velocity < 0.1 = 0)
- [ ] Exiting left edge makes player appear on right edge seamlessly
- [ ] Rotation matches velocity direction (Math.atan2(vy, vx))

**Acceptance Test:** Player moves smoothly with inertia and wraps around all screen edges

---

### Task 3.1: Implement Asteroid Physics
**Description:** Create asteroid movement and rotation.

**Sub-tasks:**
- 3.1.1: Create `updateAsteroids(asteroids, speedMultiplier)` function
- 3.1.2: Update position with velocity scaled by speedMultiplier
- 3.1.3: Update rotation: `asteroid.rotation += asteroid.rotationSpeed`
- 3.1.4: Implement screen wrapping for asteroids
- 3.1.5: Apply level-based speed scaling: `velocity * (1 + level * 0.1)`

**Verification Conditions:**
- [ ] Asteroids move in consistent directions
- [ ] Rotation speed increases with level
- [ ] Speed multiplier of 1.3 (level 3) produces visible 30% speed increase
- [ ] Asteroids wrap around edges like player

**Acceptance Test:** 5 asteroids move and rotate smoothly at varying speeds

---

### Task 3.2: Implement Collision Detection
**Description:** Create circle-based collision checks for all entity types.

**Sub-tasks:**
- 3.2.1: Create `checkCollision(entity1, entity2)` using distance formula
- 3.2.2: Implement player vs asteroids collision check
- 3.2.3: Implement bullets vs asteroids collision check
- 3.2.4: Apply damage: Large -2 HP, Medium -1 HP, Small -0.5 HP
- 3.2.5: Trigger invulnerability timer (60 frames = 1 second)

**Verification Conditions:**
- [ ] Collision formula: `Math.sqrt((x1-x2)^2 + (y1-y2)^2) < r1 + r2`
- [ ] Player health decreases correctly on collision
- [ ] Invulnerability prevents damage for exactly 60 frames
- [ ] Bullet-asteroid collision removes bullet and damages asteroid

**Acceptance Test:** Console logs "Collision detected: Player hit Large asteroid, -2 HP" with correct timing

---

### Task 3.3: Implement Asteroid Splitting
**Description:** Create split behavior for large and medium asteroids.

**Sub-tasks:**
- 3.3.1: Create `splitAsteroid(asteroid)` function
- 3.3.2: Spawn 2 child asteroids at parent's position
- 3.3.3: Set child radius: Large (50) → Medium (25), Medium (25) → Small (12)
- 3.3.4: Diverge child velocities at 120-degree angles
- 3.3.5: Increase child rotation speed: `parent.rotationSpeed * 1.5`

**Verification Conditions:**
- [ ] Large asteroid destruction spawns exactly 2 medium asteroids
- [ ] Medium asteroid destruction spawns exactly 2 small asteroids
- [ ] Small asteroid destruction spawns 0 asteroids (complete removal)
- [ ] Child velocities diverge visibly (not parallel)

**Acceptance Test:** Shooting large asteroid creates chain: 1 Large → 2 Medium → 4 Small → Destroyed

---

## Parent Task 4: Input System

### Task 4.0: Implement Desktop Keyboard Input
**Description:** Create keyboard event listeners for WASD and Arrow keys.

**Sub-tasks:**
- 4.0.1: Create input.js module with `initInput()` function
- 4.0.2: Add keydown/keyup listeners for W/A/S/D and Arrow keys
- 4.0.3: Maintain input state object: `{ up: false, down: false, left: false, right: false }`
- 4.0.4: Prevent default behavior on arrow keys (no page scrolling)
- 4.0.5: Export `getInputState()` function

**Verification Conditions:**
- [ ] Pressing W sets input.up = true
- [ ] Releasing W sets input.up = false
- [ ] Arrow keys and WASD produce identical input states
- [ ] Page does not scroll when using arrow keys

**Acceptance Test:** Console logs input state changes in real-time

---

### Task 4.1: Implement Desktop Mouse Input
**Description:** Create mouse event listeners for aiming and shooting.

**Sub-tasks:**
- 4.1.1: Add mousemove listener to track cursor position
- 4.1.2: Convert screen coordinates to canvas coordinates
- 4.1.3: Add mousedown/mouseup listeners for shooting
- 4.1.4: Implement auto-fire on hold (10 bullets/second timer)
- 4.1.5: Calculate bullet angle: `Math.atan2(mouseY - playerY, mouseX - playerX)`

**Verification Conditions:**
- [ ] Cursor position updates in real-time (tracked in GameState)
- [ ] Single click fires 1 bullet
- [ ] Holding mouse fires 10 bullets/second
- [ ] Bullets aim toward cursor position accurately

**Acceptance Test:** Bullets consistently travel toward cursor from player position

---

### Task 4.2: Implement Mobile User Agent Detection
**Description:** Detect mobile devices and toggle UI mode.

**Sub-tasks:**
- 4.2.1: Check `navigator.userAgent` for mobile keywords (Android, iPhone, iPad)
- 4.2.2: Set `GameState.isMobile` flag
- 4.2.3: Conditionally render virtual joystick if isMobile = true
- 4.2.4: Conditionally render fire button if isMobile = true
- 4.2.5: Disable desktop mouse/keyboard listeners on mobile

**Verification Conditions:**
- [ ] Desktop browser sets isMobile = false
- [ ] Mobile browser (or DevTools device mode) sets isMobile = true
- [ ] Mobile UI elements only render when isMobile = true
- [ ] Console logs "Platform detected: [Desktop/Mobile]"

**Acceptance Test:** Opening on mobile device shows joystick and fire button; desktop shows neither

---

### Task 4.3: Implement Virtual Joystick
**Description:** Create touch-based joystick for mobile movement.

**Sub-tasks:**
- 4.3.1: Render joystick outer circle (120px) at bottom-left (20px margin)
- 4.3.2: Render joystick inner knob (50px) at center of outer circle
- 4.3.3: Add touchstart listener to activate joystick
- 4.3.4: Add touchmove listener to update knob position
- 4.3.5: Normalize knob offset to provide directional input (-1 to 1 range)

**Verification Conditions:**
- [ ] Joystick renders with colors: outer hsla(200, 100%, 50%, 0.3), inner hsl(200, 100%, 50%)
- [ ] Touching joystick moves inner knob within boundary
- [ ] Knob returns to center on touchend
- [ ] Directional input matches knob offset (e.g., top-right = {x: 0.7, y: -0.7})

**Acceptance Test:** Player spacecraft moves in direction of joystick offset

---

### Task 4.4: Implement Mobile Fire Button
**Description:** Create touch-based fire button for mobile shooting.

**Sub-tasks:**
- 4.4.1: Render fire button (100px diameter) at bottom-right (20px margin)
- 4.4.2: Add "FIRE" label in center (16px monospace)
- 4.4.3: Add touchstart listener to start auto-fire
- 4.4.4: Add touchend listener to stop auto-fire
- 4.4.5: Change color on press: default hsla(0, 80%, 50%, 0.5) → pressed hsl(0, 80%, 50%)

**Verification Conditions:**
- [ ] Fire button renders in bottom-right corner
- [ ] Touching button changes color to solid red
- [ ] Bullets fire continuously while touching (10/second)
- [ ] Releasing touch stops firing and resets color

**Acceptance Test:** Holding fire button produces continuous stream of bullets

---

## Parent Task 5: Audio System

### Task 5.0: Initialize Audio Context
**Description:** Create audio.js module with Web Audio API setup.

**Sub-tasks:**
- 5.0.1: Create `initAudio()` function that initializes AudioContext after user gesture
- 5.0.2: Create `isMuted` state in localStorage
- 5.0.3: Create `toggleMute()` function
- 5.0.4: Render mute button (40px × 40px) in top-right corner
- 5.0.5: Add click listener to mute button

**Verification Conditions:**
- [ ] AudioContext initializes on first user click/touch
- [ ] Mute button renders with speaker icon
- [ ] Clicking mute button toggles between cyan (active) and red (muted)
- [ ] Mute state persists across page reloads via localStorage

**Acceptance Test:** Clicking mute button silences all audio; refreshing page maintains mute state

---

### Task 5.1: Implement Shooting SFX
**Description:** Create synthesized shooting sound with Web Audio API.

**Sub-tasks:**
- 5.1.1: Create `playShootSound()` function
- 5.1.2: Create OscillatorNode at 200Hz
- 5.1.3: Create GainNode with exponential decay (1.0 → 0.0 over 50ms)
- 5.1.4: Connect: Oscillator → Gain → AudioContext.destination
- 5.1.5: Start oscillator and stop after 50ms

**Verification Conditions:**
- [ ] Sound plays on bullet fire (if not muted)
- [ ] Frequency is 200Hz (verified with spectrum analyzer)
- [ ] Duration is exactly 50ms
- [ ] No audio artifacts or clicks

**Acceptance Test:** Shooting produces brief "pew" sound

---

### Task 5.2: Implement Explosion SFX
**Description:** Create noise-based explosion sound.

**Sub-tasks:**
- 5.2.1: Create `playExplosionSound()` function
- 5.2.2: Generate white noise buffer (AudioBufferSourceNode)
- 5.2.3: Create GainNode with exponential envelope (1.0 → 0.0 over 300ms)
- 5.2.4: Apply filter (low-pass at 800Hz for "thump" effect)
- 5.2.5: Connect: Noise → Filter → Gain → Destination

**Verification Conditions:**
- [ ] Sound plays on asteroid destruction (if not muted)
- [ ] Duration is 300ms
- [ ] Sound has "boom" character (low-frequency emphasis)
- [ ] Multiple explosions can overlap without distortion

**Acceptance Test:** Destroying asteroid produces satisfying explosion sound

---

### Task 5.3: Implement Level-Up SFX
**Description:** Create melodic chime using oscillators.

**Sub-tasks:**
- 5.3.1: Create `playLevelUpSound()` function
- 5.3.2: Create 3 oscillators at frequencies: 261.63Hz (C), 329.63Hz (E), 392.00Hz (G)
- 5.3.3: Schedule notes sequentially: C at 0ms, E at 100ms, G at 200ms
- 5.3.4: Apply GainNode fade-in/fade-out (0 → 0.3 → 0 over 500ms)
- 5.3.5: Stop all oscillators after 500ms

**Verification Conditions:**
- [ ] Sound plays on level completion (if not muted)
- [ ] Three distinct notes are audible in sequence
- [ ] Total duration is 500ms
- [ ] Chord sounds pleasant (major triad)

**Acceptance Test:** Completing wave produces ascending "ding-ding-ding" chime

---

### Task 5.4: Implement Voice Line System
**Description:** Create Web Speech Synthesis for encouragement phrases.

**Sub-tasks:**
- 5.4.1: Create `speakPhrase(text)` function
- 5.4.2: Check `speechSynthesis.speaking` to prevent overlap
- 5.4.3: Create SpeechSynthesisUtterance with text
- 5.4.4: Set voice to default system voice
- 5.4.5: Queue phrases: "Oh, yes!" (asteroid), "Well done, Cap!" (level up), "Excellent!" (weapon pickup)

**Verification Conditions:**
- [ ] Voice line plays on asteroid destruction (if not muted)
- [ ] No overlapping voices (new phrase waits for current to finish)
- [ ] Mute toggle disables voice lines
- [ ] Phrases are clearly audible and enthusiastic

**Acceptance Test:** Destroying 3 asteroids rapidly queues "Oh, yes!" 3 times without overlap

---

## Parent Task 6: Game Logic & Entities

### Task 6.0: Implement Bullet System
**Description:** Create bullet spawning, movement, and lifecycle.

**Sub-tasks:**
- 6.0.1: Create `spawnBullet(player, targetX, targetY)` function
- 6.0.2: Calculate velocity vector toward target: `dx = targetX - player.x`, `dy = targetY - player.y`
- 6.0.3: Normalize and scale velocity to 10 pixels/frame
- 6.0.4: Add bullet to GameState.bullets array
- 6.0.5: Remove bullet after traveling 800px or hitting asteroid

**Verification Conditions:**
- [ ] Bullet spawns at player position
- [ ] Bullet travels in straight line toward target
- [ ] Bullet speed is constant 10 pixels/frame
- [ ] Bullet despawns after 800px (80 frames at 60fps)

**Acceptance Test:** Firing at screen edge produces bullet that despawns before reaching edge

---

### Task 6.1: Implement Asteroid Spawning
**Description:** Create wave-based asteroid spawn system.

**Sub-tasks:**
- 6.1.1: Create `spawnWave(level)` function
- 6.1.2: Calculate asteroid count: `3 + level`
- 6.1.3: Spawn asteroids at random edge positions
- 6.1.4: Ensure safe distance from player: `distance(asteroid, player) > 200px`
- 6.1.5: Assign random velocity vectors (2-4 pixels/frame)

**Verification Conditions:**
- [ ] Level 1 spawns 4 large asteroids
- [ ] Level 5 spawns 8 large asteroids
- [ ] No asteroids spawn within 200px of player
- [ ] Asteroids spawn with random rotation speeds

**Acceptance Test:** Starting level 3 spawns exactly 6 asteroids with safe spacing

---

### Task 6.2: Implement Score System
**Description:** Create score tracking and point awards.

**Sub-tasks:**
- 6.2.1: Award points on asteroid destruction: Large 20, Medium 50, Small 100
- 6.2.2: Update GameState.score immediately
- 6.2.3: Detect consecutive kills (< 2 seconds apart) for 1.5x multiplier
- 6.2.4: Display "COMBO!" text for 1 second on multiplier trigger
- 6.2.5: Update HUD score display in real-time

**Verification Conditions:**
- [ ] Destroying small asteroid adds exactly 100 points
- [ ] Two kills within 2 seconds apply 1.5x multiplier (e.g., 100 → 150)
- [ ] Combo indicator flashes in center screen
- [ ] Score updates without frame drops

**Acceptance Test:** Destroying 3 small asteroids rapidly awards 100 + 150 + 150 = 400 points

---

### Task 6.3: Implement Level Progression
**Description:** Create level-up logic and difficulty scaling.

**Sub-tasks:**
- 6.3.1: Detect when all asteroids are destroyed (GameState.asteroids.length === 0)
- 6.3.2: Increment GameState.level
- 6.3.3: Update speed multiplier: `1 + (level * 0.1)`
- 6.3.4: Play level-up SFX and voice line
- 6.3.5: Pause for 2 seconds, then spawn next wave

**Verification Conditions:**
- [ ] Level increases after all asteroids cleared
- [ ] Speed multiplier at level 5 is 1.5
- [ ] 2-second pause occurs between waves
- [ ] Voice line "Well done, Cap!" plays on level-up

**Acceptance Test:** Completing level 1 increments to level 2 and spawns 5 asteroids after 2-second pause

---

### Task 6.4: Implement Health System
**Description:** Create player health tracking and game-over condition.

**Sub-tasks:**
- 6.4.1: Initialize GameState.player.health = 100
- 6.4.2: Decrease health on collision (Large -2, Medium -1, Small -0.5)
- 6.4.3: Clamp health between 0 and 100
- 6.4.4: Trigger game over when health <= 0
- 6.4.5: Display health bar in HUD with gradient (green → yellow → red)

**Verification Conditions:**
- [ ] Health bar accurately reflects current HP percentage
- [ ] Health reaches 0 triggers gameState = 'gameover'
- [ ] Health bar color changes at 66% (green), 33% (yellow), 0% (red)
- [ ] Invulnerability prevents health decrease for 60 frames

**Acceptance Test:** Taking 50 damage turns health bar yellow; reaching 0 HP shows game over screen

---

## Parent Task 7: UI & HUD

### Task 7.0: Implement HUD Display
**Description:** Create heads-up display with health, score, and level.

**Sub-tasks:**
- 7.0.1: Render HUD panel in top-left corner (semi-transparent background)
- 7.0.2: Display "HEALTH: [bar]" with 200px × 20px bar
- 7.0.3: Display "SCORE: [number]" with monospace font
- 7.0.4: Display "LEVEL: [number]" with monospace font
- 7.0.5: Apply neon cyan glow to text (text-shadow: 0 0 10px cyan)

**Verification Conditions:**
- [ ] HUD renders in top-left with 12px padding
- [ ] Health bar width = (currentHealth / 100) * 200px
- [ ] Score and level update in real-time
- [ ] Text is readable with cyan glow effect

**Acceptance Test:** HUD displays accurate health (100), score (0), level (1) on game start

---

### Task 7.1: Implement Game Over Screen
**Description:** Create modal overlay with final score and high score table.

**Sub-tasks:**
- 7.1.1: Render dark overlay (hsla(0, 0%, 0%, 0.85)) when gameState = 'gameover'
- 7.1.2: Display "GAME OVER" heading (48px monospace)
- 7.1.3: Display final score (32px)
- 7.1.4: Display high score table (top 5 from localStorage)
- 7.1.5: Render "RESTART" button (hover effect: scale 1.1x, cyan glow)

**Verification Conditions:**
- [ ] Game over screen appears when health reaches 0
- [ ] Final score matches GameState.score
- [ ] High score table loads from localStorage
- [ ] Clicking "RESTART" calls resetGame() and starts new game

**Acceptance Test:** Dying displays game over screen with correct score and functional restart button

---

### Task 7.2: Implement High Score Persistence
**Description:** Save and load high scores using localStorage.

**Sub-tasks:**
- 7.2.1: Create `saveHighScore(score)` function
- 7.2.2: Load existing high scores from localStorage (JSON array)
- 7.2.3: Add new score to array and sort descending
- 7.2.4: Keep top 5 scores only
- 7.2.5: Save updated array back to localStorage

**Verification Conditions:**
- [ ] High score persists after page reload
- [ ] Only top 5 scores are stored
- [ ] Scores are sorted highest to lowest
- [ ] localStorage key is "voidHunterHighScores"

**Acceptance Test:** Scoring 5000 saves to localStorage; refreshing page shows 5000 in high score table

---

### Task 7.3: Implement Screen Shake Effect
**Description:** Create canvas offset shake on large impacts.

**Sub-tasks:**
- 7.3.1: Create `triggerScreenShake()` function
- 7.3.2: Set shake timer to 12 frames (200ms)
- 7.3.3: Apply random offset to canvas: `ctx.translate(randX, randY)` where rand = ±5px
- 7.3.4: Apply exponential decay: `amplitude = 5 * (0.9 ^ frameCount)`
- 7.3.5: Reset offset after shake completes

**Verification Conditions:**
- [ ] Screen shake triggers on large asteroid collision
- [ ] Shake lasts exactly 12 frames
- [ ] Initial amplitude is 5px
- [ ] Shake decays smoothly (no jarring stops)

**Acceptance Test:** Hitting large asteroid causes visible screen shake for ~200ms

---

## Parent Task 8: Polish & Deployment

### Task 8.0: Implement CSS Styling
**Description:** Create style.css for canvas, HUD, and mobile controls.

**Sub-tasks:**
- 8.0.1: Set body background to deep space color `hsl(240, 30%, 8%)`
- 8.0.2: Center canvas with flexbox
- 8.0.3: Style HUD with semi-transparent background and cyan border
- 8.0.4: Style mobile controls with specified colors and sizes
- 8.0.5: Add hover effects to mute button and restart button

**Verification Conditions:**
- [ ] Canvas is centered horizontally and vertically
- [ ] HUD has 2px cyan border with rounded corners (4px)
- [ ] Mobile controls render only on mobile devices
- [ ] All colors match Vibe Specification HSL values

**Acceptance Test:** Page matches visual design from PRD Vibe Specification

---

### Task 8.1: Implement Weapon Pickup System
**Description:** Create collectible weapons with different fire patterns.

**Sub-tasks:**
- 8.1.1: Spawn weapon pickups randomly (every 15 seconds)
- 8.1.2: Render weapon as green glow (hsl(120, 80%, 50%))
- 8.1.3: Implement weapon types: "single", "triple" (spread), "rapid" (2x fire rate)
- 8.1.4: Apply weapon on collection (remove after 20 seconds)
- 8.1.5: Play voice line "Excellent!" on pickup

**Verification Conditions:**
- [ ] Weapon spawns at random position every 15 seconds
- [ ] Collecting weapon changes fire pattern
- [ ] Weapon expires after 20 seconds (revert to default)
- [ ] Triple spread fires 3 bullets at -15°, 0°, +15° angles

**Acceptance Test:** Collecting triple-spread weapon fires 3 bullets in fan pattern

---

### Task 8.2: Create gemini.md Project Map
**Description:** Document complete GameState schema and entity definitions.

**Sub-tasks:**
- 8.2.1: Copy GameState JSON schema from PRD
- 8.2.2: Add splitting math: Large (50) → 2 * Medium (25) → 4 * Small (12)
- 8.2.3: Document collision formulas from physics_sop.md
- 8.2.4: Document color palette HSL values
- 8.2.5: Add example velocity calculations

**Verification Conditions:**
- [ ] gemini.md contains complete GameState schema
- [ ] All entity properties are documented
- [ ] Math formulas are verifiable (can be tested manually)
- [ ] File serves as "Source of Truth" for game state

**Acceptance Test:** Developer can implement any mechanic using only gemini.md as reference

---

### Task 8.3: Create README.md for Deployment
**Description:** Write deployment instructions for GitHub Pages.

**Sub-tasks:**
- 8.3.1: Add "Void Hunter: Redux" title and description
- 8.3.2: Document controls (desktop and mobile)
- 8.3.3: Add GitHub Pages deployment steps (Settings → Pages → main branch)
- 8.3.4: List browser requirements (Chrome 90+, Firefox 88+, Safari 14+)
- 8.3.5: Add troubleshooting section (Canvas API check, audio permissions)

**Verification Conditions:**
- [ ] README contains clear deployment instructions
- [ ] Controls are documented for both platforms
- [ ] Browser compatibility list matches PRD

**Acceptance Test:** Following README instructions successfully deploys game to GitHub Pages

---

### Task 8.4: Final Verification & Testing
**Description:** Comprehensive testing against all Gherkin scenarios.

**Sub-tasks:**
- 8.4.1: Test desktop keyboard controls (WASD and Arrows)
- 8.4.2: Test desktop mouse aiming and shooting
- 8.4.3: Test mobile virtual joystick and fire button (DevTools device mode)
- 8.4.4: Test all audio (SFX, voice lines, mute toggle)
- 8.4.5: Verify 60fps performance over 5-minute session

**Verification Conditions:**
- [ ] All Gherkin scenarios pass
- [ ] No console errors or warnings
- [ ] FPS averages 60fps ± 2 over 5 minutes
- [ ] High score persistence works across sessions
- [ ] Game is playable on target browsers

**Acceptance Test:** 10-minute playthrough with no critical bugs

---

## Approval & Next Steps

### Task Summary
- **Total Parent Tasks:** 9 (including Task 0)
- **Total Sub-tasks:** 88
- **Estimated Completion:** 8-12 hours of development time

### Critical Path
1. Parent Task 0-1 (Foundation & Game Loop)
2. Parent Task 2 (Rendering)
3. Parent Task 3 (Physics)
4. Parent Task 4 (Input)
5. Parent Task 6 (Game Logic)
6. Parent Task 5 (Audio)
7. Parent Task 7 (UI)
8. Parent Task 8 (Polish)

### Handover to Developer

```json
{
  "next_agent_role": "Developer",
  "source_artifact": "/artifacts/04_em_task_breakdown.md",
  "system_instruction": "Implement the game following the task breakdown. Work atomically (max 15 lines per step). After each parent task, create verification logs in /artifacts/06_verification_logs.md with screenshots or console output. Maintain a decision trace in /artifacts/05_dev_decision_trace.md logging implementation choices. Read /artifacts/00_tech_stack_rules.md before each coding session. If you encounter 2 consecutive failures, escalate to Tech Lead (regenerate Gherkin specs with corrected requirements).",
  "validation_status": "APPROVED"
}
```

---

**Document End**  
*Total verification checkboxes: 88*  
*Ready for Stage 5: Developer execution*
