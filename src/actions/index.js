import { createAction } from 'redux-actions';
import axios from 'axios';

export const ADD_ITEM = 'ADD_ITEM';
export const addItemSuccess = createAction(ADD_ITEM);

export const REMOVE_ITEM = 'REMOVE_ITEM';
export const removeItem = createAction(REMOVE_ITEM);

export const PLACE_VOTE = 'PLACE_VOTE';
export const placeVote = createAction(PLACE_VOTE);

export const GOT_ITEMS = 'GOT_ITEMS';
export const gotItems = createAction(GOT_ITEMS);

export const getItems = (ajaxLib = axios) => {
  return (dispatch, getState) => {
    ajaxLib.get('/api/v1/items')
           .then((response) => {
             dispatch(gotItems(response.data));
           });
  };
};

export const addItem = (item, ajaxLib = axios) => {
  return (dispatch, getState) => {
    ajaxLib
      .post('/api/v1/items', {
        votes: 0,
        title: item.title
      })
      .then((response) => {
        dispatch(addItemSuccess(response.data));
      });
  };
};
