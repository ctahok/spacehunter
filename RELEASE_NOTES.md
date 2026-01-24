# 🚀🚀🚀 Space Hunter 💫⭐✨
### *Version 1.15 - The "Static build" Immersion Update*

We’ve overhauled the core engine to move beyond the "Void" and into a high-stakes, arcade-perfect experience. This update focuses on **stackable powerups**, **procedural audio**, and **mobile-first immersion**.

---

### 🎛️ DYNAMIC DIFFICULTY ENGINE
Choose your fate with the new **Persistence Slider**. Your settings are saved in the ship's computer (`localStorage`) and scale every aspect of the mission:
*   **Easy**: 40 HP, high fire rate, slow asteroids, and generous healing (80%).
*   **Normal**: The intended survival experience.
*   **Hard**: Fragile systems and aggressive asteroid materials.
*   **Expert**: 10 HP. One mistake is usually your last.

### 🔫 POWERUP STACKING (X2 + X3)
We've broken the weapon limit! Collecting a new powerup no longer replaces your current one.
*   **Total Chaos**: Combine **Rapid Fire (X2)** and **Triple Shot (X3)** to fire a devastating 6-bullet spread at double the speed.
*   **Visual HUD**: New glowing icons with real-time countdown timers pulse when energy is low.

### ❤️ SMART SURVIVAL SYSTEM
Survival is now an art. We've reduced max health to **25 HP** to increase tension, supported by a new healing logic:
*   **Top-Up Healing**: Health crosses now restore a percentage of your **missing health** (scaled by difficulty).
*   **Safety Cap**: Healing will never leave you at 100% if you were damaged, maintaining the "damaged but alive" vibe.
*   **Critical Alert**: The health bar now pulses with a red neon glow and expands when you drop below 20% HP.

### 🎹 PROCEDURAL SYNTH AUDIO
The robotic voice synthesis has been replaced by a custom **Web Audio Synth Engine**:
*   **Engine Hum**: A reactive, filtered sawtooth hum that increases in frequency and volume based on your ship's velocity.
*   **Melodic Feedback**: High-definition arpeggios now signal mission events (Good, Excellent, Level Up, and Game Over).

### 📱 MOBILE LANDSCAPE OPTIMIZATION
The ultimate mobile shooter experience:
*   **Ghost Controls**: The joystick now features a "Ghost Border" (0.1 opacity) to keep the screen clear for incoming threats.
*   **Instant Response**: Upgraded all buttons to `pointerdown` logic, removing the 300ms mobile touch delay.
*   **Immersive Mode**: Automatic **Forced Fullscreen** upon mission start for total focus.
*   **Compact UI**: HUD and menus automatically shrink and shift to the corners in landscape mode.
*   **Mission Control**: Added a **Full Screen Toggle** next to the Mute button for instant immersion switching.

### 🏆 LEGACY & LEADERBOARDS
*   **Initials Input**: Save your Top 5 records with a classic 3-character tag.
*   **Seamless Migration**: All your legacy "Void Hunter" high scores and settings have been automatically moved to the new "Space Hunter" database.

---

### 🛠️ UNDER THE HOOD
*   Folder renamed to `spacehunter-static` for better web indexing.
*   Optimized procedural vertex generation for high-tier asteroid materials.
*   Cache-busting architecture updated to **v15**.

---

**Space Hunter - Build your legacy in the stars.**
