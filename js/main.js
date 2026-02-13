import { renderNowEvent, renderGameMenu, render } from './render.js';
import { events } from './events.js';
import { initControls } from './controls.js';
import { ifHaveSavedState } from './localstorage.js';
import { play } from './music.js';

function init() {
    play();
    ifHaveSavedState();
    renderGameMenu();
    initControls();
}

init();
