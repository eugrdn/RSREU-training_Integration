const router = require('express').Router();
const library = require('./library');

router.use('/library', library);

module.exports = router;
