import { gameState } from './state.js';

const mainSound = new Audio('music/mainSound.mp3');
mainSound.volume = gameState.settings.musicVolume;
mainSound.loop = true;

export function playSound() {
    const soundOn = gameState.settings.soundOn
    switch (soundOn) {
        case true:
            mainSound.play();
            break;
        case false:
            mainSound.pause();
            break;
    }
}

export function stop() {
    mainSound.pause();
    mainSound.currentTime = 0;
}
