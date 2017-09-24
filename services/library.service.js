const ObjectID = require('mongodb').ObjectID;
const db = require('../db/index').getInstance();

const bookCol = db.collection('books');
const filterCol = db.collection('filters');
const historyCol = db.collection('history');

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

  createBook(book) {
    return bookCol.insertOne(book).then(res => res.ops[0], err => err);
  },

  getFilters() {
    return filterCol.find({}).toArray();
  },

  getHistory() {
    return historyCol.find({}).toArray();
  }
};

module.exports = service;
