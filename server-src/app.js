import 'babel-polyfill'; // For regenerator (for now)
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import methodOverride from 'method-override';
import compress from 'compression';
import serveStatic from 'serve-static';
import http from 'http';
import config from 'config';
import r from 'rethinkdb';
import renderApp from './ssrApp';
import passport from 'passport';
import { Strategy } from 'passport-local';
import jwt from 'express-jwt';
import _ from 'lodash';

let User = {};
let Item = {};
let VoteList = {};
let Vote = {};

const DEFAULT_VOTES_PER_LIST = 10;

// Delay to insure startup of DB has completed in docker compose
setTimeout(() => {
  // Thinky Models
  let models = require('./models/').default;
  User = models.User;
  Item = models.Item;
  VoteList = models.VoteList;
  Vote = models.Vote;
  // const {User, Item, VoteList} = require('./models/');

  /**
   * Setup relationships between models
   */
  // User has lots of vote lists, vote lists have one owner
  User.hasMany(VoteList, 'voteLists', 'id', 'ownerId');
  VoteList.belongsTo(User, 'owner', 'ownerId', 'id');
  // Vote list has many items, items have one vote list
  VoteList.hasMany(Item, 'items', 'id', 'listId');
  Item.belongsTo(VoteList, 'voteList', 'listId', 'id');
  // Vote has one user
  Vote.hasOne(User, 'voter', 'voterId', 'id');
  Vote.hasOne(Item, 'item', 'itemId', 'id');
}, 5000);

// import apiRoutes from './api'

const app = express();
const httpServer = http.Server(app);
const port = 3000;

const auth = jwt({
  secret: config.get('jwt.secret'),
  userProperty: 'payload'
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(serveStatic(path.join(__dirname, '..', 'client')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
const LocalStrategy = Strategy;

passport.use(new LocalStrategy({},
  (username, password, done) => {
    User
      .filter({ username })
      .run()
      .then((result) => {
        if (!result.length) {
          return done(null, false, { message: 'Incorrect username'});
        }
        if (!result[0].validPassword(password)) {
          return done(null, false, { message: 'Incorrect password'});
        }
        return done(null, result[0]);
      });
  }
));

app.use(passport.initialize());

// TODO: Extract this out to a seperate module for api things

/**
 * @api {get} /users
 * @apiName GetUsers
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiSuccess  {Object[]}  users         List of users
 * @apiSuccess  {String}    users.id      Unique user id
 * @apiSuccess  {String}    users.email   User's email address
 * @apiSuccess  {String}    users.name    The user's name
 */
app.get('/api/v1/users', (req, res) => {
  User.run().then((users) => {
    const sanitizedUsers = users.map((user) => user.toPublic());
    res.json(sanitizedUsers);
  });
});

/**
 * @api {get} /users/:id
 * @apiName GetUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiSuccess  {Object}    user          The user object
 * @apiSuccess  {String}    user.id       Unique user id
 * @apiSuccess  {String}    user.email    User's email address
 * @apiSuccess  {String}    user.name     The user's name
 * @apiSuccess  {Object[]}  voteLists     The lists the user owns
 */
app.get('/api/v1/users/:id', (req, res) => {
  User
    .get(req.params.id)
    .getJoin()
    .run()
    .then((user) => {
      res.json(user.toPublic());
    });
});

/**
 * @api {get} /users/:userId/lists
 * @apiName GetUserLists
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {String} userId User's unique ID or 'self'
 *
 * @apiSuccess  {Object[]} lists          List of VoteLists the user has created
 * @apiSuccess  {String}   lists.id       The id of the list
 * @apiSuccess  {String}   lists.ownerId  The id of the user that owns it
 * @apiSuccess  {Object[]} lists.items    The items on the list
 */
app.get('/api/v1/users/:userId/lists', (req, res) => {
  VoteList.filter({ownerId: req.params.userId})
          .run()
          .then((voteLists) => {
            res.json(voteLists);
          });
});

/**
 * @api {post} /users/:userId/lists
 * @apiName CreateUserList
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {String} userId User's unique ID or 'self'
 *
 * @apiSuccess  {Object}    list            List of VoteLists the user has created
 * @apiSuccess  {String}    list.id        The id of the list
 * @apiSuccess  {String}    list.ownerId   The id of the user that owns it
 * @apiSuccess  {Object[]}  list.items     The items on the list
 */
app.post('/api/v1/users/:userId/lists', (req, res, next) => {
  const newList = new VoteList({
    ownerId: req.params.userId
  });
  newList.save((err) => {
    if (err) { return next(err); }
    return res.json(newList);
  });
});

app.get('/api/v1/users/:userId/remainingVotes', auth, (req, res, next) => {
  Vote.filter({voterId: req.params.userId})
      .getJoin({
        item: true
      })
      .run()
      .then((votes) => {
        const groupedVotes = _.groupBy(votes, (vote) => {
          return vote.item.listId;
        });

        let remainingVotesObj = {};
        for (let key in groupedVotes) {
          remainingVotesObj[key] = DEFAULT_VOTES_PER_LIST - groupedVotes[key].length;
        }

        res.json({remainingVotes: remainingVotesObj});
      });
});

app.get('/api/v1/users/:userId/remainingVotes/:listId', auth, (req, res, next) => {
  Vote.filter({voterId: req.params.userId})
      .getJoin({
        item: true
      })
      .run()
      .then((votes) => {
        const groupedVotes = _.groupBy(votes, (vote) => {
          return vote.item.listId;
        });

        let remainingVotes = DEFAULT_VOTES_PER_LIST;
        if (groupedVotes[req.params.listId]) {
          remainingVotes -= groupedVotes[req.params.listId].length;
        }

        const remainingVotesObj = {
          [req.params.listId]: remainingVotes
        };

        res.json(remainingVotesObj);
      });
});

/**
 * @api {get} /lists
 * @apiName GetLists
 * @apiGroup Lists
 * @apiVersion 1.0.0
 *
 *
 * @apiSuccess  {Object[]} lists          List of VoteLists the user has created
 * @apiSuccess  {String}   lists.id       The id of the list
 * @apiSuccess  {String}   lists.ownerId  The id of the user that owns it
 * @apiSuccess  {Object[]} lists.items    The items on the list
 */
app.get('/api/v1/lists', auth, (req, res) => {
  const user = req.payload.username;

  VoteList.getJoin()
          .run()
          .then((voteLists) => {
            res.json(voteLists);
          });
});

/**
 * @api {post} /lists/:listId/
 * @apiName CreateItem
 * @apiGroup Items
 * @apiVersion 1.0.0
 *
 * @apiParam  {String}  listId Id of the list the item is going to be a part of
 */
app.post('/api/v1/lists/:listId', auth, (req, res, next) => {
  let item = new Item({
    ownerId: req.payload.username,
    listId: req.params.listId,
    title: req.body.title
  });

  item.save((err) => {
    if (err) { return next(err); }
    return res.json(item);
  });
});

/**
 * @api {post} /lists/:listId/:itemId/vote
 * @apiName VoteForListItem
 * @apiGroup Items
 * @apiVersion 1.0.0
 *
 * @apiParam  {String}  listId Id of the list
 * @apiParam  {String}  itemId Id of the item to vote for
 */
app.post('/api/v1/lists/:listId/:itemId/vote', auth, (req, res, next) => {
  let vote = new Vote({
    voterId: req.payload.username,
    itemId: req.params.itemId
  });

  vote.save((err) => {
    if (err) { return next(err); }
    Item.get(req.params.itemId)
        .run()
        .then((item) => {
          // Update the item's vote count
          item.votes += 1;
          item.save((err) => {
            if (err) { return next(err); }
            return res.json(vote);
          });
        });
  });
});

app.get('/api/v1/items', (req, res) => {
  Item.run().then((items) => {
    res.json(items);
  });
});

// app.post('/api/v1/items', auth, (req, res) => {
//   r.connect(config.get('db'))
//    .then((conn) => {
//      return r.table('items')
//              .insert(req.body)
//              .run(conn)
//              .then((response) => {
//                return Object.assign({}, req.body, {id: response.generated_keys[0]});
//              })
//              .then((item) => res.json(item));
//    });
// });

// app.post('/api/v1/items/:id/vote', (req, res) => {
//   r.connect(config.get('db'))
//    .then((conn) => {
//      return r.table('items')
//              .get(req.params.id)
//              .update({
//                votes: r.row('votes').default(0).add(1)
//              }, {
//                returnChanges: true
//              })
//              .run(conn)
//              .then((response) => {
//                res.json(response.changes[0].new_val);
//              });
//    });
// });

app.post('/auth/register', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'You must provide a username and a password.'});
  }

  var user = new User({
    email: req.body.email,
    name: req.body.name,
    username: req.body.username
  });
  user.setPassword(req.body.password);

  user.save((err) => {
    if (err) { return next(err); }
    return res.json({token: user.generateJWT()});
  });
});

app.post('/auth/login', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'You must provide a username and a password.'});
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }

    if (user) {
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

// Let the client handle routing at this point
app.get('*', (req, res) => {
  res.render('index', {html: '<div id="main"></div>'});
});

httpServer.listen(port);
console.log(`Voter listening on ${port}`);
