import { gameState } from './state.js';

export const dialogueOptions = document.querySelector('#options');
export const arrowr = document.querySelector('#arrowr');
export const arrowl = document.querySelector('#arrowl');
const gameMenu = document.querySelector('[data-screen="menu-screen"]');
export const settingsButton = document.querySelector(
    '[data-action="open-settings"]',
);
export const playButton = document.querySelector('[data-action="start-game"]');
export const gameSettings = document.querySelector(
    '[data-screen="settings-screen"]',
);
export const gameSettingsClose = document.querySelector(
    '[data-action="close-settings"]',
);
const dialogueText = document.querySelector('#eventText');
export const backgroundImage = document.querySelector('.gameScreen');
const characterImage = document.querySelector('#character');
const chatacterName = document.querySelector('#speaker');
const healthStat = document.querySelector('.health_stat');
const goldStat = document.querySelector('.gold_stat');
const reputationStat = document.querySelector('.reputation_stat');
const soundOnButton = document.querySelector('[data-role="sound-on"]');

export function renderGameMenu() {
    gameMenu.style.display = 'flex';
    backgroundImage.style.display = 'none';
    if (gameState.currentEventId > 1) {
        playButton.textContent = 'Continue';
    }
}

export function renderSettings(menuState, settingsState) {
    gameMenu.style.display = `${menuState}`;
    gameSettings.style.display = `${settingsState}`;
    backgroundImage.style.display = 'none';
    switch (gameState.settings.soundOn) {
        case true:
            soundOnButton.textContent = 'Выключить';
            break;
        case false:
            soundOnButton.textContent = 'Включить';
            break;
    }
}

function renderButton(options, index, display) {
    const btn = document.createElement('button');
    btn.classList.add('buttonStyle');
    btn.classList.add('choice-button');
    const button = options[index];
    btn.textContent = button.text;
    btn.dataset.gold = button.gold || 0;
    btn.dataset.health = button.health || 0;
    btn.dataset.reputation = button.reputation || 0;
    btn.dataset.next = button.next;
    dialogueOptions.appendChild(btn);
    arrowr.style.display = `${display}`;
    arrowl.style.display = `${display}`;
}

function setHudStat(element, label, value) {
    element.textContent = `${label}: ${value}`;
    element.dataset.value = value;
}

export function render(character, background, dialogue, options, index = 0) {
    dialogueText.textContent = dialogue;
    chatacterName.textContent = character.name;
    characterImage.src = `imgs/characterImages/${character.sprite}.png`;
    backgroundImage.style.backgroundImage = `url("imgs/backgrounds/${background}.png")`;
    dialogueOptions.innerHTML = ``;
    setHudStat(healthStat, 'Здоровье', gameState.player.health);
    setHudStat(goldStat, 'Деньги', gameState.player.gold);
    setHudStat(reputationStat, 'Репутация', gameState.player.reputation);
    if (window.innerWidth <= 768) {
        renderButton(options, index, 'flex');
    } else {
        for (let i = 0; i < options.length; i++) {
            renderButton(options, i, 'none');
        }
    }
}

export function renderNowEvent(events) {
    gameMenu.style.display = 'none';
    backgroundImage.style.display = 'flex';
    const findEvent = events.find(function (event) {
        return event.id === gameState.currentEventId;
    });
    if (!findEvent) {
        console.error(
            'SORRY! UR GAME HAS CRUSHED, PLESE NOTIFICATE ME @davckv ON TELEGRAM',
        );
    } else {
        render(
            findEvent.character,
            findEvent.background,
            findEvent.text,
            findEvent.options,
        );
    }
}

export function saveAndRender(events) {
    localStorage.setItem('gameState', JSON.stringify(gameState));
    renderNowEvent(events);
}
