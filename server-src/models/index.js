import thinkyConstructor from 'thinky';
import config from 'config';
import fs from 'fs';
import path from 'path';

const thinky = thinkyConstructor(config.get('db'));

let models = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach((file) => {
    models[file.split('.')[0]] = require(path.join(__dirname, file)).default(thinky);
  });

export default models;
