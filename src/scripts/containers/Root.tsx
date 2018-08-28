import React from 'react';
import App from '../view/App';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { Store } from 'redux';

const Root = ({ store }: { store: Store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
