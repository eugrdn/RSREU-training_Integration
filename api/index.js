const router = require('express').Router();
const books = require('../models/book.json');
const categories = require('../models/categories.json');
const filters = require('../models/filters.json');

router
  .get('/categories', (req, res) => {
    res.send(categories);
  })
  .get('/filters', (req, res) => {
    res.send(filters);
  })
  .get('/books', (req, res) => {
    res.send(books);
  });

module.exports = router;
