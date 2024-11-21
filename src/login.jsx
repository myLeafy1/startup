import React from 'react';
import '../global.css';
import { HOME } from './constants';

function Login({ onButtonClick }) {
  return (
    <>
    <main>
    <button onClick={() => onButtonClick(HOME, "User")}>login</button>
      
    </main>

    <footer>
      <a href="https://github.com/myLeafy1/startup">GitHub</a>
    </footer>
    </>
    
  );
}

export default Login;