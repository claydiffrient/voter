/*eslint-env mocha */
import { expect } from 'chai';
import when from 'when';
import { addItem, removeItem, placeVote } from '../../src/actions';

describe('Actions', () => {
  describe('addItem', () => {
    it('returns a function', () => {
      const actual = addItem(3);
      expect(actual).to.be.a('function');
    });

    it('calls addItemSuccess on success', () => {
      const lib = {
        post () {
          return when({data:3});
        }
      };
      const expected = {
        type: 'ADD_ITEM_SUCCESS',
        payload: 3
      };
      addItem(3, lib)((action) => {
        expect(action).to.deep.equal(expected);
      });

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
