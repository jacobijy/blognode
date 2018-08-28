import * as React from 'react';
import { render } from 'react-dom';
import Root from '../../containers/Root';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import ApiMiddleware from '../../middleware/createMiddleware';
import rootReducers, { initialState } from '../../modules/reducer';
import ApiClient from '../../../../utils/apiClient';

const logger = createLogger();
const client = new ApiClient();
const api = ApiMiddleware(client);
const preloadedState = initialState();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = __DEVELOPMENT__ ? createStore(
    rootReducers,
    preloadedState,
    composeEnhancers(
        applyMiddleware(api, thunk, logger)
    )
) : createStore(
    rootReducers,
    preloadedState,
    applyMiddleware(api, thunk)
);

render(<Root store={store} />, document.querySelector('#main-container'));
