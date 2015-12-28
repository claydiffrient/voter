/*eslint-env mocha */
import { expect } from 'chai';
import thinkyConstructor from 'thinky';
import config from 'config';
import UserModelFactory from '../../server-src/models/User';

describe('User Model', () => {
  let thinky;
  let UserModel;

  before(() => {
    thinky = thinkyConstructor(config.get('db'));
  });

  beforeEach(() => {
    UserModel = UserModelFactory(thinky);
  });

  describe('#toPublic', () => {
    it('removes the hash and salt properties', () => {
      const user = new UserModel({
        email: 'test@example.com',
        name: 'Tester McTesty',
        username: 'testerman'
      });
      user.setPassword('sekrit');

      expect(user.hash).to.be.ok;
      expect(user.salt).to.be.ok;

      const sanitized = user.toPublic();

      expect(sanitized.hash).to.not.be.ok;
      expect(sanitized.salt).to.not.be.ok;

    });
  });
});