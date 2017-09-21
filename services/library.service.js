const db = require('../db/index').instance();

const bookCol = require('../utils/dbQuery.util')(db)('books');
const notificationCol = require('../utils/dbQuery.util')(db)('notifications');

const service = {
  getAllBooks() {
    return bookCol.find({}).toArray();
  },

  getFreeBooks() {
    return bookCol.find({ price: 0 }).toArray();
  },

  getMostPopular() {
    return bookCol.find({ rating: { $gte: 4.5 } }).toArray();
  },

  addBook(book) {
    return bookCol.insert(book);
  }
};

module.exports = service;
