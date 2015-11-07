import * as ActionTypes from '../actions';
import { handleActions } from 'redux-actions';
import initialState from '../store/initialState';

const ROOT_REDUCER = handleActions({
  [ActionTypes.ADD_ITEM]: (state, action) => {
    let oldItems = state.get('items');
    let newItems = oldItems.push(action.payload);
    return state.set('items', newItems);
  },

  [ActionTypes.REMOVE_ITEM]: (state, action) => {
    let oldItems = state.get('items');
    let newItems = oldItems.filterNot(x => x.get('id') === action.payload.id);
    return state.set('items', newItems);
  },

  [ActionTypes.PLACE_VOTE]: (state, action) => {
    let oldItems = state.get('items');
    let index = oldItems.findIndex(x => x.get('id') === action.payload.id);
    let newItems = oldItems.update(index, x => x.set('votes', x.get('votes') + 1));
    return state.set('items', newItems);
  }

}, initialState);

export default ROOT_REDUCER;
