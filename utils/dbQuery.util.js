const curry = require('ramda').curry;

/* const curryN = require('ramda').curryN;
const query = (db, collectionName, selector, ...query) =>
  db.collection(collectionName)[selector](...query);
module.exports = curryN(4, query);
*/

const selectCollection = (db, collection) => db[collection];

module.exports = curry(selectCollection);
