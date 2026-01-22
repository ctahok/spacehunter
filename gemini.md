# Void Hunter: Redux - Project Map

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
    rotation: Number,         // Angle in radians
    health: Number,           // HP (0-100)
    weapon: String,           // Current weapon type: 'single', 'triple', 'rapid'
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
      damage: Number          // Damage on collision: 2, 1, or 0.5
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
      initials: String,       // Optional player initials (3 chars)
      score: Number 
    }
  ],
  
  gameState: String,          // 'menu', 'playing', 'paused', 'gameover'
  isMuted: Boolean,           // Audio mute state (persisted in localStorage)
  isMobile: Boolean,          // Platform detection flag
  speedMultiplier: Number,    // 1 + (level * 0.1)
  
  // Input state
  input: {
    up: Boolean,
    down: Boolean,
    left: Boolean,
    right: Boolean,
    shooting: Boolean,
    mouseX: Number,
    mouseY: Number,
    joystickX: Number,        // -1 to 1 (mobile)
    joystickY: Number         // -1 to 1 (mobile)
  },
  
  // Screen shake
  screenShake: {
    active: Boolean,
    amplitude: Number,        // 5px initial
    frameCount: Number,       // 0 to 12
    offsetX: Number,
    offsetY: Number
  },
  
  // Combo system
  lastKillTime: Number,       // Timestamp of last asteroid kill
  comboActive: Boolean,       // True if < 2 seconds since last kill
  comboMultiplier: Number     // 1.5x when active
}
```

---

## Entity Definitions

### Asteroid Sizes

| Size   | Radius | Damage | Points | Split Count | Base Speed |
|--------|--------|--------|--------|-------------|------------|
| Large  | 50px   | 2 HP   | 20     | 2 Medium    | 0.5-1.5 px/f |
| Medium | 25px   | 1 HP   | 50     | 2 Small     | 0.5-1.5 px/f |
| Small  | 12px   | 0.5 HP | 100    | 0 (destroyed)| 0.5-1.5 px/f |

**Note:** Base speed is multiplied by `speedMultiplier` for actual velocity.

### Asteroid Splitting Math

**Large Asteroid Destruction:**
- Input: 1 Large asteroid at position (x, y) with velocity (vx, vy)
- Output: 2 Medium asteroids
- Math:
  - Child 1 velocity: `(vx * 0.5 + cos(120°), vy * 0.5 + sin(120°))`
  - Child 2 velocity: `(vx * 0.5 + cos(-120°), vy * 0.5 + sin(-120°))`
  - Rotation speed: `parent.rotationSpeed * 1.5`

**Medium Asteroid Destruction:**
- Input: 1 Medium asteroid
- Output: 2 Small asteroids
- Math: Same divergence formula as Large → Medium

**Small Asteroid Destruction:**
- Input: 1 Small asteroid
- Output: 20-30 particles (no child asteroids)
- Particle velocities: Random angle, magnitude 2-5 pixels/frame

---

## Physics Formulas

### Player Movement
```javascript
// Acceleration from input
if (input.up) player.vy -= 0.5;
if (input.down) player.vy += 0.5;
if (input.left) player.vx -= 0.5;
if (input.right) player.vx += 0.5;

// Speed clamping
const maxSpeed = 5;
const speed = Math.sqrt(player.vx ** 2 + player.vy ** 2);
if (speed > maxSpeed) {
  player.vx = (player.vx / speed) * maxSpeed;
  player.vy = (player.vy / speed) * maxSpeed;
}

// Inertia decay
player.vx *= 0.95;
player.vy *= 0.95;

// Position update
player.x += player.vx;
player.y += player.vy;

// Rotation to match movement
if (Math.abs(player.vx) > 0.1 || Math.abs(player.vy) > 0.1) {
  player.rotation = Math.atan2(player.vy, player.vx) + Math.PI / 2;
}
```

### Collision Detection
```javascript
function checkCollision(entity1, entity2) {
  const dx = entity1.x - entity2.x;
  const dy = entity1.y - entity2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const minDistance = entity1.radius + entity2.radius;
  return distance < minDistance;
}
```

### Screen Wrapping (Toroidal Topology)
```javascript
if (entity.x < 0) entity.x = canvas.width;
if (entity.x > canvas.width) entity.x = 0;
if (entity.y < 0) entity.y = canvas.height;
if (entity.y > canvas.height) entity.y = 0;
```

### Speed Scaling by Level
```javascript
speedMultiplier = 0.5 + (level * 0.05);
// Level 1 = 0.55x (gentle start)
// Level 5 = 0.75x (learning curve)
// Level 10 = 1.0x (normal speed)
// Level 20 = 1.5x (challenging)
// Level 50 = 3.0x (expert)
```

---

## Color Palette (HSL)

### Game Entities
- **Player:** `hsl(200, 100%, 50%)` (cyan)
- **Asteroids (base):** `hsl(30, 50%, 40%)` (brown-orange)
- **Asteroids (highlight):** `hsl(30, 60%, 55%)` (lighter orange)
- **Bullets:** `hsl(200, 100%, 70%)` (light cyan)
- **Explosions (core):** `hsl(40, 100%, 60%)` (orange-yellow)
- **Explosions (outer):** `hsl(20, 90%, 50%)` (red-orange)
- **Weapon Pickups:** `hsl(120, 80%, 50%)` (neon green)

### UI Elements
- **Background:** `hsl(240, 30%, 8%)` (deep space)
- **Health (high):** `hsl(120, 70%, 50%)` (green)
- **Health (medium):** `hsl(50, 100%, 50%)` (yellow)
- **Health (low):** `hsl(0, 80%, 50%)` (red)
- **HUD Text:** `hsl(0, 0%, 95%)` (off-white)
- **HUD Border:** `hsl(200, 100%, 50%)` (cyan)
- **Mute Button (active):** `hsl(200, 100%, 50%)` (cyan)
- **Mute Button (muted):** `hsl(0, 80%, 50%)` (red)

### Starfield Layers
- **Layer 1 (far):** `hsl(0, 0%, 40%)` (dim gray)
- **Layer 2 (mid):** `hsl(0, 0%, 60%)` (mid gray)
- **Layer 3 (near):** `hsl(0, 0%, 80%)` (bright gray)

---

## Weapon Types

### Single (Default)
- Fire rate: 10 bullets/second (100ms interval)
- Spread: 0 degrees (straight)
- Damage: 1

### Triple
- Fire rate: 10 bullets/second
- Spread: 3 bullets at -15°, 0°, +15° from aim direction
- Damage: 1 per bullet
- Duration: 20 seconds after pickup

### Rapid
- Fire rate: 20 bullets/second (50ms interval)
- Spread: 0 degrees
- Damage: 0.5 per bullet
- Duration: 20 seconds after pickup

---

## Audio Specifications

### Sound Effects (Web Audio API)

**Shooting:**
- Oscillator frequency: 200Hz
- Waveform: sine
- Duration: 50ms
- Envelope: Exponential decay (gain 1.0 → 0.0)

**Explosion:**
- Source: White noise (AudioBufferSourceNode)
- Filter: Low-pass at 800Hz
- Duration: 300ms
- Envelope: Exponential decay

**Level-Up:**
- Notes: C (261.63Hz), E (329.63Hz), G (392.00Hz)
- Timing: Sequential at 0ms, 100ms, 200ms
- Duration: 500ms total
- Waveform: triangle

### Voice Lines (Web Speech Synthesis)

**Phrases:**
1. "Oh, yes!" - Asteroid destroyed
2. "Well done, Cap!" - Level completed
3. "Excellent!" - Weapon collected

**Settings:**
- Voice: System default
- Rate: 1.0 (normal speed)
- Pitch: 1.0 (normal pitch)
- Volume: 1.0 (max)
- Check `speechSynthesis.speaking` before queuing

---

## Performance Targets

- **Frame Rate:** 60fps (16.67ms per frame)
- **Max Particles:** 300 active (object pooling)
- **Max Asteroids:** 50 simultaneous (level 47 cap)
- **Input Latency:** < 50ms from event to visual response
- **Memory:** < 100MB heap size

---

## Spawn Rules

### Asteroid Safe Spawn
```javascript
function isSafeSpawnPosition(x, y, player) {
  const dx = x - player.x;
  const dy = y - player.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance > 200; // Minimum 200px from player
}
```

### Weapon Spawn
- Frequency: Every 15 seconds
- Position: Random on-screen (not near edges)
- Despawn: After 10 seconds if not collected
- Only 1 weapon on screen at a time

---

## Verification Equations

### Level-to-Asteroid Count
```
asteroidCount = Math.min(3 + level, 15)
// Caps at 15 asteroids to prevent screen overflow
// Level 1: 4 asteroids
// Level 10: 13 asteroids
// Level 12+: 15 asteroids (capped)
```

### Score Calculation
```
basePoints = {large: 20, medium: 50, small: 100}
finalPoints = basePoints[size] * comboMultiplier
```

### Health Bar Width
```
barWidth = (currentHealth / 100) * 200px
```

### Screen Shake Decay
```
amplitude = 5 * (0.9 ^ frameCount)
// Frame 0: 5px
// Frame 6: 2.66px
// Frame 12: 1.42px → stop
```

---

**Document Status:** Complete  
**Last Updated:** 2026-01-21  
**Version:** 1.0
