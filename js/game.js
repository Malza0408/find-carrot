'use strict';
import * as sound from './sound.js';
import { Field, ItemType } from './field.js';

const PLAYBUTTON = "playBtn";
const STOPBUTTON = "stopBtn";

// 문자열 보장
export const Notice = Object.freeze({
  win: '🥕Play Next Level❗',
  lose: '💩YOU LOST~😂',
  replay: 'Replay❓🤔',
  nextLevel: 'play Next Level❓'
})


export class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  carrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  bugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration,
      this.carrotCount,
      this.bugCount
    );
  }
}

class Game {
  constructor(duration, carrotCount, bugCount) {
    this.playBtn = document.querySelector('.game__playBtn');
    this.timer = document.querySelector('.timer');
    this.counter = document.querySelector('.counter');
    this.level = document.querySelector('.game__Level');
    this.levelText = this.level.querySelector('.level');
    this.gameField = new Field();
    this.gameField.setClickListener(this.onItemClick);
    this.id;
    this.gameStart = false;
    this.carrotCount = carrotCount;
    this.defaultTime = duration;
    this.saveCarrotCount = carrotCount;
    this.saveBugCount = bugCount;
    this.defaultCarrotCount = carrotCount;
    this.defaultBugCount = bugCount;
    this.highestLevel = 1;
    this.curLevel = 1;

    this.playBtn.addEventListener('click', (event) => {
      if (event.target.dataset.show === PLAYBUTTON) {
        if (this.gameStart) return;
        this.playGame();
      } else {
        sound.playAlert();
        this.finishGame(Notice.replay);
      }
    })
  }

  onItemClick = (item) => {
    if (item === ItemType.carrot) {
      this.carrotCount--;
      this.setCounterText();
      sound.playCarrot(1);
      if (this.carrotCount === 0) {
        this.finishGame(Notice.win);
        this.settingNextLevel();        
        sound.playWin();
      }
    }
    else if (item === ItemType.bug) {
      this.finishGame(Notice.lose);
      sound.playBug();
      this.settingLevelOne();
      sound.playAlert();
    }
  }

  init() {
    this.gameField.makeElements(ItemType.carrot, this.saveCarrotCount);
    this.gameField.makeElements(ItemType.bug, this.saveBugCount);
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
        this.finishGame(Notice.lose);
        this.settingLevelOne();
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
    this.carrotCount = this.saveCarrotCount;
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
    this.counter.innerText = `${this.carrotCount}`;
  }

  settingNextLevel() {
    this.gameField.removeImgs();
    this.settingDefaultCount(2);
    this.init();
    this.curLevel += 1;
    if (this.highestLevel < this.curLevel) {
      this.highestLevel = this.curLevel;      
    }
    this.levelText.innerText = this.highestLevel;
  }

  settingLevelOne() {
    this.gameField.removeImgs();
    this.settingDefaultCount(0);
    this.init();
    this.curLevel = 1;
  }

  settingDefaultCount(num) {
    if (num === 0) {
      this.saveCarrotCount = this.defaultCarrotCount;
      this.saveBugCount = this.defaultBugCount;
      this.carrotCount = this.saveCarrotCount;
      this.bugCount = this.saveBugCount;
      return;
    }
    this.saveCarrotCount += num;
    this.saveBugCount += num;
    this.carrotCount = this.saveCarrotCount;
    this.bugCount = this.saveBugCount;
  }
}
