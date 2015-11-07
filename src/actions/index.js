import { createAction } from 'redux-actions';

export const ADD_ITEM = 'ADD_ITEM';
export const addItem = createAction(ADD_ITEM);

export const REMOVE_ITEM = 'REMOVE_ITEM';
export const removeItem = createAction(REMOVE_ITEM);