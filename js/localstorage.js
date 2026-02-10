import { setNewState } from './state.js';

export function ifHaveSavedState() {
    if (localStorage.getItem('gameState')) {
        const savedState = JSON.parse(localStorage.getItem('gameState'));
        setNewState(savedState);
    }
}
