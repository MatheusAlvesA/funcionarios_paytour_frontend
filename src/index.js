import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login.jsx';
import { estaLogado } from './api';
import * as serviceWorker from './serviceWorker';

if(estaLogado())
	ReactDOM.render(<App />, document.getElementById('root'));
else
ReactDOM.render(<Login />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
