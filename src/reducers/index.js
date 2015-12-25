import * as ActionTypes from '../actions';
import { handleActions } from 'redux-actions';
import initialState from '../store/initialState';
import { fromJS } from 'immutable';

const ROOT_REDUCER = handleActions({
  [ActionTypes.ADD_ITEM_SUCCESS]: (state, action) => {
    let itemListsIndex = state.get('itemLists').findIndex((x) => x.get('id') === action.payload.listId);
    let newItemLists = state.get('itemLists').update(itemListsIndex,
      (x) => {
        let newItems = x.get('items').push(fromJS(action.payload));
        return x.set('items', newItems);
      }
    );
    return state.set('itemLists', newItemLists);
  },

  [ActionTypes.REMOVE_ITEM]: (state, action) => {
    let oldItems = state.get('items');
    let newItems = oldItems.filterNot(x => x.get('id') === action.payload.id);
    return state.set('items', newItems);
  },

  [ActionTypes.PLACE_VOTE_SUCCESS]: (state, action) => {
    // Add the vote to the appropriate item
    let itemListsIndex = state.get('itemLists').findIndex((x) => x.get('id') === action.payload.listId);
    let newItemLists = state.get('itemLists').update(itemListsIndex,
      (x) => {
        let oldItems = x.get('items');
        let index = oldItems.findIndex(x => x.get('id') === action.payload.itemId);
        let newItems = oldItems.update(index, x => x.set('votes', x.get('votes') + 1));
        let afterUpdatedRemaining = x.set('remainingVotes', x.get('remainingVotes') - 1);
        return afterUpdatedRemaining.set('items', newItems);
      }
    );

    return state.set('itemLists', newItemLists);
  },

  [ActionTypes.PLACE_VOTE_FAILURE]: (state = initialState, action) => {
    const oldFlashMessage = state.get('flashMessage');
    const newFlashMessage = fromJS({
      error: true,
      message: action.payload.message,
      time: oldFlashMessage.get('time') + 500
    });

    return state.set('flashMessage', newFlashMessage);
  },

  [ActionTypes.GOT_ITEMS]: (state, action) => {
    let oldItems = state.get('items');
    let newItems = oldItems.concat(fromJS(action.payload));
    return state.set('items', newItems);
  },

  [ActionTypes.GOT_LISTS]: (state = initialState, action) => {
    let oldItems = state.get('itemLists');
    let newItems = oldItems.concat(fromJS(action.payload));
    return state.set('itemLists', newItems);
  },

  [ActionTypes.GET_REMAINING_VOTES_SUCCESS]: (state = initialState, action) => {
    let oldItems = state.get('itemLists');
    let newItems = oldItems.map((x) => {
      if (action.payload.remainingVotes[x.get('id')]) {
        return x.set('remainingVotes', action.payload.remainingVotes[x.get('id')]);
      } else {
         // TODO: Replace with variable for amount of votes.
        return x.set('remainingVotes', 10);
      }

    });
    return state.set('itemLists', newItems);
  },

  [ActionTypes.REGISTER_SUCCESS]: (state, action) => {
    return state;
  },

  [ActionTypes.REGISTER_FAILURE]: (state, action) => {
    return state;
  }

}, initialState);

export default ROOT_REDUCER;
