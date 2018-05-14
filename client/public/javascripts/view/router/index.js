import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from "../../containers/Root";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducers from '../../reducers';
import App from '../../basecomponent/modal';

const logger = createLogger();
const store = createStore(
  rootReducers,
  applyMiddleware(thunk, logger)
)

// render(<Router><Root store={store} /></Router>, document.querySelector('#main-container'))
render(<App />, document.querySelector('#main-container'))
