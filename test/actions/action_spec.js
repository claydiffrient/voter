/*eslint-env mocha */
import { expect } from 'chai';
import { addItem } from '../../src/actions';

describe('Actions', () => {
  describe('addItem', () => {
    it('returns a ADD_ITEM action', () => {
      let actual = addItem(3);
      let expected = {
        type: 'ADD_ITEM',
        payload: 3
      };

      expect(actual).to.deep.equal(expected);

    });
  });
});
