import React from 'react';
import { render } from 'react-dom';
import ConnectedIndex from './components/ConnectedIndex';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import initialState from './store/initialState';

const store = configureStore(initialState);

render(
  (
    <Provider store={store}>
      <ConnectedIndex />
    </Provider>
  ), document.getElementById('main'));
