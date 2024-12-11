import React, {useState} from 'react';
import './global.css';
import Login from './src/login';
import Home from './src/home';
import GamePlay from './src/game';
import GameEnd from './src/end';
import Friends from './src/friends';
import Settings from './src/settings';
import Header from './src/header';
import { FRIENDS, GAME_WON, LOGIN, PLAY_GAME, SETTINGS, HOME, GAME_ESCAPED, GAME_FAIL } from './src/constants';

function App() {
  const [page, setPage] = useState(LOGIN);
  let username = "";

  const handleButtonClick = (nextPage, username = "", shouldLogout=false) => {
    setPage(nextPage);
    if (username) {
      username = username;
    }
    if (shouldLogout){ 
      logout(); 
      username = "";
    }
  };

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        //props.onLogout();
      });
  }

  return (
    <>
        <Header username={username} isSettings={page === SETTINGS} isFriends={page === FRIENDS} onButtonClick={handleButtonClick} />
        <div className="centered content">
            {page === LOGIN && <Login onButtonClick={handleButtonClick} />}
            {page === HOME && <Home onButtonClick={handleButtonClick} />}
            {page === PLAY_GAME && <GamePlay onButtonClick={handleButtonClick} username={username}/>}
            {page === GAME_WON && <GameEnd onButtonClick={handleButtonClick} howGameEnded={GAME_WON}/>}
            {page === GAME_FAIL && <GameEnd onButtonClick={handleButtonClick} howGameEnded={GAME_FAIL}/>}
            {page === GAME_ESCAPED && <GameEnd onButtonClick={handleButtonClick} howGameEnded={GAME_ESCAPED}/>}
            {page === FRIENDS && <Friends onButtonClick={handleButtonClick} />}
            {page === SETTINGS && <Settings onButtonClick={handleButtonClick} />}
        </div>
    </>
    
  );
}

export default App;