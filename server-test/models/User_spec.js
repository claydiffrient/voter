/*eslint-env mocha */
import { expect } from 'chai';
import thinkyConstructor from 'thinky';
import config from 'config';
import UserModelFactory from '../../server/models/User';

describe('User Model', () => {
  let thinky;
  let UserModel;
  let baseUser;

  before(() => {
    thinky = thinkyConstructor(config.get('db'));
    UserModel = UserModelFactory(thinky);
  });

  beforeEach(() => {
    baseUser = new UserModel({
      email: 'test@example.com',
      name: 'Tester McTesty',
      username: 'testerman'
    });
    baseUser.setPassword('sekrit');
  });

  afterEach(() => {
    baseUser = null;
  });

  describe('#toPublic', () => {
    it('removes the hash and salt properties', () => {

      expect(baseUser.hash).to.be.ok;
      expect(baseUser.salt).to.be.ok;

      const sanitized = baseUser.toPublic();

      expect(sanitized.hash).to.not.be.ok;
      expect(sanitized.salt).to.not.be.ok;

    });
  });

  describe('#validPassword', () => {

    it('returns true when the password is valid', () => {
      const actual = baseUser.validPassword('sekrit');
      expect(actual).to.be.ok;
    });

    it('returns false when the password is not valid', () => {
      const actual = baseUser.validPassword('secret');
      expect(actual).to.not.be.ok;
    });
  });
});
