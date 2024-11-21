import React from 'react';
import '../global.css';
import { HOME, PLAY_GAME } from './constants';

function GameEnd({ onButtonClick }) {
  return (
    <div className="centered content">
        <p className="end-text">you finished!!</p>
        <button onClick={() => onButtonClick(PLAY_GAME)}>play again?</button>
        <button onClick={() => onButtonClick(HOME)}>home</button>
      </div>
  );
}

export default GameEnd;