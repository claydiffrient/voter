import React from 'react';
import { render } from 'react-dom';
import Index from './components/Index';
import { Provider, connect } from 'react-redux';
import configureStore from './store/configureStore';
import initialState from './store/initialState';
import * as Actions from './actions';

function mapStateToProps (state) {
  return {
    items: state.get('items')
  };
}

function mapDispatchToProps (dispatch) {
  return {
    handleAddItem: (item) => dispatch(Actions.addItem(item)),
    handleVote: (id) => { console.log(id); dispatch(Actions.placeVote({id}))}
  };
}

const ConnectedIndex = connect(mapStateToProps, mapDispatchToProps)(Index);
const store = configureStore(initialState);

render(
  (
    <Provider store={store}>
      <ConnectedIndex />
    </Provider>
  ), document.getElementById('main'));
