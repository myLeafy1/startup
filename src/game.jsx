import React from 'react';
import '../global.css';
import { GAME_END } from './constants';

function GamePlay({ onButtonClick }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const movePlayer = (direction) => {
    setPosition((prevPosition) => {
      switch (direction) { 
        case 'up':
          return { top: prevPosition.top - 10, left: prevPosition.left };
        case 'down':
          return { top: prevPosition.top + 10, left: prevPosition.left };
        case 'left':
          return { top: prevPosition.top, left: prevPosition.left - 10 };
        case 'right':
          return { top: prevPosition.top, left: prevPosition.left + 10 };
        default:
          return prevPosition;
      }
    });
  };

  return (
    <div className='centered content'>
      <div>score goes here</div>
      <div>
        <div>
          <div>enemy</div>
          <div
            className="player"
            style={{
              position: 'absolute',
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            player
          </div>
        </div>
        <div>
        <button
            className="mobile-buttons circular-button"
            onClick={() => movePlayer('up')}
          >
            <i className="material-icons">arrow_upward</i>
          </button>
          <button
            className="mobile-buttons circular-button"
            onClick={() => movePlayer('down')}
          >
            <i className="material-icons">arrow_downward</i>
          </button>
          <button
            className="mobile-buttons circular-button"
            onClick={() => movePlayer('left')}
          >
            <i className="material-icons">arrow_back</i>
          </button>
          <button
            className="mobile-buttons circular-button"
            onClick={() => movePlayer('right')}
          >
            <i className="material-icons">arrow_forward</i>
          </button>
          </div>
      </div>




      <button onClick={() => onButtonClick(GAME_END)}>finish game</button>

        
    </div>
  );
}

export default GamePlay;