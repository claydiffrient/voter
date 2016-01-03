/*eslint-env mocha */
import { expect } from 'chai';
import * as Utils from '../src/utils';

describe('Utils Specs', () => {
  describe('setToken', () => {
    it('sets the token appropriately', () => {
      let expected = 'abc';
      Utils.setToken(expected);
      expect(Utils.getToken()).to.deep.equal(expected);
    });

  });

  describe('parseJWT', () => {
    it('parses the JWT as expected', function () {
      const testJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImNsYXlkaWZmcmllbnQiLCJleHAiOjE0NTU1OTI4ODMsImlhdCI6MTQ1MDQwODg4M30.eTXtoselT6BzI7X2BbIvjy4H4KGqVYUGCLetZYz4M2Y';
      const parsed = Utils.parseJWT(testJWT);
      const expected = {username: 'claydiffrient', exp: 1455592883, iat: 1450408883}
      expect(parsed).to.deep.equal(expected);
    });
  });
});
