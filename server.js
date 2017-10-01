// require our dependencies
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;

// body parser
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// route app
var router = require('./routes');
app.use('/', router);

app.listen(port, function() {
  console.log('Server is running');
});
