const curry = require('ramda').curry;

const selectCollection = (db, collection) => db[collection];

module.exports = curry(selectCollection);
