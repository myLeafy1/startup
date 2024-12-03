import React from 'react';
import '../global.css';
import { HOME } from './constants';

function Login({ onButtonClick }) {
  return (
    <>
    <main>
      <div className='login-container'>
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <button onClick={() => onButtonClick(HOME, "User")}>login</button>
      </div>
    </main>

    <footer>
      <a href="https://github.com/myLeafy1/startup">GitHub</a>
    </footer>
    </>
    
  );
}

export default Login;