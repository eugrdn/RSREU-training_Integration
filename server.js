const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const MongoDB = require('./db/index');
const app = express();

const routes = require('./routes/index');
const api = require('./routes/api/index');

const PORT = process.env.PORT || 4200;

/**
 * middleware
 */
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

/**
 * routes
 */

app.use('/', routes);
app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
