import React from 'react';
import '../global.css';
import { PLAY_GAME } from './constants';

function Home({ onButtonClick }) {
  return (
    <div className="centered content">
        <button onClick={() => onButtonClick(PLAY_GAME)}>play game</button>
        <a href="https://simon.meganmckeehan.click"><button>rather play Simon says?</button></a>
      </div>
  );
}

export default Home;