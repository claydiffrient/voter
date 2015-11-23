import React from 'react';
import { render } from 'react-dom';
import ConnectedIndex from './components/ConnectedIndex';
import { Provider } from 'react-redux';
import page from 'page';
import configureStore from './store/configureStore';
import initialState from './store/initialState';
import App from './components/App';

const store = configureStore(initialState);

function renderIndex () {
  render(
    (
      <Provider store={store}>
        <App>
          <ConnectedIndex />
        </App>
      </Provider>
    ), document.getElementById('main'));
}

page('/', renderIndex);
page('/signup', () => console.log('TODO: Render signup'));
page('/signin', () => console.log('TODO: Render signin'));

page();
