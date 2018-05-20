import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from "../../containers/Root";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import ApiMiddleware from '../../middleware/createMiddleware';
import rootReducers from '../../modules/reducer';
import ApiClient from '../../../../../utils/apiClient';

const logger = createLogger();
const client = new ApiClient()
const api = ApiMiddleware(client)
const store = createStore(
  rootReducers,
  applyMiddleware(api, thunk, logger)
)

render(<Router><Root store={store} /></Router>, document.querySelector('#main-container'))
