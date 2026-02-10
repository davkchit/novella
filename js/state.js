export let gameState = {
    currentEventId: 1,
    player: {
        health: 100,
        gold: 0,
        reputation: 0,
        reloadCount: 0,
        flags: {
            foundTrashGold: false,
            fakeFreedomVariant: 0,
            trustedNomad: false,
            trustedAnomaly: false,
        },
    },
};

export function setNewState(newState) {
    gameState = newState;
}
