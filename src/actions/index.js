import { createAction } from 'redux-actions';
import { configureAxios, parseJWT } from '../utils';
import axiosLib from 'axios';
import page from 'page';

const axios = configureAxios(axiosLib);

export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const addItemSuccess = createAction(ADD_ITEM_SUCCESS);

export const REMOVE_ITEM = 'REMOVE_ITEM';
export const removeItem = createAction(REMOVE_ITEM);

export const PLACE_VOTE_SUCCESS = 'PLACE_VOTE_SUCCESS';
export const placeVoteSuccess = createAction(PLACE_VOTE_SUCCESS);

export const PLACE_VOTE_FAILURE = 'PLACE_VOTE_FAILURE';
export const placeVoteFailure = createAction(PLACE_VOTE_FAILURE);

export const GOT_ITEMS = 'GOT_ITEMS';
export const gotItems = createAction(GOT_ITEMS);

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const registerSuccess = createAction(REGISTER_SUCCESS);

export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const registerFailure = createAction(REGISTER_FAILURE);

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = createAction(LOGIN_SUCCESS);

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const loginFailure = createAction(LOGIN_FAILURE);

export const GOT_LISTS = 'GOT_LISTS';
export const gotLists = createAction(GOT_LISTS);

export const ADD_ITEM_LIST_SUCCESS = 'ADD_ITEM_LIST_SUCCESS';
export const addItemListSuccess = createAction(ADD_ITEM_LIST_SUCCESS);

export const ADD_ITEM_LIST_FAILURE = 'ADD_ITEM_LIST_FAILURE';
export const addItemListFailure = createAction(ADD_ITEM_LIST_FAILURE);

export const GET_REMAINING_VOTES_SUCCESS = 'GET_REMAINING_VOTES_SUCCESS';
export const getRemainingVotesSuccess = createAction(GET_REMAINING_VOTES_SUCCESS);

export const getLists = (ajaxLib = axios) => {
  return (dispatch, getState) => {
    ajaxLib.get('/api/v1/lists')
           .then((response) => {
             dispatch(gotLists(response.data));
           });
  };
};

export const getRemainingVotes = (username, listId = '', ajaxLib = axios) => {
  return (dispatch, getState) => {
    ajaxLib.get(`/api/v1/users/${username}/remainingVotes/${listId}`)
           .then((response) => {
             dispatch(getRemainingVotesSuccess(response.data));
           });
           // TODO: Add fail condition here
  }
}

export const addList = (ajaxLib = axios) => {
  return (dispatch, getState) => {
    const username = parseJWT().username;
    ajaxLib.post(`/api/v1/users/${username}/lists`, {})
           .then((response) => {
             dispatch(addItemListSuccess(response.data));
           })
           .catch((response) => {
             dispatch(addItemListFailure(new Error(response.data)));
           });
  };
};

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
      .post(`/api/v1/lists/${item.listId}`, {
        title: item.title
      })
      .then((response) => {
        dispatch(addItemSuccess(response.data));
      });
  };
};

export const placeVote = (item, ajaxLib = axios) => {
  return (dispatch, getState) => {
    let userVotes = getState().get('remainingVotes');
    if (userVotes > 0) {
      ajaxLib
        .post(`/api/v1/lists/${item.listId}/${item.id}/vote`)
        .then((response) => {
          dispatch(placeVoteSuccess({listId: item.listId, ...response.data}));
        })
        .catch((response) => {
          dispatch(placeVoteFailure(new Error(response.data)));
        });
    } else {
      dispatch(placeVoteFailure());
    }
  };
};

export const processSignup = (request, ajaxLib = axios) => {
  return (dispatch, getState) => {
    ajaxLib.post('/auth/register', request)
         .then((response) => {
           dispatch(registerSuccess(response.data));
           page('/home');
         })
         .catch((response) => {
           dispatch(registerFailure(response.data));
         });
  };
};

export const processSignin = (request, ajaxLib = axios, redirect = page) => {
  return (dispatch, getState) => {
    ajaxLib.post('/auth/login', request)
           .then((response) => {
             dispatch(loginSuccess(response.data));
             redirect('/home');
           })
           .catch((response) => {
             dispatch(loginFailure(response.data));
           });
  };
};
