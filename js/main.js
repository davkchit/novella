import { renderNowEvent, renderGameMenu, render } from './render.js';
import { events } from './events.js';
import { initControls } from './controls.js';
import { ifHaveSavedState } from './localstorage.js';
import { playSound } from './music.js';

function init() {
    ifHaveSavedState();
    renderGameMenu();
    initControls();
}

init();
