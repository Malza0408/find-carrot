'use strict';
import PopUp from './popup.js';
import Game from './game.js';

const game = new Game();
game.setFinishListener((notice) => {
  gameFinishPopUp.setState(notice);
})
const gameFinishPopUp = new PopUp();
gameFinishPopUp.setClickListener(() => {
  game.playGame();
  game.setCarrotCount(10);
  game.setCounterText();
})

game.init();