const db = require('../db/index').instance();

const bookCol = require('../utils/dbQuery.util')(db)('books');
const notificationCol = require('../utils/dbQuery.util')(db)('notifications');

module.exports = {
  getAllBooks: () => bookCol.find({}).toArray(),

  getFreeBooks: () => bookCol.find({ price: 0 }).toArray(),

  getMostPopular: () => bookCol.find({ rating: { $gte: 4.5 } }).toArray(),

  addBook: book => bookCol.insert(book)
};
