// require our dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const engines = require('consolidate');
const port = process.env.PORT || 8080;

app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(
  express.static(path.resolve(__dirname, 'node_modules/library-ui/build')),
);

// body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// route app
const router = require('./routes');
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running: localhost:${port}`);
});
