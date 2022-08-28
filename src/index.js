import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

//axios.defaults.baseURL = 'https://server-dot-weighty-archive-270701.ue.r.appspot.com/';
//axios.defaults.baseURL = 'http://127.0.0.1:8000';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


