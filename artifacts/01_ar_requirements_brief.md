# Requirements Brief - Void Hunter: Redux

## Project Overview

**Project Name:** Void Hunter: Redux  
**Type:** Browser-based spacecraft shooter game  
**Platform:** Web (Desktop + Mobile)  
**Deployment Target:** GitHub Pages (static site)

---

## Executive Summary

"Void Hunter: Redux" is a fast-paced, arcade-style spacecraft shooter that runs entirely in the browser. Players control a small, stylish spacecraft navigating through an asteroid field, collecting different weapons, and surviving progressively challenging levels. The game emphasizes "juice" (screen shake, particles, satisfying audio) and seamless cross-platform compatibility.

---

## Core Requirements

### 1. Gameplay Mechanics

**Player Spacecraft:**
- Small, visually distinct craft rendered procedurally
- Moves with inertia-based physics (drifting effect)
- Collision with asteroids causes damage
- Has health pool (starts at 100, decreases based on asteroid size)

**Weapons System:**
- Guns appear/disappear randomly on screen as collectibles
- Different calibers and spread patterns (e.g., single shot, triple spread, rapid fire)
- Mouse/Touch controls aiming and firing

**Enemies (Asteroids):**
- Realistic, textured appearance (procedurally generated)
- Three sizes: Large (radius 50), Medium (radius 25), Small (radius 12)
- Split behavior: Large → 2 Medium → 2 Small each → Destroyed
- Rotation animation (speed increases with level)
- Damage scaling: Larger asteroids deal more damage

**Progression System:**
- Level-based (level up after clearing all asteroids)
- Difficulty scaling:
  - Increased game speed
  - Faster asteroid velocity
  - Faster asteroid rotation
  - Higher spawn rate

### 2. Platform-Specific Controls

**Desktop (PC):**
- **Movement:** WASD or Arrow Keys
- **Aiming:** Mouse position
- **Shooting:** Left mouse click (hold for auto-fire)

**Mobile:**
- **Detection:** Automatic via User Agent
- **Movement:** Virtual Joystick (left side, semi-transparent)
- **Shooting:** Fire Button (right side)
- **UI Adaptation:** Larger touch targets, responsive HUD

### 3. Audio Requirements

**Sound Effects (Web Audio API):**
- Synthesized shooting sounds (oscillator-based)
- Explosion sounds (noise + gain envelope)
- Level-up chime

**Voice Lines (Web Speech Synthesis API):**
- Enthusiastic encouragement: "Oh, yes!", "Well done, Cap!", "Excellent!"
- Triggered on specific events (asteroid destroyed, level up, weapon collected)

**Mute Toggle:**
- Distinct button in UI
- Mutes ALL audio (SFX + voice)
- Persists state in localStorage

### 4. Visual "Juice" & Polish

**Particle Effects:**
- 15-30 particles per asteroid explosion
- Randomized velocity vectors
- Fade-out animation (alpha decay)

**Screen Shake:**
- Triggered on large asteroid collisions
- 5px amplitude, 200ms duration

**Background:**
- Parallax starfield (3 layers at different speeds)
- Creates sense of movement and depth

**HUD (Heads-Up Display):**
- Health bar (visual indicator with color gradient: green → yellow → red)
- Score counter
- Level indicator
- High score display

### 5. Data Persistence

**High Score Table:**
- Stored in browser's localStorage
- Top 5 scores with optional player initials
- Displayed on game over screen

---

## Technical Constraints

### Deployment
- Must be a static site (HTML/CSS/JS only)
- Compatible with GitHub Pages hosting
- No server-side dependencies
- Minified code for production

### Performance
- Target: Steady 60fps on modern browsers
- Optimize collision detection (spatial partitioning if needed)
- Object pooling for particles

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Fallback error message for unsupported browsers

---

## Success Criteria

1. **Playability:** Game runs smoothly at 60fps on target browsers
2. **Cross-Platform:** Seamless experience on desktop and mobile
3. **Polish:** Visual effects (particles, shake) enhance satisfaction
4. **Audio:** SFX and voice lines respond correctly, mute toggle works
5. **Progression:** Level difficulty scales noticeably
6. **Deployment:** Successfully hosts on GitHub Pages with minimal setup

---

## Out of Scope (v1.0)

- Multiplayer functionality
- Leaderboard (online server)
- Power-ups beyond weapon pickups
- Boss fights
- Procedurally generated music
- Social media sharing

---

## Skills Loaded

Based on `/artifacts/00_tech_stack_rules.md`:
- HTML5_Canvas_Mastery
- Web_Audio_API_Proficiency
- Mobile_Touch_Event_Handling
- Procedural_Graphics_Generation
- Game_Loop_Architecture

---

## Next Agent Handover

```json
{
  "next_agent_role": "Product Manager",
  "source_artifact": "/artifacts/00_tech_stack_rules.md",
  "system_instruction": "Using the Requirements Brief and Tech Stack Rules, create a detailed PRD in /artifacts/02_pm_prd.md. You MUST include a 'Vibe Specification' section defining the visual personality, color palette (HSL values), typography, and UI aesthetic. Define user stories with acceptance criteria. Ensure all requirements from space_craftgame.md are captured.",
  "validation_status": "APPROVED"
}
```
