const playBtn = document.querySelector('.playBtn');
const playFont = playBtn.querySelector('.fas.fa-play');
const stopFont = playBtn.querySelector('.fas.fa-stop');
const timer = document.querySelector('.timer');
const displayState = document.querySelector('.winOrLose');
const reDoBtn = displayState.querySelector('.reDo');
const state = displayState.querySelector('.state');
const field = document.querySelector('.field');
const counter = document.querySelector('.counter');
const fieldRect = field.getBoundingClientRect();

const defaultTime = 10;
const PLAYBUTTON = "playBtn";
const STOPBUTTON = "stopBtn";
const SHOW = "show";
const CARROT = "carrot";
const BUG = "bug";
const imgsArr = [];

let id;
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// init
for (let i = 0; i < 10; i++) {
  const carrot = makeElements(CARROT);
  field.appendChild(carrot);
  const bug = makeElements(BUG);
  field.appendChild(bug);
}

function makeRandomPisition() {
  let X = Math.floor(Math.random() * (fieldRect.right - fieldRect.x));
  let Y = Math.floor(Math.random() * (fieldRect.bottom - fieldRect.y));

  return {
    X,
    Y
  }
}

function imgsSetHidden(isHidden) {
  imgsArr.forEach(img => {
    if (isHidden) {
      img.classList.add('hidden');  
    } else {
      img.style.opacity = 1;
      img.classList.remove('hidden');
    }    
  })
}

function makeElements(element) {
  const { X, Y } = makeRandomPisition();
  const child = document.createElement('img');
  const id = uuidv4();
  child.src = `./img/${element}.png`;
  child.setAttribute('class', element);
  child.setAttribute('data-id', id);
  child.style.transform = `translate(${X}px,${Y}px)`;
  field.style.opacity = 0;
  imgsArr.push(child);
  return child;
}

function rePositionElements() {
  const imgs = [].slice.call(field.children);
  imgs.forEach(img => {
    const { X, Y } = makeRandomPisition();
    img.style.transform = `translate(${X}px,${Y}px)`;
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
  setDisplayOpacity(0);
  rePositionElements();
  imgsSetHidden(false);
  countCarrot = 10;
  counter.innerText = `${countCarrot}`;
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
    }
  }, 1000);
}

function playGame() {  
  setPlayBtnDisabled(false, STOPBUTTON);  
  updateTime(defaultTime);
  setTimer(defaultTime);
  displayState.classList.remove(SHOW);
  setFieldOpacity();
}

function restartGame(notice) {
  setPlayBtnDisabled(true, PLAYBUTTON);  
  clearInterval(id);
  setState(notice);
  field.classList.remove(SHOW);
  imgsSetHidden(true);
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
  displayState.classList.add(SHOW);
  setDisplayOpacity(1);
  state.innerText = `${sentence}`;
}

function setDisplayOpacity(number) {
  displayState.style.opacity = number;
}

function setFieldOpacity() {
  field.style.opacity = 0;
  setTimeout(() => {
    field.classList.add(SHOW);
    field.style.opacity = 1;
  }, 1000);
}

let countCarrot = 10;
field.addEventListener('click', (event) => {
  const id = event.target.dataset.id;
  const className = event.target.className;
  if (id && className === CARROT) {
    const hiddenImg = field.querySelector(`img[data-id="${id}"]`);
    hiddenImg.style.opacity = 0;
    hiddenImg.classList.add('hidden');
    countCarrot--;
    counter.innerText = `${countCarrot}`;
  }
  else if (id && className === BUG) {
    restartGame("YOU LOST~");
  }
  if (countCarrot === 0) {
    restartGame("YOU WIN!!");
  }
})