/*eslint-env mocha */
import { expect } from 'chai';
import atob from 'atob';
import tk from 'timekeeper';
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

  describe('#generateJWT', () => {
    const TIME = 1451542611955;
    before(() => {
      tk.freeze(TIME);
    });

    after(() => {
      tk.reset();
    });

    const parseJWT = (token) => {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(atob(base64));
    };

    it('generates a valid JWT', () => {
      const jwt = baseUser.generateJWT();
      const parsed = parseJWT(jwt);

      let expectedTime = new Date(TIME);
      expectedTime.setDate(expectedTime.getDate() + 60);
      expectedTime = parseInt(expectedTime.getTime() / 1000, 10);

      expect(parsed.username).to.equal(baseUser.username);
      expect(parsed.exp).to.equal(expectedTime);
    });
  });
});
