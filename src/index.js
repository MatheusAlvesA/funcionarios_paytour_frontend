import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login.jsx';
import { BrowserRouter } from 'react-router-dom';
import { estaLogado } from './api';
import * as serviceWorker from './serviceWorker';

const app = <BrowserRouter><App /></BrowserRouter>;
const login = <BrowserRouter><Login /></BrowserRouter>;

if(estaLogado())
	ReactDOM.render(app, document.getElementById('root'));
else
	ReactDOM.render(login, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
