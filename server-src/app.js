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
import User from './models/User';
import jwt from 'express-jwt';

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

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  (email, password, done) => {
    User
      .filter({ email })
      .run()
      .then((result) => {
        if (!result.length) {
          return done(null, false, { message: 'Incorrect email'});
        }
        if (!result[0].validPassword(password)) {
          return done(null, false, { message: 'Incorrect password'});
        }
        return done(null, result[0]);
      });
  }
));

app.use(passport.initialize());

// app.get('/', renderApp);
app.get('/', (req, res) => {
  res.render('index', {html: '<div id="main"></div>'});
});

// TODO: Extract this out to a seperate module for api things
app.get('/api/v1/items', (req, res) => {
  r.connect(config.get('db'))
   .then((conn) => {
     return r.table('items')
             .run(conn)
             .then((cursor) => {
               return cursor.toArray();
             })
             .then((items) => res.json(items));
   });
});

app.post('/api/v1/items', auth, (req, res) => {
  r.connect(config.get('db'))
   .then((conn) => {
     return r.table('items')
             .insert(req.body)
             .run(conn)
             .then((response) => {
               return Object.assign({}, req.body, {id: response.generated_keys[0]});
             })
             .then((item) => res.json(item));
   });
});

app.post('/api/v1/items/:id/vote', (req, res) => {
  r.connect(config.get('db'))
   .then((conn) => {
     return r.table('items')
             .get(req.params.id)
             .update({
               votes: r.row('votes').default(0).add(1)
             }, {
               returnChanges: true
             })
             .run(conn)
             .then((response) => {
               res.json(response.changes[0].new_val);
             });
   });
});

app.post('/register', (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({message: 'You must provide an email and a password.'});
  }

  var user = new User({
    email: req.body.email
  });
  user.setPassword(req.body.password);

  user.save((err) => {
    if (err) { return next(err); }
    return res.json({token: user.generateJWT()});
  });
});

app.post('/login', (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({message: 'You must provide an email and a password.'});
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

httpServer.listen(port);
console.log(`Voter listening on ${port}`);
