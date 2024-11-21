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
    </div>
  );
}

export default Settings;