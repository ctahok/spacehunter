# Space Hunter - Project Map

## Game State Schema

This document serves as the "Source of Truth" for all game state and entity definitions.

### GameState Object

```javascript
const GameState = {
  player: {
    x: Number,                // Position X (canvas coordinates)
    y: Number,                // Position Y (canvas coordinates)
    vx: Number,               // Velocity X (pixels/frame)
    vy: Number,               // Velocity Y (pixels/frame)
    rotation: Number,         // Angle in radians (rotates to face cursor/joystick)
    health: Number,           // HP (0-25, reduced from 50)
    powerups: {               // Stacking powerup system (Session 5)
      tripleShot: { active: Boolean, expiryTime: Number },
      rapidFire: { active: Boolean, expiryTime: Number }
    },
    invulnerable: Boolean,    // Invulnerability flag
    invulnerableTimer: Number, // Frames remaining (60 frames = 1 second)
    radius: Number            // Collision radius (15px)
  },
  
  asteroids: [
    {
      x: Number,              // Position X
      y: Number,              // Position Y
      vx: Number,             // Velocity X
      vy: Number,             // Velocity Y
      rotation: Number,       // Current rotation angle (radians)
      rotationSpeed: Number,  // Rotation speed (radians/frame)
      size: String,           // 'large', 'medium', 'small'
      radius: Number,         // Collision radius: 50, 25, or 12
      vertices: Array,        // Array of {x, y} for procedural shape
      damage: Number,         // Damage on collision: base * materialMult
      hp: Number,             // Hit points: base * materialMult
      maxHp: Number,          // For damage visualization
      materialTier: Number,   // 0-4: Rock, Iron, Steel, Titanium, Tungsten
      color: String           // HSL color based on material tier
    }
  ],
  
  bullets: [
    {
      x: Number,              // Position X
      y: Number,              // Position Y
      vx: Number,             // Velocity X (10 pixels/frame normalized)
      vy: Number,             // Velocity Y
      damage: Number,         // Damage dealt (default 1)
      distanceTraveled: Number, // Pixels traveled (max 800)
      radius: Number          // Collision radius (3px)
    }
  ],
  
  particles: [
    {
      x: Number,              // Position X
      y: Number,              // Position Y
      vx: Number,             // Velocity X (2-5 pixels/frame)
      vy: Number,             // Velocity Y
      alpha: Number,          // Opacity (1.0 to 0.0)
      color: String,          // HSL color string
      lifetime: Number,       // Frames remaining (30 frames = 0.5 seconds)
      active: Boolean         // Object pool flag
    }
  ],
  
  weapons: [
    {
      x: Number,              // Position X
      y: Number,              // Position Y
      type: String,           // 'triple', 'rapid'
      expiryTime: Number,     // Timestamp when weapon should despawn
      radius: Number          // Collision radius (20px)
    }
  ],

  healthPickups: [            // New in Session 5
    {
      x: Number,
      y: Number,
      expiryTime: Number,
      radius: Number,         // 15px
      pulsePhase: Number      // For animation
    }
  ],
  
  stars: [                    // Parallax starfield
    {
      x: Number,
      y: Number,
      layer: Number,          // 1, 2, or 3
      brightness: Number,     // 40%, 60%, 80%
      size: Number            // 1-3 pixels
    }
  ],
  
  score: Number,              // Current score
  level: Number,              // Current level (starts at 1)
  highScores: [               // Loaded from localStorage
    { 
      score: Number,
      date: String 
    }
  ],
  
  gameState: String,          // 'menu', 'playing', 'paused', 'gameover'
  isMuted: Boolean,           // Audio mute state (persisted in localStorage)
  isMobile: Boolean,          // Platform detection flag
  speedMultiplier: Number,    // 0.5 + (level * 0.05)
  
  isLevelingUp: Boolean,
  levelStartTime: Number,
  bonusWavesSpawned: Number,
  bonusMessage: {
    text: String,
    alpha: Number,
    active: Boolean
  },
  
  nextWeaponSpawn: Number,
  nextHealthSpawn: Number,    // New in Session 5
  
  input: {
    up: Boolean,
    down: Boolean,
    left: Boolean,
    right: Boolean,
    shooting: Boolean,
    mouseX: Number,
    mouseY: Number,
    joystickX: Number,
    joystickY: Number
  },
  
  screenShake: {
    active: Boolean,
    amplitude: Number,
    frameCount: Number,
    offsetX: Number,
    offsetY: Number
  },
  
  lastKillTime: Number,
  comboActive: Boolean
}
```

---

## Entity Definitions

### Material Tiers (Every 5 Levels)

| Tier | Name     | Level Range | HP Mult | Speed Mult | Damage Mult | Sound Freq | Color HSL              |
|------|----------|-------------|---------|------------|-------------|------------|------------------------|
| 0    | Rock     | 1-4         | 1x      | 1.0x       | 1.0x        | 800 Hz     | hsl(30, 50%, 40%)      |
| 1    | Iron     | 5-9         | 3x      | 0.8x       | 1.5x        | 1200 Hz    | hsl(0, 10%, 50%)       |
| 2    | Steel    | 10-14       | 5x      | 0.6x       | 2.0x        | 1800 Hz    | hsl(200, 20%, 60%)     |
| 3    | Titanium | 15-19       | 8x      | 0.5x       | 2.5x        | 2400 Hz    | hsl(40, 30%, 70%)      |
| 4    | Tungsten | 20+         | 12x     | 0.4x       | 3.0x        | 3200 Hz    | hsl(0, 0%, 30%)        |

### Asteroid Sizes

| Size   | Radius | Base HP | Base Damage | Points | Split Count | Base Speed |
|--------|--------|---------|-------------|--------|-------------|------------|
| Large  | 50px   | 1 HP    | 2 HP        | 20     | 2 Medium    | 0.5-1.5 px/f |
| Medium | 25px   | 1 HP    | 1 HP        | 50     | 2 Small     | 0.5-1.5 px/f |
| Small  | 12px   | 1 HP    | 0.5 HP      | 100    | 0 (destroyed)| 0.5-1.5 px/f |

---

## Physics Formulas

### Player Movement
Acceleration, speed clamping (max 5), inertia decay (0.95), and smooth rotation toward target.

### Collision Detection
Standard distance-based circle collision.

### Screen Wrapping
Toroidal topology for all entities (except particles which can fade out).

---

## Color Palette (HSL)

### Game Entities
- **Player:** `hsl(200, 100%, 50%)` (cyan)
- **Asteroids:** Tier-based colors
- **Bullets:** `hsl(200, 100%, 70%)` (light cyan)
- **Weapon Pickups:** `hsl(120, 80%, 50%)` (neon green)
- **Health Pickups:** `hsl(0, 100%, 50%)` (red)

---

## Powerup System (Session 5 Update)

Powerups can now stack. Collecting both results in 6 bullets fired at double rate.

### Triple Shot (X3)
- Fires 3 bullets in spread pattern (-15°, 0°, +15°)
- Duration: 20 seconds

### Rapid Fire (X2)
- Fire rate: 20 bullets/second (50ms interval)
- Duration: 20 seconds

---

## Difficulty System (Session 6 Update)

The game features a selectable difficulty level that scales player stats and asteroid behavior.

| Level  | HP (Max) | Asteroid Speed | Fire Rate | Description |
| :---   | :---     | :---           | :---      | :---        |
| **Easy**   | 40       | 0.4x           | 80ms      | Relaxed exploration, high durability. |
| **Normal** | 25       | 0.5x           | 100ms     | The intended experience. |
| **Hard**   | 15       | 0.6x           | 120ms     | Aggressive asteroids, fragile ship. |
| **Expert** | 10       | 0.7x           | 150ms     | One mistake is usually fatal. |

- **Persistence**: Selected difficulty is saved in `localStorage` under `spaceHunterDifficulty`.
- **UI**: A slider on the main menu and after game over allows switching levels.
- **HUD Scaling**: The health bar automatically adjusts its 100% width based on the selected difficulty's max HP.

---

## Audio Specifications (Session 5 Update)

### Synth Voice (playVoice)
Replaces Web Speech Synthesis with melodic arpeggios.
- **good:** C5-E5-G5 (Major triad)
- **excellent:** C5-E5-G5-C6 (Arpeggio)
- **ohyes:** G4-C5-E5-G5
- **levelUp:** C4-E4-G4-C5
- **gameOver:** A4-F4-D4-A3 (Minor falling)

### Material-Based SFX
Asteroid hits and impacts use frequency scaling based on material tier (800Hz to 3200Hz).

---

## Spawn Rules

### Health Pickups
- Spawn every 30-40 seconds if current health < 25.
- Despawn after 15 seconds if not collected.

---

## Verification Equations

### Health Bar Width
`barWidth = (currentHealth / 25) * 200px`

---

**Document Status:** Complete  
**Last Updated:** 2026-01-24 (Session 5: Powerup stacking, Health system overhaul, Synth voice)  
**Version:** 2.0
