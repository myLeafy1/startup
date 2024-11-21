import React from 'react';
import '../global.css';

function Header({username, isSettings, isFriends,  onButtonClick }) {
  return (
    <header className='centered'>
      {isFriends && <button onClick={() => onButtonClick(HOME)} ><i className="material-icons">back</i></button>}
      <h1 className="title">Fun dungeon crawler</h1>
      <div className="user-name">{username}</div>
      {!isSettings && <button  onClick={() => onButtonClick(PLAY_GAME)} className="circular-button" ><i className="material-icons">settings</i></button> }
      
    </header>
  );
}

export default Header;