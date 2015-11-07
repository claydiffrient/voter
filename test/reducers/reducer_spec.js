/*eslint-env mocha */
import { expect } from 'chai';
import { Map, List, fromJS } from 'immutable';
import reducer from '../../src/reducers';
import { addItem, removeItem } from '../../src/actions';

describe('Reducers', () => {
  it('adds an item to the list of items on ADD_ITEM', () => {
    let initialState = Map({
        items: List([1, 2, 3])
      });

    let action = addItem(4);

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
});
