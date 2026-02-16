import { setNewState } from './state.js';
import { gameState } from './state.js';

export function ifHaveSavedState() {
    if (localStorage.getItem('gameState')) {
        const savedState = JSON.parse(localStorage.getItem('gameState'));
        setNewState(savedState);
    }
}

export function setGameStateLS() {
    localStorage.setItem('gameState', JSON.stringify(gameState));
}