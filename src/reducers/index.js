import * as ActionTypes from '../actions';
import { handleActions } from 'redux-actions';
import initialState from '../store/initialState';
import { fromJS } from 'immutable';

const ROOT_REDUCER = handleActions({
  [ActionTypes.ADD_ITEM]: (state, action) => {
    let oldItems = state.get('items');
    let newItems = oldItems.push(fromJS(action.payload));
    return state.set('items', newItems);
  },

  [ActionTypes.REMOVE_ITEM]: (state, action) => {
    let oldItems = state.get('items');
    let newItems = oldItems.filterNot(x => x.get('id') === action.payload.id);
    return state.set('items', newItems);
  },

  [ActionTypes.PLACE_VOTE]: (state, action) => {
    let userVotes = state.get('remainingVotes');
    if (userVotes > 0) {
      // Add the vote to the appropriate item
      let oldItems = state.get('items');
      let index = oldItems.findIndex(x => x.get('id') === action.payload.id);
      let newItems = oldItems.update(index, x => x.set('votes', x.get('votes') + 1));

      // Reduce the remaining votes for the user
      let updatedState = state.set('remainingVotes', userVotes - 1);

      return updatedState.set('items', newItems);
    } else {
      return state;
    }
  },

  [ActionTypes.GOT_ITEMS]: (state, action) => {
    let oldItems = state.get('items');
    let newItems = oldItems.concat(fromJS(action.payload));
    return state.set('items', newItems);
  }

}, initialState);

export default ROOT_REDUCER;
