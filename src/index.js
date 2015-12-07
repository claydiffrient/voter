import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import page from 'page';
import configureStore from './store/configureStore';
import initialState from './store/initialState';

// Smart components
import ConnectedApp from './components/ConnectedApp';
import ConnectedIndex from './components/ConnectedIndex';
import ConnectedSignup from './components/ConnectedSignup';
import ConnectedSignin from './components/ConnectedSignin';
import ConnectedHome from './components/ConnectedHome';

const store = configureStore(initialState);

function renderIndex () {
  render(
    (
      <Provider store={store}>
        <ConnectedApp>
          <ConnectedIndex />
        </ConnectedApp>
      </Provider>
    ), document.getElementById('main'));
}

function renderSignup () {
  render(
    (
      <Provider store={store}>
        <ConnectedApp>
          <ConnectedSignup />
        </ConnectedApp>
      </Provider>
    ), document.getElementById('main'));
}

function renderSignin () {
  render(
    (
      <Provider store={store}>
        <ConnectedApp>
          <ConnectedSignin />
        </ConnectedApp>
      </Provider>
    ), document.getElementById('main'));
}

function renderHome () {
  render(
    (
      <Provider store={store}>
        <ConnectedApp>
          <ConnectedHome />
        </ConnectedApp>
      </Provider>
    ), document.getElementById('main'));
}

page('/', renderIndex);
page('/signup', renderSignup);
page('/signin', renderSignin);
page('/home', renderHome);

page();
