'use strict';
import * as sound from './sound.js';

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

    this.SHOW = "show";
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  };

  hide(isShow, opacity) {
    isShow ? this.popUpMenu.classList.add(this.SHOW) : this.popUpMenu.classList.remove(this.SHOW);
    this.popUpMenu.style.opacity = opacity;
  }

  setState(sentence) {
    this.hide(true, 1);
    this.popUpMenuText.innerText = `${sentence}`;
  }
}