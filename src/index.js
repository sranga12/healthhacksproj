import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import tools from "./config"


ReactDOM.render(<App />, document.getElementById('root'));
const dotenv = require('dotenv');

// load values from the .env file in this directory into process.env
dotenv.load()


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
