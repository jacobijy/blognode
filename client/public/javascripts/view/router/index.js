import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from "../../containers/Root";

const store = {};

render(<Router><Root store={store} /></Router>, document.querySelector('#main-container'))
