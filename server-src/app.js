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

import r from 'rethinkdb';
import renderApp from './ssrApp';

const dbConfig = {
  host: 'db',
  port: 28015,
  db: 'test'
};

// import apiRoutes from './api'

const app = express();
const httpServer = http.Server(app);
const port = 3000;



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(serveStatic(path.join(__dirname, '..', 'built', 'client')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', renderApp);

// TODO: Extract this out to a seperate module for api things
app.get('/api/v1/items', (req, res) => {
  r.connect(dbConfig)
   .then((conn) => {
     return r.table('items')
             .run(conn)
             .then((cursor) => {
               return cursor.toArray();
             })
             .then((items) => res.json(items));
   });
});

app.post('/api/v1/items', (req, res) => {
  r.connect(dbConfig)
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

httpServer.listen(port);
console.log(`Voter listening on ${port}`);
