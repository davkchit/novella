import { renderNowEvent } from './render.js';
import { events } from './events.js';
import { initControls } from './controls.js';
import { ifHaveSavedState } from './localstorage.js';
import { play } from './music.js';

function init() {
    play();
    ifHaveSavedState();
    renderNowEvent(events);
    initControls();
}

init();
