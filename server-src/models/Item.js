import thinkyConstructor from 'thinky';
import config from 'config';

const thinky = thinkyConstructor(config.get('db'));

const { type } = thinky;

/**
 * Model representing a list which contains items that
 * can be voted on.
 */
let VoteList = thinky.createModel('votelists', {
  id: type.string(),
  ownerId: type.string(),
  listId: type.string(),
  title: type.string().required(),
  votes: type.number().integer().default(0)
});

export default VoteList;
