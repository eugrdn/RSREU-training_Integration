var fs = require('fs');
// require express
var express = require('express');
var path = require('path');
// require api
var api = require('./api');

// create our router object
var router = express.Router();

// export our router
module.exports = router;

router.get('/', function(request, response) {
    response.send('main path');
});

router.use('/api', api);
