import React from 'react';
import '../global.css';
import { HOME } from './constants';

function Login({ onButtonClick }) {
  const [username, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  const dev = true;

  function validateInput() {
    if (!username || !password) {
      setDisplayError('⚠ Please enter a username and password');
      return false;
    }
    return true;
  }

  async function loginUser() {
    if (!validateInput()) { return; }
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    if (!validateInput()) { return; }
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    let fullEndpoint = endpoint
    if (dev){
      fullEndpoint = `http://localhost:3000${endpoint}`
    }
    const response = await fetch(fullEndpoint, {
      method: 'post',
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', username);
      //props.onLogin(userName);
      onButtonClick(HOME, "User")
    } else {
      //const body = await response.json();
      //setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <>
    <main>
      <div className='login-container'>
        {displayError && <div className='error'>{displayError}</div>}
        <input 
          type="text" 
          placeholder="username" 
          value={username}
          onChange={(e)=>setUserName(e.target.value)}
          />
        <input 
          type="password" 
          placeholder="password" 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
        <button onClick={() => loginUser()}>login</button>
        <button onClick={() => createUser()}>create</button>
      </div>


    </main>

    <footer>
      <a href="https://github.com/myLeafy1/startup">GitHub</a>
    </footer>
    </>
    
  );
}

export default Login;