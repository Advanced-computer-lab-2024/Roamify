import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'; // Optional: Import your CSS styles if you have any

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Ensure you have a <div id="root"></div> in your public/index.html
);
