import React, {useState} from 'react';
import './global.css';
import Login from './src/login';
import Home from './src/home';
import GamePlay from './src/game';
import GameEnd from './src/end';
import Friends from './src/friends';
import Settings from './src/settings';
import Header from './src/header';
import { FRIENDS, GAME_END, LOGIN, PLAY_GAME, SETTINGS, HOME } from './src/constants';

function App() {
  const [page, setPage] = useState(LOGIN);
  let username = "";

  const handleButtonClick = (nextPage, username = "") => {
    setPage(nextPage);
    if (username) {
      username = username;
    }
  };

  return (
    <>
        <Header username={username} isSettings={page === SETTINGS} isFriends={page === FRIENDS} onButtonClick={handleButtonClick} />
        <div className="centered content">
            {page === LOGIN && <Login onButtonClick={handleButtonClick} />}
            {page === HOME && <Home onButtonClick={handleButtonClick} />}
            {page === PLAY_GAME && <GamePlay onButtonClick={handleButtonClick} />}
            {page === GAME_END && <GameEnd onButtonClick={handleButtonClick} />}
            {page === FRIENDS && <Friends onButtonClick={handleButtonClick} />}
            {page === SETTINGS && <Settings onButtonClick={handleButtonClick} />}
        </div>
    </>
    
  );
}

export default App;