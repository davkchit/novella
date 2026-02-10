import { events } from './events.js';
import { gameState } from './state.js';
import { render, saveAndRender } from './render.js';
import { gameConditions } from './gameConditions.js';
import { dialogueOptions, arrowl, arrowr } from './render.js';

export function initControls() {
    dialogueOptions.addEventListener('click', function (ev) {
        if (ev.target.dataset.next) {
            let gold = ev.target.dataset.gold;
            let health = ev.target.dataset.health;
            let next = ev.target.dataset.next;
            let reputation;
            if (ev.target.dataset.reputation) {
                reputation = ev.target.dataset.reputation;
            } else {
                reputation = 0;
            }
            gameState.currentEventId = Number(next);
            gameState.player.gold += Number(gold);
            gameState.player.health += Number(health);
            gameState.player.reputation += Number(reputation);
            if (
                gameState.player.health <= 0 ||
                gameState.player.reputation <= -50
            ) {
                gameState.currentEventId = 'DEATH__WINDOW';
                saveAndRender(events);
                gameConditions();
                gameState.player.reputation = 0;
                gameState.player.health = 100;
            } else {
                saveAndRender(events);
                gameConditions();
            }
        }
    });

    arrowl.addEventListener('click', function () {
        const findEvent = events.find(function (event) {
            return event.id === gameState.currentEventId;
        });
        let options = findEvent.options;
        let button = document.querySelector('.buttonStyle');
        for (let i = 0; i < options.length; i++) {
            if (options[i].text === button.textContent && i > 0) {
                render(
                    findEvent.character,
                    findEvent.background,
                    findEvent.text,
                    findEvent.options,
                    i - 1,
                );
            }
        }
    });

    arrowr.addEventListener('click', function () {
        const findEvent = events.find(function (event) {
            return event.id === gameState.currentEventId;
        });
        let options = findEvent.options;
        let button = document.querySelector('.buttonStyle');
        for (let i = 0; i < options.length; i++) {
            if (
                options[i].text === button.textContent &&
                i < options.length - 1
            ) {
                render(
                    findEvent.character,
                    findEvent.background,
                    findEvent.text,
                    findEvent.options,
                    i + 1,
                );
            }
        }
    });
}
