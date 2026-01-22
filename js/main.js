// Main Game Loop - Void Hunter: Redux

import { initRenderer, clearCanvas, generateStars, renderStarfield, updateStarfield, 
         generateAsteroidVertices, renderAsteroid, renderPlayer, renderBullet, 
         renderParticle, renderWeapon, updateHUD } from './modules/renderer.js';
import { updatePlayer, updateAsteroids, updateBullets, updateParticles, 
         checkCollision, splitAsteroid, createParticles } from './modules/physics.js';
import { initInput, isMobileDevice, getInput } from './modules/input.js';
import { initAudio, playShootSound, playExplosionSound, playLevelUpSound, speakPhrase } from './modules/audio.js';

// Initialize canvas
const canvas = document.getElementById('gameCanvas');
const ctx = initRenderer(canvas);

// Initialize input
const input = initInput(canvas);

// Initialize audio
initAudio();

// Create particle pool
const particlePool = [];
for (let i = 0; i < 300; i++) {
    particlePool.push({
        x: 0, y: 0, vx: 0, vy: 0, alpha: 0, color: '', lifetime: 0, active: false
    });
}

// Initialize starfield
const stars = [
    ...generateStars(50, 1),
    ...generateStars(100, 2),
    ...generateStars(150, 3)
];

// Game State
const GameState = {
    player: {
        x: 400,
        y: 300,
        vx: 0,
        vy: 0,
        rotation: 0,
        health: 100,
        weapon: 'single',
        weaponExpiry: 0,
        invulnerable: false,
        invulnerableTimer: 0,
        radius: 15
    },
    asteroids: [],
    bullets: [],
    particles: particlePool,
    weapons: [],
    stars: stars,
    score: 0,
    level: 1,
    gameState: 'playing',
    speedMultiplier: 0.5,
    lastKillTime: 0,
    comboActive: false,
    screenShake: {
        active: false,
        amplitude: 0,
        frameCount: 0,
        offsetX: 0,
        offsetY: 0
    },
    lastShootTime: 0,
    shootInterval: 100,
    nextWeaponSpawn: Date.now() + 15000
};

// Initialize first wave
spawnWave();

// Game Loop
let lastTime = 0;
let frameCount = 0;

function gameLoop(currentTime) {
    const deltaTime = Math.min(currentTime - lastTime, 33);
    lastTime = currentTime;
    frameCount++;
    
    if (GameState.gameState === 'playing') {
        // Update
        updatePlayer(GameState.player, input, canvas.width, canvas.height);
        updateAsteroids(GameState.asteroids, GameState.speedMultiplier, canvas.width, canvas.height);
        updateBullets(GameState.bullets, canvas.width, canvas.height);
        updateParticles(GameState.particles);
        updateStarfield(GameState.stars, GameState.speedMultiplier, canvas.height);
        updateWeapons();
        updateShooting(currentTime);
        checkCollisions();
        checkLevelComplete();
        updateScreenShake();
    }
    
    // Render
    ctx.save();
    
    if (GameState.screenShake.active) {
        ctx.translate(GameState.screenShake.offsetX, GameState.screenShake.offsetY);
    }
    
    clearCanvas(ctx, canvas.width, canvas.height);
    renderStarfield(ctx, GameState.stars, GameState.speedMultiplier);
    
    for (let asteroid of GameState.asteroids) {
        renderAsteroid(ctx, asteroid);
    }
    
    for (let bullet of GameState.bullets) {
        renderBullet(ctx, bullet);
    }
    
    for (let weapon of GameState.weapons) {
        renderWeapon(ctx, weapon);
    }
    
    renderPlayer(ctx, GameState.player);
    
    for (let particle of GameState.particles) {
        if (particle.active) {
            renderParticle(ctx, particle);
        }
    }
    
    ctx.restore();
    
    updateHUD(GameState);
    
    // FPS counter (every 60 frames)
    if (frameCount % 60 === 0) {
        const fps = (1000 / deltaTime).toFixed(1);
        // console.log(`FPS: ${fps}`);
    }
    
    requestAnimationFrame(gameLoop);
}

function spawnWave() {
    const count = Math.min(3 + GameState.level, 15);
    
    for (let i = 0; i < count; i++) {
        let x, y;
        let attempts = 0;
        
        do {
            const edge = Math.floor(Math.random() * 4);
            if (edge === 0) { x = Math.random() * canvas.width; y = 0; }
            else if (edge === 1) { x = canvas.width; y = Math.random() * canvas.height; }
            else if (edge === 2) { x = Math.random() * canvas.width; y = canvas.height; }
            else { x = 0; y = Math.random() * canvas.height; }
            
            attempts++;
        } while (!isSafeSpawn(x, y) && attempts < 20);
        
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 1;
        
        GameState.asteroids.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: 0.01 + Math.random() * 0.02,
            size: 'large',
            radius: 50,
            vertices: generateAsteroidVertices(50),
            damage: 2
        });
    }
}

function isSafeSpawn(x, y) {
    const dx = x - GameState.player.x;
    const dy = y - GameState.player.y;
    return Math.sqrt(dx * dx + dy * dy) > 200;
}

function updateShooting(currentTime) {
    if (!input.shooting) return;
    
    const interval = GameState.player.weapon === 'rapid' ? 50 : 100;
    
    if (currentTime - GameState.lastShootTime > interval) {
        shootBullet();
        GameState.lastShootTime = currentTime;
    }
}

function shootBullet() {
    const targetX = isMobileDevice() ? GameState.player.x + Math.cos(GameState.player.rotation - Math.PI / 2) * 100 : input.mouseX;
    const targetY = isMobileDevice() ? GameState.player.y + Math.sin(GameState.player.rotation - Math.PI / 2) * 100 : input.mouseY;
    
    if (GameState.player.weapon === 'triple') {
        // Fire 3 bullets in spread pattern
        const angles = [-15, 0, 15];
        for (let angleOffset of angles) {
            spawnBullet(targetX, targetY, angleOffset * Math.PI / 180);
        }
    } else {
        spawnBullet(targetX, targetY, 0);
    }
    
    playShootSound();
}

function spawnBullet(targetX, targetY, angleOffset) {
    const dx = targetX - GameState.player.x;
    const dy = targetY - GameState.player.y;
    const angle = Math.atan2(dy, dx) + angleOffset;
    const speed = 10;
    
    GameState.bullets.push({
        x: GameState.player.x,
        y: GameState.player.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        damage: 1,
        distanceTraveled: 0,
        radius: 3
    });
}

function checkCollisions() {
    // Player vs Asteroids
    if (!GameState.player.invulnerable) {
        for (let asteroid of GameState.asteroids) {
            if (checkCollision(GameState.player, asteroid)) {
                GameState.player.health -= asteroid.damage;
                GameState.player.invulnerable = true;
                GameState.player.invulnerableTimer = 60;
                triggerScreenShake();
                createParticles(asteroid.x, asteroid.y, 10, GameState.particles);
                playExplosionSound();
                
                if (GameState.player.health <= 0) {
                    gameOver();
                }
            }
        }
    }
    
    // Bullets vs Asteroids
    for (let i = GameState.bullets.length - 1; i >= 0; i--) {
        const bullet = GameState.bullets[i];
        let hit = false;
        
        for (let j = GameState.asteroids.length - 1; j >= 0; j--) {
            const asteroid = GameState.asteroids[j];
            
            if (checkCollision(bullet, asteroid)) {
                hit = true;
                
                // Award points
                const points = asteroid.size === 'large' ? 20 : (asteroid.size === 'medium' ? 50 : 100);
                addScore(points);
                
                // Create particles
                const particleCount = asteroid.size === 'large' ? 25 : (asteroid.size === 'medium' ? 20 : 15);
                createParticles(asteroid.x, asteroid.y, particleCount, GameState.particles);
                
                // Split or destroy
                const children = splitAsteroid(asteroid, generateAsteroidVertices);
                GameState.asteroids.splice(j, 1);
                GameState.asteroids.push(...children);
                
                playExplosionSound();
                
                if (children.length === 0) {
                    speakPhrase('Oh, yes!');
                }
                
                break;
            }
        }
        
        if (hit) {
            GameState.bullets.splice(i, 1);
        }
    }
    
    // Player vs Weapons
    for (let i = GameState.weapons.length - 1; i >= 0; i--) {
        const weapon = GameState.weapons[i];
        
        if (checkCollision(GameState.player, weapon)) {
            GameState.player.weapon = weapon.type;
            GameState.player.weaponExpiry = Date.now() + 20000;
            GameState.weapons.splice(i, 1);
            speakPhrase('Excellent!');
        }
    }
}

function addScore(points) {
    const now = Date.now();
    
    if (now - GameState.lastKillTime < 2000) {
        points = Math.floor(points * 1.5);
        GameState.comboActive = true;
    } else {
        GameState.comboActive = false;
    }
    
    GameState.score += points;
    GameState.lastKillTime = now;
}

function checkLevelComplete() {
    if (GameState.asteroids.length === 0) {
        GameState.level++;
        GameState.speedMultiplier = 0.5 + (GameState.level * 0.05);
        playLevelUpSound();
        speakPhrase('Well done, Cap!');
        
        setTimeout(() => {
            spawnWave();
        }, 3000);
    }
}

function updateWeapons() {
    // Check weapon expiry
    if (GameState.player.weaponExpiry > 0 && Date.now() > GameState.player.weaponExpiry) {
        GameState.player.weapon = 'single';
        GameState.player.weaponExpiry = 0;
    }
    
    // Remove expired weapon pickups
    for (let i = GameState.weapons.length - 1; i >= 0; i--) {
        if (Date.now() > GameState.weapons[i].expiryTime) {
            GameState.weapons.splice(i, 1);
        }
    }
    
    // Spawn new weapon pickup
    if (GameState.weapons.length === 0 && Date.now() > GameState.nextWeaponSpawn) {
        spawnWeapon();
        GameState.nextWeaponSpawn = Date.now() + 15000;
    }
}

function spawnWeapon() {
    const margin = 100;
    const x = margin + Math.random() * (canvas.width - margin * 2);
    const y = margin + Math.random() * (canvas.height - margin * 2);
    const types = ['triple', 'rapid'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    GameState.weapons.push({
        x: x,
        y: y,
        type: type,
        expiryTime: Date.now() + 10000,
        radius: 20
    });
}

function triggerScreenShake() {
    GameState.screenShake.active = true;
    GameState.screenShake.amplitude = 5;
    GameState.screenShake.frameCount = 0;
}

function updateScreenShake() {
    if (!GameState.screenShake.active) return;
    
    GameState.screenShake.frameCount++;
    const amplitude = 5 * Math.pow(0.9, GameState.screenShake.frameCount);
    
    if (amplitude < 0.5 || GameState.screenShake.frameCount > 12) {
        GameState.screenShake.active = false;
        GameState.screenShake.offsetX = 0;
        GameState.screenShake.offsetY = 0;
    } else {
        GameState.screenShake.offsetX = (Math.random() - 0.5) * amplitude * 2;
        GameState.screenShake.offsetY = (Math.random() - 0.5) * amplitude * 2;
    }
}

function gameOver() {
    GameState.gameState = 'gameover';
    saveHighScore();
    showGameOverScreen();
}

function saveHighScore() {
    let highScores = JSON.parse(localStorage.getItem('voidHunterHighScores') || '[]');
    highScores.push({ score: GameState.score, date: new Date().toLocaleDateString() });
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 5);
    localStorage.setItem('voidHunterHighScores', JSON.stringify(highScores));
}

function showGameOverScreen() {
    const gameOverScreen = document.getElementById('gameOverScreen');
    const finalScore = document.getElementById('finalScore');
    const highScoresDiv = document.getElementById('highScores');
    
    finalScore.textContent = GameState.score;
    
    const highScores = JSON.parse(localStorage.getItem('voidHunterHighScores') || '[]');
    let html = '<h2>High Scores</h2><ol>';
    for (let entry of highScores) {
        html += `<li>${entry.score} - ${entry.date}</li>`;
    }
    html += '</ol>';
    highScoresDiv.innerHTML = html;
    
    gameOverScreen.classList.remove('hidden');
}

// Restart button
document.getElementById('restartBtn').addEventListener('click', () => {
    location.reload();
});

// Start game loop
requestAnimationFrame(gameLoop);

console.log('Void Hunter: Redux - Game Started');
console.log('Platform:', isMobileDevice() ? 'Mobile' : 'Desktop');
