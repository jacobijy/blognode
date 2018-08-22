import React from 'react'
import { render } from 'react-dom'
import Root from "../../containers/Root";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import ApiMiddleware from '../../middleware/createMiddleware';
import asyncMiddleware from '../../middleware/asyncMiddleware';
import rootReducers, { initialState } from '../../modules/reducer';
import ApiClient from '../../../../../utils/apiClient';
import * as modules from '../../modules';

const logger = createLogger();
const client = new ApiClient();
const api = ApiMiddleware(client);
const newapi = asyncMiddleware();
const preloadedState = initialState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = __DEVELOPMENT__ ? createStore(
	rootReducers,
	preloadedState,
	composeEnhancers(
		applyMiddleware(api, newapi, thunk, logger)
	)
) : createStore(
	rootReducers,
	preloadedState,
	applyMiddleware(api, newapi, thunk)
)

const dispatch = store.dispatch;
const requestAction = (method, prefix, data) => (dispatch(modules[prefix][method](data)))

render(<Root store={Object.assign(store, { requestAction })} />, document.querySelector('#main-container'))
