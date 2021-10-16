'use strict';

const alertSound = new Audio('./audio/alert.wav');
const bgSound = new Audio('./audio/bg.mp3');
const bugSound = new Audio('./audio/bug_pull.mp3');
const carrotSound = new Audio('./audio/carrot_pull.mp3');
const winSound = new Audio('./audio/game_win.mp3');

export function playCarrot(volume = 0.5) {
  playAudio(carrotSound, volume);
}

export function playBug(volume = 0.5) {
  playAudio(bugSound, volume);
}

export function playAlert(volume = 0.5) {
  playAudio(alertSound, volume);
}

export function playWin(volume = 0.5) {
  playAudio(winSound, volume);
}

export function stopWin(volume = 0.5) {
  stopAudio(winSound, volume);
}

export function playBackground(volume = 0.5) {
  playAudio(bgSound, volume);
}

export function stopBackground(volume = 0.5) {
  stopAudio(bgSound, volume);
}


function playAudio(audio, volume) {
  audio.currentTime = 0;
  audio.volume = volume;
  audio.play();
}

function stopAudio(audio) {
  audio.pause();
}
