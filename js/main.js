'use strict';
import PopUp from './popup.js';
import { GameBuilder, Notice } from './game.js';

const DURATION = 10;
const CARROTCOUNT = 3;
const BUGCOUNT = 3;

const game = new GameBuilder()
  .gameDuration(DURATION)
  .carrotCount(CARROTCOUNT)
  .bugCount(BUGCOUNT)
  .build();

game.setFinishListener((notice) => {
  switch (notice) {
    case Notice.win:
      gameFinishPopUp.winState(Notice.win);
      break;
    case Notice.lose:
      gameFinishPopUp.replayState(Notice.lose);
      break;
    case Notice.replay:
      gameFinishPopUp.replayState(Notice.replay);
      break;
    default:
      throw new Error('not valid Notice');
  }
  
})
const gameFinishPopUp = new PopUp();
gameFinishPopUp.setClickListener(() => {
  game.playGame();
  game.setCounterText();
})

game.init();