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

app.get('/', (req, res) => {
  res.render('index', { html: '<h1>Server Running</h1>'});
});

httpServer.listen(port);
console.log(`Voter listening on ${port}`);
