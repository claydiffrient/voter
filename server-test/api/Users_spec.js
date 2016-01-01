/*eslint-env mocha */
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../server/app';
import thinkyConstructor from 'thinky';
import config from 'config';
import UserModelFactory from '../../server/models/User';
import { each, parallel } from 'async';

describe('User API', () => {
  describe('GetUsers', () => {
    let UserModel;

    before((done) => {
      const thinky = thinkyConstructor(config.get('db'));
      UserModel = UserModelFactory(thinky);
      parallel([
        (callback) => {
          let user = new UserModel({
            email: 'test@example.com',
            name: 'Tester McTesty',
            username: 'testerman'
          });

          user.save((err, saved) => {
            if (err) throw err;
            console.log(saved);
            callback();
          });
        },
        (callback) => {
          let user = new UserModel({
            email: 'test2@example.com',
            name: 'Tester McTesty Jr.',
            username: 'testerman2'
          });

          user.save((err) => {
            callback();
          });
        },
        (callback) => {
          let user = new UserModel({
            email: 'test3@example.com',
            name: 'Tester McTesty III',
            username: 'testerman3'
          });

          user.save((err) => {
            callback();
          });
        }
      ], () => {
        done();
      });
    });

    after((done) => {
      UserModel.run().then((users) => {
        each(users, (user, callback) => {
          user.purge().then(() => callback());
        }, (err) => {
          if (err) throw err;
          done();
        });
      });
    });

    it('returns a list of users', (done) => {
      supertest(app)
        .get('/api/v1/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          // expect(res.body).to.be.an('array');
          // expect(res.body.length).to.equal(3);
          done(err);
        });
    });
  });
});
