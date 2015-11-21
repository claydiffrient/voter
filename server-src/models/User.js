import config from 'config';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export default function (thinky) {

  const { type } = thinky;

  let User = thinky.createModel('users', {
    id: type.string(),
    email: type.string().required(),
    hash: type.string(),
    salt: type.string()
  });

  User.define('setPassword', function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  });

  User.define('validPassword', function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
  });

  User.define('generateJWT', function () {
    const today = new Date();
    const exp = new Date(today);

    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id: this.id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000, 10)
    }, config.get('jwt.secret'));
  });

  return User;
};
