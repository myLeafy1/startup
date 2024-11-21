import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './global.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);