'use strict';

const playBtn = document.querySelector('.game__playBtn');
const playFont = playBtn.querySelector('.fas.fa-play');
const stopFont = playBtn.querySelector('.fas.fa-stop');
const timer = document.querySelector('.timer');
const popUpMenu = document.querySelector('.popUpMenu');
const reDoBtn = popUpMenu.querySelector('.reDo');
const state = popUpMenu.querySelector('.state');
const field = document.querySelector('.field');
const counter = document.querySelector('.counter');
const fieldRect = field.getBoundingClientRect();

const alertSound = new Audio('./audio/alert.wav');
const bgSound = new Audio('./audio/bg.mp3');
const bugSound = new Audio('./audio/bug_pull.mp3');
const carrotSound = new Audio('./audio/carrot_pull.mp3');
const winSound = new Audio('./audio/game_win.mp3');

const CARROT_SIZE = 80;
const defaultTime = 10;
const PLAYBUTTON = "playBtn";
const STOPBUTTON = "stopBtn";
const SHOW = "show";
const CARROT = "carrot";
const BUG = "bug";
const imgsArr = [];

let id;


function makeElements(element) {
  const { X, Y } = makeRandomPisition();
  const child = document.createElement('img');
  child.src = `./img/${element}.png`;
  child.setAttribute('class', element);
  child.classList.add('hidden');
  child.style.left = `${X}px`;
  child.style.top = `${Y}px`;
  field.style.opacity = 0;
  imgsArr.push(child);
  return child;
}

// init
function inInt() {
  for (let i = 0; i < 10; i++) {
    const carrot = makeElements(CARROT);
    field.appendChild(carrot);
    const bug = makeElements(BUG);
    field.appendChild(bug);
  }
}

inInt();

function makeRandomPisition() {
  let X = Math.floor(Math.random() * (fieldRect.right - CARROT_SIZE - fieldRect.x));
  let Y = Math.floor(Math.random() * (fieldRect.bottom - CARROT_SIZE - fieldRect.y));
  return {
    X,
    Y
  }
}

function setImgsHidden(isHidden) {
  imgsArr.forEach(img => {
    if (isHidden) {
      img.classList.add('hidden');  
    } else {
      img.style.opacity = 1;
      img.classList.remove('hidden');
    }    
  })
}

function rePositionImgs() {
  const imgs = [].slice.call(field.children);
  imgs.forEach(img => {
    const { X, Y } = makeRandomPisition();
    img.style.left = `${X}px`;
    img.style.top = `${Y}px`;
  });
}

playBtn.addEventListener('click', (event) => {
  if (event.target.dataset.show === PLAYBUTTON) {    
    playGame();
  } else {
    restartGame("Replay?");
  }
})

reDoBtn.addEventListener('click', (event) => {
  playGame();
  setPopUpMenu(0);
  rePositionImgs();
  setImgsHidden(false);
  countCarrot = 10;
  counter.innerText = `${countCarrot}`;
  stopAudio(winSound);
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
      restartGame("YOU LOST~");
      playAudio(bugSound);
    }
  }, 1000);
}

function playGame() {  
  setPlayBtnDisabled(false, STOPBUTTON);  
  updateTime(defaultTime);
  setTimer(defaultTime);
  setImgsHidden(false);
  setPopUpMenu(false, 0);
  setField(true);
  playAudio(bgSound);
}

function restartGame(notice) {
  setPlayBtnDisabled(true, PLAYBUTTON);  
  clearInterval(id);
  setState(notice);
  setField(false);
  setImgsHidden(true);
  stopAudio(bgSound);
}

function setPlayBtnDisabled(isDisabled, show) {
  if (isDisabled) {
    playBtn.classList.add('disabled');
    playBtn.dataset.show = show;
    playBtn.style.opacity = 0;
  } else {    
    playBtn.classList.remove('disabled');
    playBtn.dataset.show = show;
    playBtn.style.opacity = 1;
  }
}

function setState(sentence) {
  setPopUpMenu(true, 1);
  state.innerText = `${sentence}`;
  playAudio(alertSound);
}

function setPopUpMenu(isShow, opacity) {
  isShow ? popUpMenu.classList.add(SHOW) : popUpMenu.classList.remove(SHOW);
  popUpMenu.style.opacity = opacity;
}

function setField(isShow) {
  if (!isShow) {
    field.classList.remove(SHOW);
    return;
  }
  field.style.opacity = 0;
  setTimeout(() => {
    field.classList.add(SHOW);
    field.style.opacity = 1;
  }, 1000);
}

let countCarrot = 10;
field.addEventListener('click', (event) => {
  const target = event.target;
  if (target.matches('.carrot')) {
    target.style.opacity = 0;
    target.classList.add('hidden');
    countCarrot--;
    counter.innerText = `${countCarrot}`;
    playAudio(carrotSound, 1);
    if (countCarrot === 0) {
      restartGame("YOU WIN!!");
      playAudio(winSound, 0.4);
    }
  }
  else if (target.matches('.bug')) {
    restartGame("YOU LOST~");
    playAudio(bugSound);
  }
})

function playAudio(audio, volume = 0.5) {
  audio.currentTime = 0;
  audio.volume = volume;
  audio.play();
  console.log(audio.volume)
}

function stopAudio(audio) {
  audio.pause();
}
