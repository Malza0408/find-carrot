'use strict';
import * as sound from './sound.js';

const SHOW = "show";

export default class PopUp {
  constructor() {
    this.popUpMenu = document.querySelector('.popUpMenu');
    this.restartBtn = this.popUpMenu.querySelector('.popUpMenu__restart');
    this.popUpMenuText = this.popUpMenu.querySelector('.popUpMenu__text');

    this.restartBtn.addEventListener('click', (event) => {
      this.onClick && this.onClick();
      this.hide(false, 0);
      sound.stopWin();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  };

  hide(isShow, opacity) {
    isShow ? this.popUpMenu.classList.add(SHOW) : this.popUpMenu.classList.remove(SHOW);
    this.popUpMenu.style.opacity = opacity;
  }

  replayState(sentence) {
    this.hide(true, 1);
    this.popUpMenuText.innerText = `${sentence}`;
  }

  winState(notice) {
    this.hide(true, 1);
    this.restartBtn.innerHTML = `<i class="fas fa-play"></i>`;
    this.popUpMenuText.innerText = `${notice}`;
  }
  
}