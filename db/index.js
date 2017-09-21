const MongoClient = require('mongodb');
const MONGO_URL = 'mongodb://localhost:27017/library';

let _db;

module.exports = {
  connect(cb) {
    return MongoClient.connect(MONGO_URL)
      .then(db => (_db = db))
      .catch(err => err);
  },

  instance() {
    return _db;
  }
};
