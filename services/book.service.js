const ObjectID = require('mongodb').ObjectID;
const bookCol = require('../db/index').getCollection('books');

const service = {
  getAllBooks(callback) {
    return bookCol.find({}).toArray(callback);
  },

  createBook(book, callback) {
    return bookCol.insertOne(book, callback);
  },

  updateBookRating(_id, rating, callback) {
    return bookCol.update({_id: ObjectID(_id)}, {$set: {rating}}, callback);
  },

  deleteBook(_id, callback) {
    return bookCol.remove({_id: ObjectID(_id)}, callback);
  },
};

module.exports = service;
