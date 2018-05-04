import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from "../../containers/Root";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
// import rootReducers from '../../reducers';

const store = createStore(
  ((a)=>a),
  applyMiddleware(thunk)
)

render(<Router><Root store={store} /></Router>, document.querySelector('#main-container'))
