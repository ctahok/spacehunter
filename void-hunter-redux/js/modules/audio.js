// Audio Module - Handles Web Audio API and Speech Synthesis

let audioContext;
let isMuted = false;
let audioInitialized = false;

export function initAudio() {
    // Load mute state from localStorage
    const savedMuteState = localStorage.getItem('voidHunterMuted');
    if (savedMuteState === 'true') {
        isMuted = true;
        updateMuteButton();
    }
    
    // Setup mute button
    const muteBtn = document.getElementById('muteBtn');
    muteBtn.addEventListener('click', toggleMute);
    
    // Initialize AudioContext on first user interaction
    document.addEventListener('click', initAudioContext, { once: true });
    document.addEventListener('touchstart', initAudioContext, { once: true });
}

function initAudioContext() {
    if (!audioInitialized) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioInitialized = true;
        console.log('Audio Context initialized');
    }
}

export function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('voidHunterMuted', isMuted);
    updateMuteButton();
}

function updateMuteButton() {
    const muteBtn = document.getElementById('muteBtn');
    if (isMuted) {
        muteBtn.classList.add('muted');
        muteBtn.textContent = '🔇';
    } else {
        muteBtn.classList.remove('muted');
        muteBtn.textContent = '🔊';
    }
}

export function playShootSound() {
    if (isMuted || !audioInitialized) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 200;
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
}

export function playExplosionSound() {
    if (isMuted || !audioInitialized) return;
    
    const bufferSize = audioContext.sampleRate * 0.3;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate white noise
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    source.start(audioContext.currentTime);
}

export function playLevelUpSound() {
    if (isMuted || !audioInitialized) return;
    
    const notes = [261.63, 329.63, 392.00]; // C, E, G
    const duration = 0.15;
    
    notes.forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'triangle';
        oscillator.frequency.value = frequency;
        
        const startTime = audioContext.currentTime + (index * 0.1);
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    });
}

export function speakPhrase(text) {
    if (isMuted) return;
    
    if ('speechSynthesis' in window) {
        // Don't overlap speech
        if (speechSynthesis.speaking) {
            return;
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        speechSynthesis.speak(utterance);
    }
}
