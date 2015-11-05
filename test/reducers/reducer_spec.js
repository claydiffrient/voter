/*eslint-env mocha */
import { expect } from 'chai';
import { Map, List } from 'immutable';
import reducer from '../../src/reducers';
import { addItem } from '../../src/actions';

describe('Reducers', () => {
  it('adds an item to the list of items on ADD_ITEM', () => {
    let initialState = Map({
        items: List([1, 2, 3])
      });

    let action = addItem(4);

    let finalState = reducer(initialState, action);
    expect(finalState.get('items')).to.deep.equal(List([1, 2, 3, 4]));
  });
});
