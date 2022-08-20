import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //<React.StrictMode> commented cause drag'n'drop not working in strict mode in development
    <App />
  //</React.StrictMode>
);