import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// --- CSS Imports ---
// 1. index.css: Pehle foundation load hoga (Fonts, Tailwind, Global Reset)
import './index.css'; 

// 2. app.css: Phir decoration load hogi (Animations, Custom Scrollbars, Glassmorphism)
import './app.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);