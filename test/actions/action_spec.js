/*eslint-env mocha */
import { expect } from 'chai';
import { addItem, removeItem, placeVote } from '../../src/actions';

describe('Actions', () => {
  describe('addItem', () => {
    it('returns a ADD_ITEM action', () => {
      const actual = addItem(3);
      const expected = {
        type: 'ADD_ITEM',
        payload: 3
      };

      expect(actual).to.deep.equal(expected);

    });
  });

  describe('removeItem', () => {
    it('returns a REMOVE_ITEM action', () => {
      const actual = removeItem({id: 1});
      const expected = {
        type: 'REMOVE_ITEM',
        payload: {
          id: 1
        }
      };

      expect(actual).to.deep.equal(expected);
    });
  });

  describe('placeVote', () => {
    it('returns a PLACE_VOTE action', () => {
      const actual = placeVote({id: 1});
      const expected = {
        type: 'PLACE_VOTE',
        payload: {
          id: 1
        }
      };
    });
  });
});
