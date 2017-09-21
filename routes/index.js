const router = require('express').Router();
const api = require('./api');

router.get('/', (req, res, next) => {
  res.send('index');
  next();
});

module.exports = router;
