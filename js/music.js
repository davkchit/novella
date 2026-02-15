const mainSound = new Audio('music/mainSound.mp3');
mainSound.volume = 0.1;
mainSound.autoplay = true;

export function play() {
    mainSound.play();
}

export function stop() {
    mainSound.pause();
    audio.currentTime = 0;
}
