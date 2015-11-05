import * as ActionTypes from '../actions';
import { handleActions } from 'redux-actions';
import initialState from '../store/initialState';

const ROOT_REDUCER = handleActions({
  [ActionTypes.ADD_ITEM]: (state, action) => {
    let oldItems = state.get('items');
    let newItems = oldItems.push(action.payload);
    return state.set('items', newItems);
  }
}, initialState);

export default ROOT_REDUCER;
