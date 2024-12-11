import React from 'react';
import '../global.css';
import { HOME, SETTINGS } from './constants';

function Header({username, isSettings,  onButtonClick }) {
  return (
    <header className='centered'>
      <button onClick={() => onButtonClick(HOME)} ><i className="material-icons">home</i></button>
      <h1 className="title">Fun dungeon crawler</h1>
      <div className="user-name">{username}</div>
      {!isSettings && <button  onClick={() => onButtonClick(SETTINGS)} className="circular-button" ><i className="material-icons">settings</i></button> }
      
    </header>
  );
}

export default Header;