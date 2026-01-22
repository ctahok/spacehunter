// Renderer Module - Handles all canvas drawing operations

let ctx;
let canvas;

export function initRenderer(canvasElement) {
    canvas = canvasElement;
    ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    return ctx;
}

export function clearCanvas(context, width, height) {
    context.fillStyle = 'hsl(240, 30%, 8%)';
    context.fillRect(0, 0, width, height);
}

export function generateStars(count, layer) {
    const stars = [];
    const brightness = layer === 1 ? 40 : (layer === 2 ? 60 : 80);
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * 800,
            y: Math.random() * 600,
            layer: layer,
            brightness: brightness,
            size: 1 + Math.random() * 2
        });
    }
    return stars;
}

export function renderStarfield(context, stars, speedMultiplier) {
    for (let star of stars) {
        context.fillStyle = `hsl(0, 0%, ${star.brightness}%)`;
        context.fillRect(star.x, star.y, star.size, star.size);
    }
}

export function updateStarfield(stars, speedMultiplier, canvasHeight) {
    for (let star of stars) {
        const layerSpeed = star.layer === 1 ? 0.5 : (star.layer === 2 ? 1.0 : 1.5);
        star.y += layerSpeed * speedMultiplier;
        if (star.y > canvasHeight) {
            star.y = 0;
            star.x = Math.random() * 800;
        }
    }
}

export function generateAsteroidVertices(radius) {
    const vertexCount = 8 + Math.floor(Math.random() * 5);
    const vertices = [];
    for (let i = 0; i < vertexCount; i++) {
        const angle = (i / vertexCount) * Math.PI * 2;
        const variation = 0.8 + Math.random() * 0.4;
        const r = radius * variation;
        vertices.push({
            x: Math.cos(angle) * r,
            y: Math.sin(angle) * r
        });
    }
    return vertices;
}

export function renderAsteroid(context, asteroid) {
    context.save();
    context.translate(asteroid.x, asteroid.y);
    context.rotate(asteroid.rotation);
    
    context.beginPath();
    context.moveTo(asteroid.vertices[0].x, asteroid.vertices[0].y);
    for (let i = 1; i < asteroid.vertices.length; i++) {
        context.lineTo(asteroid.vertices[i].x, asteroid.vertices[i].y);
    }
    context.closePath();
    
    const gradient = context.createRadialGradient(0, 0, 0, 0, 0, asteroid.radius);
    gradient.addColorStop(0, 'hsl(30, 60%, 55%)');
    gradient.addColorStop(1, 'hsl(30, 50%, 40%)');
    context.fillStyle = gradient;
    context.fill();
    
    context.strokeStyle = 'hsl(30, 50%, 30%)';
    context.lineWidth = 2;
    context.stroke();
    
    context.restore();
}

export function renderPlayer(context, player) {
    if (player.invulnerable && Math.floor(Date.now() / 100) % 2 === 0) {
        return; // Flash effect during invulnerability
    }
    
    context.save();
    context.translate(player.x, player.y);
    context.rotate(player.rotation);
    
    context.beginPath();
    context.moveTo(0, -15);
    context.lineTo(-10, 10);
    context.lineTo(10, 10);
    context.closePath();
    
    const color = player.invulnerable ? 'hsl(0, 80%, 50%)' : 'hsl(200, 100%, 50%)';
    context.fillStyle = color;
    context.fill();
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    
    context.restore();
}

export function renderBullet(context, bullet) {
    context.fillStyle = 'hsl(200, 100%, 70%)';
    context.beginPath();
    context.arc(bullet.x, bullet.y, 3, 0, Math.PI * 2);
    context.fill();
    
    context.shadowBlur = 10;
    context.shadowColor = 'hsl(200, 100%, 50%)';
    context.fill();
    context.shadowBlur = 0;
}

export function renderParticle(context, particle) {
    context.globalAlpha = particle.alpha;
    context.fillStyle = particle.color;
    context.beginPath();
    context.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
    context.fill();
    context.globalAlpha = 1.0;
}

export function renderWeapon(context, weapon) {
    context.fillStyle = 'hsl(120, 80%, 50%)';
    context.shadowBlur = 15;
    context.shadowColor = 'hsl(120, 80%, 50%)';
    context.beginPath();
    context.arc(weapon.x, weapon.y, weapon.radius, 0, Math.PI * 2);
    context.fill();
    context.shadowBlur = 0;
    
    context.fillStyle = 'hsl(0, 0%, 95%)';
    context.font = '12px Courier New';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(weapon.type.toUpperCase(), weapon.x, weapon.y);
}

export function updateHUD(gameState) {
    const healthBar = document.getElementById('healthBar');
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
    
    const healthPercent = Math.max(0, gameState.player.health) / 100;
    healthBar.style.width = (healthPercent * 100) + '%';
    
    scoreElement.textContent = gameState.score;
    levelElement.textContent = gameState.level;
}
