import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';



import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';

import reducer from './store/reducer';

import thunkMiddleware from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));


ReactDOM.render(<BrowserRouter>
    <Provider store={store}><App /></Provider>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
