const playBtn = document.querySelector('.playBtn');
const playFont = playBtn.querySelector('.fas.fa-play');
const stopFont = playBtn.querySelector('.fas.fa-stop');
const timer = document.querySelector('.timer');
const displayState = document.querySelector('.winOrLose');
const state = displayState.querySelector('.state');

const defaultTime = 2;

let id;

playBtn.addEventListener('click', (event) => {
  if (event.target.dataset.show === 'playBtn') {
    event.target.dataset.show = 'stopBtn';
    playGame();
  } else {
    event.target.dataset.show = 'playBtn';
    replayGame();
  }
})

function setTimer(number) {
  const padNum = String(number).padStart(2, "0");
  timer.innerText = `00:${padNum}`;
}

function updateTime(number) {
  id = setInterval(() => {
    setTimer(number);
    number--;
    if (number < 0) {
      clearInterval(id);
      failGame();
    }
  }, 1000);
}

function playGame() {
  updateTime(defaultTime);
}

function replayGame() {
  clearInterval(id);
  setTimer(defaultTime);
  setState('Replay?')
}

function failGame() {
  clearInterval(id);
  setState('YOU LOST~');
}

function setState(sentence) {
  displayState.style.opacity = 1;
  state.innerText = `${sentence}`;
}