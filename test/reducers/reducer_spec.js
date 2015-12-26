/*eslint-env mocha */
import { expect } from 'chai';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import { Map, List, fromJS } from 'immutable';
import reducer from '../../src/reducers';
import * as Actions from '../../src/actions';

chai.use(chaiImmutable);

describe('Reducers', () => {

  const BASE_STATE = fromJS({
        itemLists: [{
          id: 'abc',
          items: [{
            id: 'abcd',
            title: 'test 1',
            listId: 'abc',
            votes: 0
          }, {
            id: 'efgh',
            title: 'test 2',
            listId: 'abc',
            votes: 0
          }],
          remainingVotes: 10
        }, {
          id: 'def',
          items: [{
            title: 'test 3'
          }, {
            title: 'test 4'
          }],
          remainingVotes: 10
        }]
      });

  it('adds an item to the list of items on ADD_ITEM_SUCCESS', () => {
    let initialState = BASE_STATE;

    let action = Actions.addItemSuccess({title: 'test added', listId: 'abc'});

    let finalState = reducer(initialState, action);
    const expected = fromJS({
      id: 'abc',
      items: [{
        id: 'abcd',
        title: 'test 1',
        listId: 'abc',
        votes: 0
      }, {
        id: 'efgh',
        title: 'test 2',
        listId: 'abc',
        votes: 0
      }, {
        title: 'test added',
        listId: 'abc'
      }],
      remainingVotes: 10
    });
    expect(finalState.get('itemLists').get(0)).to.deep.equal(expected);
  });

  it('removes an item from the list of items on REMOVE_ITEM', () => {
    let initialState = Map({
      items: fromJS([{id: 1}, {id: 2}, {id: 3}])
    });

    let action = Actions.removeItem({id: 2});

    let finalState = reducer(initialState, action);
    expect(finalState.get('items')).to.deep.equal(fromJS([{id: 1}, {id: 3}]));
  });

  it('adds a vote count on PLACE_VOTE_SUCCESS', () => {
    let initialState = BASE_STATE;

    let action = Actions.placeVoteSuccess({listId: 'abc', itemId: 'abcd'});

    let finalState = reducer(initialState, action);
    let expected = 1;
    expect(finalState.get('itemLists').get(0).get('items').get(0).get('votes')).to.equal(expected);
  });

  it('reduces the remainingVotes for the list on PLACE_VOTE_SUCCESS', () => {
    let initialState = BASE_STATE;

    let action = Actions.placeVoteSuccess({listId: 'abc', itemId: 'abcd'});
    let finalState = reducer(initialState, action);
    expect(finalState.get('itemLists').get(0).get('remainingVotes')).to.equal(9);
  });

  it('sets the flashMessage error on PLACE_VOTE_FAILURE', () => {
    let initialState = Map({
      flashMessage: Map({
        error: false,
        message: '',
        time: 1000
      })
    });

    const failure = new Error('Failed to place the vote')
    let action = Actions.placeVoteFailure(failure);
    let finalState = reducer(initialState, action);

    let expected = Map({
      error: true,
      message: 'Failed to place the vote',
      time: 1500
    });

    expect(finalState.get('flashMessage')).to.equal(expected);
  });

  it('adds items to the store on GOT_ITEMS', () => {
    let initialState = Map({
      items: fromJS([{id: 1, votes: 0}, {id: 2, votes: 0}, {id: 3, votes: 0}])
    });

    let action = Actions.gotItems([{id: 10, votes: 10}]);
    let finalState = reducer(initialState, action);
    let expected = fromJS([{id: 1, votes: 0}, {id: 2, votes: 0}, {id: 3, votes: 0}, {id: 10, votes: 10}]);
    expect(finalState.get('items')).to.equal(expected);
  });

  it('adds lists to the store on GOT_LISTS', () => {
    let initialState = Map({
      itemLists: List([])
    });

    let action = Actions.gotLists([{id: 'gef', remainingVotes: 10, items: []}]);
    let finalState = reducer(initialState, action);
    let expected = fromJS([{id: 'gef', remainingVotes: 10, items: []}]);
    expect(finalState.get('itemLists')).to.equal(expected);
  });

  it('sets the remainingVotes on GET_REMAINING_VOTES_SUCCESS', () => {
    let initialState = BASE_STATE;

    let action = Actions.getRemainingVotesSuccess({
      remainingVotes: {
        'abc': 3,
        'def': 8
      }
    });
    let finalState = reducer(initialState, action);
    let expected = fromJS({
        itemLists: [{
          id: 'abc',
          items: [{
            id: 'abcd',
            title: 'test 1',
            listId: 'abc',
            votes: 0
          }, {
            id: 'efgh',
            title: 'test 2',
            listId: 'abc',
            votes: 0
          }],
          remainingVotes: 3
        }, {
          id: 'def',
          items: [{
            title: 'test 3'
          }, {
            title: 'test 4'
          }],
          remainingVotes: 8
        }]
      });

    expect(finalState).to.equal(expected);
  });

  it('sets the remainingVotes to 10 on GET_REMAINING_VOTES_SUCCESS when there have been no votes', () => {
    let initialState = BASE_STATE;

    let action = Actions.getRemainingVotesSuccess({
      remainingVotes: {
        'abc': 3
      }
    });
    let finalState = reducer(initialState, action);
    let expected = fromJS({
        itemLists: [{
          id: 'abc',
          items: [{
            id: 'abcd',
            title: 'test 1',
            listId: 'abc',
            votes: 0
          }, {
            id: 'efgh',
            title: 'test 2',
            listId: 'abc',
            votes: 0
          }],
          remainingVotes: 3
        }, {
          id: 'def',
          items: [{
            title: 'test 3'
          }, {
            title: 'test 4'
          }],
          remainingVotes: 10
        }]
      });

    expect(finalState).to.equal(expected);
  });
});
