import React from 'react';
import '../global.css';
import { PLAY_GAME, LOGIN } from './constants';

function Home({ onButtonClick }) {
  

  return (
    <div className="centered content">
        <button onClick={() => onButtonClick(PLAY_GAME)}>play game</button>
        <button onClick={() => onButtonClick(LOGIN, "", true)}>logout</button>
        <a href="https://simon.meganmckeehan.click"><button>rather play Simon says?</button></a>
      </div>
  );
}

export default Home;