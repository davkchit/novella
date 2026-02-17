import { events } from './events.js';
import { gameState, setNewState } from './state.js';
import { render, saveAndRender, renderNowEvent, renderGameMenu} from './render.js';
import { gameConditions } from './gameConditions.js';
import {
    dialogueOptions,
    arrowl,
    arrowr,
    settingsButton,
    playButton,
    gameSettingsClose,
    renderSettings,
} from './render.js';
import { playSound } from './music.js';
import { setGameStateLS } from './localstorage.js';

const menuToggle = document.querySelector('[data-action="menu-toggle"]');
const soundOnButton = document.querySelector('[data-role="sound-on"]');
const gameScreenMenu = document.querySelector('[data-screen="game-menu"]');
const openMenu = document.querySelector('[data-action="open-menu"]');
const openSettingss = document.querySelector('[data-action="open-settingss"]');

export function initControls() {
    openMenu.addEventListener('click', () => {
        renderGameMenu()
    });

    openSettingss.addEventListener('click', () => {
        renderSettings('none', 'flex');
    });

    menuToggle.addEventListener('click', function (ev) {
        gameScreenMenu.classList.toggle('gameScreen__menu--open');
        menuToggle.classList.toggle('gameScreen__menu-toggle--open');
    });

    soundOnButton.addEventListener('click', function (ev) {
        switch (gameState.settings.soundOn) {
            case true:
                gameState.settings.soundOn = false;
                soundOnButton.textContent = 'Включить';
                break;
            case false:
                gameState.settings.soundOn = true;
                soundOnButton.textContent = 'Выключить';
                break;
        }
        setGameStateLS();
        playSound();
    });

    playButton.addEventListener('click', function (ev) {
        renderNowEvent(events);
        playSound();
    });

    settingsButton.addEventListener('click', function (ev) {
        renderSettings('none', 'flex');
    });

    gameSettingsClose.addEventListener('click', function (ev) {
        renderSettings('flex', 'none');
    });

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
        let button = document.querySelector('.choice-button');
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
