import React from 'react';
import '../global.css';

function Settings() {
  return (
    <div className="centered content">
        <p>Game settings:</p>
        <div>dummy game settings:
          <ul>
            <li>setting 1: difficulty</li>
            <li>setting 2: sound</li>
            <li>setting 3: graphics</li>
          </ul>
        </div>
        <button onClick={() => onButtonClick(LOGIN, "", true)}>logout</button>
    </div>
  );
}

export default Settings;