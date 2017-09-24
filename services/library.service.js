const ObjectID = require('mongodb').ObjectID;
const bookCol = require('../db/index').getCollection('books');

// TODO
const service = {
  getAllBooks() {
    return bookCol.find({}).toArray();
  },

  getFreeBooks() {
    return bookCol.find({price: 0}).toArray();
  },

  getMostPopular() {
    return bookCol.find({rating: {$gte: 4.5}}).toArray();
  },

  getBook(_id) {
    return bookCol.findOne(ObjectID(_id));
  },

  addBook(book) {
    return bookCol.insertOne(book).then(res => res.ops[0], err => err);
  }
};

module.exports = service;
