/*eslint-env mocha */
import { expect } from 'chai';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import { Map, List, fromJS } from 'immutable';
import reducer from '../../src/reducers';
import { addItemSuccess, removeItem, placeVoteSuccess, gotItems } from '../../src/actions';

chai.use(chaiImmutable);

describe('Reducers', () => {
  it('adds an item to the list of items on ADD_ITEM', () => {
    let initialState = Map({
        items: List([1, 2, 3])
      });

    let action = addItemSuccess(4);

    let finalState = reducer(initialState, action);
    expect(finalState.get('items')).to.deep.equal(List([1, 2, 3, 4]));
  });

  it('removes an item from the list of items on REMOVE_ITEM', () => {
    let initialState = Map({
      items: fromJS([{id: 1}, {id: 2}, {id: 3}])
    });

    let action = removeItem({id: 2});

    let finalState = reducer(initialState, action);
    expect(finalState.get('items')).to.deep.equal(fromJS([{id: 1}, {id: 3}]));
  });

  it('adds a vote count on PLACE_VOTE_SUCCESS', () => {
    let initialState = Map({
      items: fromJS([{id: 1, votes: 0}, {id: 2, votes: 0}, {id: 3, votes: 0}])
    });

    let action = placeVoteSuccess({id: 3});

    let finalState = reducer(initialState, action);
    let expected = fromJS([{id: 1, votes: 0}, {id: 2, votes: 0}, {id: 3, votes: 1}]);
    expect(finalState.get('items')).to.equal(expected);
  });

  it('reduces the remainingVotes on PLACE_VOTE', () => {
    let initialState = Map({
      items: fromJS([{id: 1, votes: 0}, {id: 2, votes: 0}, {id: 3, votes: 0}]),
      remainingVotes: 10
    });

    let action = placeVoteSuccess({id: 3});
    let finalState = reducer(initialState, action);
    expect(finalState.get('remainingVotes')).to.equal(9);
  });

  it('adds items to the store on GOT_ITEMS', () => {
    let initialState = Map({
      items: fromJS([{id: 1, votes: 0}, {id: 2, votes: 0}, {id: 3, votes: 0}])
    });

    let action = gotItems([{id: 10, votes: 10}]);
    let finalState = reducer(initialState, action);
    let expected = fromJS([{id: 1, votes: 0}, {id: 2, votes: 0}, {id: 3, votes: 0}, {id: 10, votes: 10}]);
    expect(finalState.get('items')).to.equal(expected);
  });
});
