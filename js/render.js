import { gameState } from './state.js';

export const dialogueOptions = document.querySelector('#options');
export const arrowr = document.querySelector('#arrowr');
export const arrowl = document.querySelector('#arrowl');
const dialogueText = document.querySelector('#eventText');
const backgroundImage = document.querySelector('#main');
const characterImage = document.querySelector('#character');
const chatacterName = document.querySelector('#speaker');
const healthStat = document.querySelector('.health_stat');
const goldStat = document.querySelector('.gold_stat');
const reputationStat = document.querySelector('.reputation_stat');

function renderButton(options, index, display) {
    const btn = document.createElement('button');
    btn.classList.add('buttonStyle');
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

export function render(character, background, dialogue, options, index = 0) {
    dialogueText.textContent = dialogue;
    chatacterName.textContent = character.name;
    characterImage.src = `imgs/characterImages/${character.sprite}.png`;
    backgroundImage.style.backgroundImage = `url("imgs/backgrounds/${background}.png")`;
    dialogueOptions.innerHTML = ``;
    healthStat.textContent = `Здоровье: ${gameState.player.health}`;
    goldStat.textContent = `Деньги: ${gameState.player.gold}`;
    reputationStat.textContent = `Репутация: ${gameState.player.reputation}`;
    if (window.innerWidth <= 768) {
        renderButton(options, index, 'block');
    } else {
        for (let i = 0; i < options.length; i++) {
            renderButton(options, i, 'none');
        }
    }
}

export function renderNowEvent(events) {
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
