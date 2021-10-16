'use strict';
import * as sound from './sound.js';
import Field from './field.js';

const PLAYBUTTON = "playBtn";
const STOPBUTTON = "stopBtn";
const CARROT = "carrot";
const BUG = "bug";

export default class Game {
  constructor() {
    this.playBtn = document.querySelector('.game__playBtn');
    this.timer = document.querySelector('.timer');
    this.counter = document.querySelector('.counter');
    this.gameField = new Field(10, 10);
    this.gameField.setClickListener(this.onItemClick);
    this.id;
    this.gameStart = false;
    this.countCarrot = 10;
    this.defaultTime = 10;
    this.defaultCountCarrot = 10;
    this.defaultCountBug = 10;

    this.playBtn.addEventListener('click', (event) => {
      if (event.target.dataset.show === PLAYBUTTON) {
        if (this.gameStart) return;
        this.playGame();
      } else {
        sound.playAlert();
        this.finishGame("Replay?");
      }
    })
  }

  onItemClick = (item) => {
    if (item === CARROT) {
      this.countCarrot--;
      this.setCounterText();
      sound.playCarrot(1);
      if (this.getCarrotCount() === 0) {
        this.finishGame("YOU WIN!!");
        sound.playWin();
      }
    }
    else if (item === BUG) {
      this.finishGame("YOU LOST~");
      sound.playBug();
      sound.playAlert();
    }
  }

  init() {
    this.gameField.makeElements(CARROT, this.defaultCountCarrot);
    this.gameField.makeElements(BUG, this.defaultCountBug);
}

  setFinishListener(fieldStop) {
    this.fieldStop = fieldStop;
  }

  setTimer(number) {
    const padNum = String(number).padStart(2, "0");
    this.timer.innerText = `00:${padNum}`;
  }

  updateTime(number) {
    this.id = setInterval(() => {
      this.setTimer(number);
      number--;
      if (number < 0) {      
        this.finishGame("YOU LOST~");
        sound.playAlert();
      }
    }, 1000);
  }

  playGame() {
    this.setPlayBtnDisabled(false, STOPBUTTON);  
    this.updateTime(this.defaultTime);
    this.setTimer(this.defaultTime);
    this.gameField.setFieldShow(true);
    this.gameStart = true;
    this.gameField.rePositionImgs();
    sound.playBackground();
  }
  
  finishGame(notice) {
    this.setPlayBtnDisabled(true, PLAYBUTTON);  
    clearInterval(this.id);
    this.fieldStop && this.fieldStop(notice);
    this.gameField.setFieldShow(false);
    this.gameStart = false;
    sound.stopBackground();
  }

  setPlayBtnDisabled(isDisabled, show) {
    if (isDisabled) {
      this.playBtn.classList.add('disabled');
      this.playBtn.dataset.show = show;
      this.playBtn.style.opacity = 0;
    } else {
      setTimeout(() => {
        this.playBtn.classList.remove('disabled');
        this.playBtn.dataset.show = show;
        this.playBtn.style.opacity = 1;
      }, 1000);
    }
  }

  setCounterText() {
    this.counter.innerText = `${this.countCarrot}`;
  }

  getCarrotCount() {
    return this.countCarrot;
  }

  setCarrotCount(number) {
    this.countCarrot = number;
  }
}
