import React from 'react';
import '../global.css';
import { GAME_END } from './constants';

function GamePlay({ onButtonClick }) {
  return (
    <div className='centered content'>
      <button onClick={() => onButtonClick(GAME_END)}>finish game</button>

        <button className="mobile-buttons circular-button"><i className="material-icons">arrow_upward</i></button>
        <button className="mobile-buttons circular-button"><i className="material-icons">arrow_downward</i></button>
        <button className="mobile-buttons circular-button"><i className="material-icons">arrow_back</i></button>
        <button className="mobile-buttons circular-button"><i className="material-icons">arrow_forward</i></button>
    </div>
  );
}

export default GamePlay;