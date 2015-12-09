/*eslint-env mocha */
import { expect } from 'chai';
import * as Utils from '../src/utils';

describe('Utils Specs', () => {
  describe('setToken', () => {
    it('sets the token appropriately', () => {
      let expected = {token: 'test'};
      Utils.setToken(expected);
      expect(Utils.getToken()).to.deep.equal(JSON.stringify(expected));
    });
  });
});
