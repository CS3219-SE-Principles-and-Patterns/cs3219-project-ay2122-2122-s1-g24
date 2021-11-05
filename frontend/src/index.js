import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';
import { CookiesProvider } from 'react-cookie'

ReactDOM.render(
  <CookiesProvider>
    <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </CookiesProvider>,
  document.getElementById('root')
);

reportWebVitals();
