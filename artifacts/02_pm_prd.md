# Product Requirements Document (PRD) - Void Hunter: Redux

**Document Version:** 1.0  
**Date:** 2026-01-21  
**Product Manager:** RSDC Pipeline (Stage 2)  
**Project:** Void Hunter: Redux - Browser-Based Spacecraft Shooter

---

## 1. Product Vision

### Mission Statement
Create an addictive, arcade-style spacecraft shooter that delivers instant gratification through responsive controls, satisfying visual feedback, and progressive challenge scaling—all within a zero-install browser experience.

### Target Audience
- **Primary:** Casual gamers (ages 16-35) seeking quick, engaging gameplay sessions (5-15 minutes)
- **Secondary:** Retro arcade enthusiasts who appreciate classic mechanics with modern polish
- **Platform:** Desktop browsers (Chrome, Firefox, Safari) and mobile devices (iOS Safari, Chrome Android)

### Unique Value Proposition
"Void Hunter: Redux combines the timeless appeal of *Asteroids* with modern 'game feel' polish—procedurally generated graphics, synthesized audio, and buttery-smooth physics—all running natively in your browser with zero downloads."

---

## 2. Vibe Specification (Visual Personality)

### Overall Aesthetic
**Retro-Futuristic Neon Arcade**
- Clean, minimalist UI with neon accents
- Dark space background with vibrant, high-contrast game elements
- "Tron-meets-Asteroids" visual language
- Emphasis on readability and visual clarity during fast-paced action

### Color Palette (HSL Values)

**Primary Colors:**
- **Deep Space Background:** `hsl(240, 30%, 8%)` - Dark blue-black
- **Player Spacecraft:** `hsl(200, 100%, 50%)` - Bright cyan
- **Asteroids (Base):** `hsl(30, 50%, 40%)` - Earthy brown-orange
- **Asteroid Highlights:** `hsl(30, 60%, 55%)` - Lighter orange for texture

**Accent Colors:**
- **Explosions (Core):** `hsl(40, 100%, 60%)` - Bright orange-yellow
- **Explosions (Outer):** `hsl(20, 90%, 50%)` - Red-orange
- **Weapon Pickups:** `hsl(120, 80%, 50%)` - Neon green
- **UI Glow:** `hsl(180, 100%, 50%)` - Cyan glow for interactive elements

**Status Indicators:**
- **Health (High):** `hsl(120, 70%, 50%)` - Green
- **Health (Medium):** `hsl(50, 100%, 50%)` - Yellow
- **Health (Low):** `hsl(0, 80%, 50%)` - Red
- **Score/Text:** `hsl(0, 0%, 95%)` - Off-white

**Starfield:**
- **Layer 1 (Far):** `hsl(0, 0%, 40%)` - Dim gray
- **Layer 2 (Mid):** `hsl(0, 0%, 60%)` - Mid gray
- **Layer 3 (Near):** `hsl(0, 0%, 80%)` - Bright gray

### Typography

**Primary Font Stack:**
```css
font-family: 'Courier New', 'Consolas', monospace;
```
*Rationale:* Monospace fonts evoke retro terminal aesthetics while ensuring consistent character width for score/health displays.

**Font Sizing:**
- **HUD Elements:** 18px (desktop), 24px (mobile)
- **Score Display:** 24px (desktop), 32px (mobile)
- **Game Over Text:** 48px (desktop), 56px (mobile)
- **UI Buttons:** 16px (desktop), 20px (mobile)

**Font Styling:**
- **Weight:** 700 (bold) for all UI text
- **Letter Spacing:** 0.1em for readability
- **Text Shadow:** `0 0 10px hsla(200, 100%, 50%, 0.8)` for neon glow effect

### UI Components

**HUD (Heads-Up Display):**
- **Position:** Top-left corner (Health, Score, Level)
- **Style:** Semi-transparent dark background `hsla(240, 30%, 8%, 0.7)` with 2px cyan border
- **Padding:** 12px internal spacing
- **Health Bar:**
  - Width: 200px (desktop), 150px (mobile)
  - Height: 20px
  - Border: 2px solid cyan
  - Fill: Gradient from green → yellow → red based on percentage

**Mute Button:**
- **Position:** Top-right corner
- **Size:** 40px × 40px (desktop), 60px × 60px (mobile)
- **Icon:** Speaker symbol (procedurally drawn with Canvas)
- **States:**
  - Active: `hsl(200, 100%, 50%)` (cyan)
  - Muted: `hsl(0, 80%, 50%)` (red) with strikethrough
- **Hover Effect:** Scale to 1.1x with 5px cyan glow

**Virtual Joystick (Mobile Only):**
- **Position:** Bottom-left, 20px margin
- **Size:** 120px diameter outer circle, 50px diameter inner knob
- **Colors:**
  - Outer: `hsla(200, 100%, 50%, 0.3)` (semi-transparent cyan)
  - Inner: `hsl(200, 100%, 50%)` (solid cyan)
- **Behavior:** Inner knob follows touch within outer boundary

**Fire Button (Mobile Only):**
- **Position:** Bottom-right, 20px margin
- **Size:** 100px diameter
- **Colors:**
  - Default: `hsla(0, 80%, 50%, 0.5)` (semi-transparent red)
  - Pressed: `hsl(0, 80%, 50%)` (solid red)
- **Label:** "FIRE" in 16px monospace

**Game Over Screen:**
- **Background:** `hsla(0, 0%, 0%, 0.85)` (dark overlay)
- **Container:** Centered modal with 300px width
- **Border:** 3px solid cyan with 10px cyan glow
- **Content:**
  - "GAME OVER" heading (48px)
  - Final score (32px)
  - High scores table (5 entries, 20px)
  - "RESTART" button (highlighted on hover)

### Visual Effects ("Juice")

**Particle System:**
- **Explosion Particles:** 20-30 per asteroid
- **Shape:** 2px circles
- **Color:** Random between `hsl(40, 100%, 60%)` and `hsl(20, 90%, 50%)`
- **Velocity:** Random radial direction, 2-5 pixels/frame
- **Lifespan:** 30 frames (0.5 seconds at 60fps)
- **Alpha Decay:** Linear fade from 1.0 to 0.0

**Screen Shake:**
- **Trigger:** Large asteroid collision or destruction
- **Amplitude:** 5px random offset in X and Y
- **Duration:** 200ms (12 frames)
- **Easing:** Exponential decay

**Glow Effects:**
- **Player Trail:** 3-frame motion blur (fading copies behind spacecraft)
- **Weapon Fire:** 10px radial glow around bullets
- **Asteroid Rotation:** Subtle shadow to emphasize 3D effect

---

## 3. User Stories & Acceptance Criteria

### Epic 1: Core Gameplay Loop

#### User Story 1.1: Player Movement
**As a player, I want to control my spacecraft smoothly so that I can navigate through asteroids.**

**Acceptance Criteria:**
- [ ] WASD or Arrow keys move the spacecraft (desktop)
- [ ] Virtual joystick controls movement (mobile)
- [ ] Movement exhibits inertia (velocity decay factor 0.95 per frame)
- [ ] Spacecraft wraps around screen edges (toroidal topology)
- [ ] Rotation animation matches movement direction

#### User Story 1.2: Shooting Mechanics
**As a player, I want to shoot projectiles to destroy asteroids.**

**Acceptance Criteria:**
- [ ] Left mouse click fires bullets toward cursor (desktop)
- [ ] Fire button shoots bullets in aiming direction (mobile)
- [ ] Holding fire button enables auto-fire (10 bullets/second)
- [ ] Bullets despawn after traveling 800px or hitting asteroid
- [ ] Visual feedback: muzzle flash + shooting sound

#### User Story 1.3: Asteroid Behavior
**As a player, I want asteroids to split realistically when destroyed.**

**Acceptance Criteria:**
- [ ] Large asteroids (radius 50) split into 2 Medium asteroids (radius 25)
- [ ] Medium asteroids split into 2 Small asteroids (radius 12)
- [ ] Small asteroids are destroyed completely (no further splits)
- [ ] Split asteroids inherit partial velocity from parent + divergent vectors
- [ ] Rotation speed increases with each split generation

#### User Story 1.4: Collision Detection
**As a player, I expect damage when my spacecraft hits an asteroid.**

**Acceptance Criteria:**
- [ ] Player health decreases on asteroid collision:
  - Large: -2 HP
  - Medium: -1 HP
  - Small: -0.5 HP
- [ ] Collision triggers screen shake and explosion particles
- [ ] Player is briefly invulnerable (1 second) after hit
- [ ] Visual feedback: spacecraft flashes red during invulnerability

### Epic 2: Progression & Difficulty

#### User Story 2.1: Level Advancement
**As a player, I want increasing difficulty to maintain engagement.**

**Acceptance Criteria:**
- [ ] Level increases after all asteroids are cleared
- [ ] Speed multiplier: `1 + (level * 0.1)`
- [ ] Asteroid count increases: `3 + level` large asteroids per wave
- [ ] Voice line plays on level up: "Well done, Cap!"
- [ ] Brief pause (2 seconds) before next wave spawns

#### User Story 2.2: Score System
**As a player, I want my score to reflect my performance.**

**Acceptance Criteria:**
- [ ] Points awarded per asteroid destroyed:
  - Large: 20 points
  - Medium: 50 points
  - Small: 100 points
- [ ] Bonus multiplier for consecutive kills (< 2 seconds apart)
- [ ] Score displayed in real-time in HUD
- [ ] High score persists via localStorage

### Epic 3: Audio Experience

#### User Story 3.1: Synthesized SFX
**As a player, I want satisfying audio feedback for my actions.**

**Acceptance Criteria:**
- [ ] Shooting: 200Hz oscillator with 50ms decay
- [ ] Explosion: White noise with exponential gain envelope
- [ ] Level-up: Ascending chord (C-E-G notes)
- [ ] All SFX respect mute toggle state

#### User Story 3.2: Voice Encouragement
**As a player, I want enthusiastic voice lines to enhance excitement.**

**Acceptance Criteria:**
- [ ] Voice lines triggered on events:
  - Asteroid destroyed: "Oh, yes!"
  - Level up: "Well done, Cap!"
  - Weapon collected: "Excellent!"
- [ ] Speech synthesis uses default system voice
- [ ] No overlapping voice lines (queue if necessary)
- [ ] Respects mute toggle

### Epic 4: Platform Compatibility

#### User Story 4.1: Mobile Optimization
**As a mobile player, I want touch-optimized controls.**

**Acceptance Criteria:**
- [ ] User agent detection auto-enables mobile mode
- [ ] Virtual joystick renders in bottom-left (120px diameter)
- [ ] Fire button renders in bottom-right (100px diameter)
- [ ] Touch targets are minimum 44px (accessibility standard)
- [ ] Viewport meta tag prevents zooming

#### User Story 4.2: Cross-Browser Support
**As a player, I expect consistent performance across browsers.**

**Acceptance Criteria:**
- [ ] Game runs at 60fps on Chrome 90+, Firefox 88+, Safari 14+
- [ ] Canvas API availability check with fallback error message
- [ ] Web Audio and Speech API graceful degradation if unavailable
- [ ] Relative asset paths work on GitHub Pages deployment

### Epic 5: Visual Polish

#### User Story 5.1: Particle Effects
**As a player, I want satisfying explosion visuals.**

**Acceptance Criteria:**
- [ ] 20-30 particles spawn at asteroid destruction point
- [ ] Particles radiate outward with randomized velocity
- [ ] Color alternates between orange and yellow hues
- [ ] Fade-out animation over 30 frames
- [ ] Object pooling prevents performance drop

#### User Story 5.2: Parallax Starfield
**As a player, I want immersive background motion.**

**Acceptance Criteria:**
- [ ] 3 layers of stars (50, 100, 150 stars respectively)
- [ ] Layer scroll speeds: 0.5x, 1.0x, 1.5x game speed
- [ ] Stars wrap around screen edges
- [ ] Star brightness varies by layer (dim → bright)
- [ ] Stars render behind all game entities

---

## 4. Technical Requirements

### Performance Benchmarks
- **Frame Rate:** Sustained 60fps (16.67ms per frame)
- **Input Latency:** < 50ms from input to visual response
- **Load Time:** < 2 seconds on 3G connection
- **Memory Usage:** < 100MB for entire game session

### Data Schema (gemini.md)

**GameState Object:**
```javascript
{
  player: {
    x: Number,           // Position X
    y: Number,           // Position Y
    vx: Number,          // Velocity X
    vy: Number,          // Velocity Y
    rotation: Number,    // Angle in radians
    health: Number,      // HP (0-100)
    weapon: String,      // Current weapon type
    invulnerable: Boolean,
    invulnerableTimer: Number
  },
  asteroids: [
    {
      x: Number,
      y: Number,
      vx: Number,
      vy: Number,
      rotation: Number,
      rotationSpeed: Number,
      size: String,      // 'large', 'medium', 'small'
      radius: Number,
      vertices: Array    // For procedural shape
    }
  ],
  bullets: [
    {
      x: Number,
      y: Number,
      vx: Number,
      vy: Number,
      damage: Number,
      distanceTraveled: Number
    }
  ],
  particles: [
    {
      x: Number,
      y: Number,
      vx: Number,
      vy: Number,
      alpha: Number,
      color: String,
      lifetime: Number
    }
  ],
  weapons: [           // Active weapon pickups
    {
      x: Number,
      y: Number,
      type: String,
      expiryTime: Number
    }
  ],
  score: Number,
  level: Number,
  highScores: [        // From localStorage
    { initials: String, score: Number }
  ],
  gameState: String,   // 'menu', 'playing', 'paused', 'gameover'
  isMuted: Boolean,
  speedMultiplier: Number
}
```

### File Deliverables

**Root Directory:**
- `index.html` - Entry point with canvas and UI overlays
- `gemini.md` - Project map and data schemas
- `README.md` - Deployment instructions

**CSS Directory:**
- `style.css` - Canvas styling, HUD, mobile controls

**JS Directory:**
- `main.js` - Game loop orchestration
- `modules/renderer.js` - Canvas drawing functions
- `modules/physics.js` - Collision and velocity
- `modules/audio.js` - Audio manager
- `modules/input.js` - Input handler

**Architecture Directory:**
- `game_loop.md` - Main loop SOP
- `input_handling.md` - Control flow SOP
- `entity_manager.md` - Spawn/destroy SOP
- `physics_sop.md` - Collision formulas SOP

---

## 5. Success Metrics

### Launch Criteria (MVP)
- [ ] All user stories in Epic 1-3 complete
- [ ] 60fps performance on target browsers
- [ ] Mobile controls functional on iOS Safari and Chrome Android
- [ ] Zero critical bugs in core gameplay loop

### Post-Launch KPIs
- **Engagement:** Average session length > 7 minutes
- **Retention:** 40% of players return within 7 days
- **Technical:** < 1% error rate in browser console logs
- **Accessibility:** WCAG 2.1 AA compliance for UI text contrast

---

## 6. Out of Scope (Future Versions)

**Version 2.0 Considerations:**
- Power-ups (shields, speed boost, multi-shot)
- Boss asteroid encounters
- Online leaderboard with Firebase integration
- Procedurally generated background music
- Customizable spacecraft skins
- Gamepad/controller support

---

## 7. Design Mockups Reference

**Note:** Since all graphics are procedural, no external mockups required. Refer to "Vibe Specification" section for color values and layout descriptions.

**Key Visual References:**
- Player spacecraft: Triangular ship with cyan glow trail
- Asteroids: Jagged polygons (8-12 vertices) with gradient fill
- HUD: Top-left dark panel with neon cyan borders
- Mobile controls: Semi-transparent overlays in corners

---

## 8. Dependencies & Constraints

### External Dependencies
**None** - All functionality uses native Web APIs:
- HTML5 Canvas API (2D)
- Web Audio API
- Web Speech Synthesis API
- localStorage API

### Browser API Requirements
- `requestAnimationFrame` (for game loop)
- `navigator.userAgent` (for platform detection)
- `AudioContext` (for SFX)
- `speechSynthesis` (for voice lines)

### Deployment Constraints
- Must be deployable to GitHub Pages (static hosting)
- No build step required (vanilla JS, no transpilation)
- Optional: Minification for production (future enhancement)

---

## 9. Approval & Next Steps

### Validation Checklist
- [x] All requirements from `space_craftgame.md` incorporated
- [x] Vibe specification defines visual personality with HSL values
- [x] User stories have measurable acceptance criteria
- [x] Technical requirements align with `/artifacts/00_tech_stack_rules.md`
- [x] Data schema defined for `gemini.md` implementation

### Handover to Tech Lead

```json
{
  "next_agent_role": "Tech Lead",
  "source_artifact": "/artifacts/02_pm_prd.md",
  "system_instruction": "Convert the user stories from the PRD into Gherkin-style feature specifications in /artifacts/03_tl_gherkin_specs.feature. Use Given-When-Then syntax for all acceptance criteria. Validate that the PRD contains sufficient implementation detail. If any user story lacks clarity or testable conditions, REJECT the artifact and request regeneration with specific gaps identified.",
  "validation_status": "APPROVED"
}
```

---

**Document End**  
*For questions or clarifications, refer to `/artifacts/00_decision_journal.md`*
