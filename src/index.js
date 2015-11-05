import React from 'react';
import { render } from 'react-dom';
import Index from './components/Index/Index';
import { Provider, connect } from 'react-redux';
import configureStore from './store/configureStore';
import initialState from './store/initialState';

function mapStateToProps (state) {
  return {
    props: state
  };
}

const ConnectedIndex = connect(mapStateToProps)(Index);
const store = configureStore(initialState);

render(
  (
    <Provider store={store}>
      <ConnectedIndex />
    </Provider>
  ), document.getElementById('main'));
