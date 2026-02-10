import { gameState } from './state.js';
const dialogueText = document.querySelector('#eventText');

const conditions = {
    // 💰 random money on scavenging
    4: () => {
        if (!gameState.player.flags.foundTrashGold) {
            const gold = Math.floor(Math.random() * 300 + 50);
            dialogueText.textContent += `\nты находишь токены: ${gold}`;
            gameState.player.gold += gold;
            gameState.player.flags.foundTrashGold = true;
        }
    },

    // 🧠 fake freedom random event
    17: () => {
        const variant = gameState.player.flags.fakeFreedomVariant || 0;
        const texts = [
            'ты чувствуешь, что выбор был твоим.',
            'что-то в этом мире повторяется.',
            'ты уже видел этот момент.',
        ];
        dialogueText.textContent += '\n' + texts[variant];
        gameState.player.flags.fakeFreedomVariant = (variant + 1) % 3;
    },

    // 🔁 reload meta
    21: () => {
        if (gameState.player.reloadCount > 0) {
            dialogueText.textContent +=
                '\nномад смотрит на тебя подозрительно.';
        }
    },

    // 🧩 hidden meta hook
    99: () => {
        dialogueText.textContent += '\nмы знаем, что ты перезагружал.';
    },

    // 🧨 rep check soft bad ending
    30: () => {
        if (gameState.player.reputation < -20) {
            dialogueText.textContent += '\nты чувствуешь, что мир против тебя.';
        }
    },
};

export function gameConditions() {
    conditions[gameState.currentEventId]?.();
}
