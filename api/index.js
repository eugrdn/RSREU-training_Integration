const router = require('express').Router();
const bookService = require('../services/book.service');
const categoryService = require('../services/category.service');
const filterService = require('../services/filter.service');

router
  .get('/categories', (req, res) => {
    categoryService
      .getCategories()
      .then(data => res.send(data))
      .catch(err => res.send(err));
  })
  .get('/filters', (req, res) => {
    filterService
      .getFilters()
      .then(data => res.send(data))
      .catch(err => res.send(err));
  })
  .get('/books', (req, res) => {
    bookService
      .getAllBooks()
      .then(data => res.send(data))
      .catch(err => res.send(err));
  })
  .get('/books/:id', (req, res) => {
    const id = req.params.id;
    /*
      params:
      * activeCategory - id of category
      * search - serach string
      * activeFilter - id of filter
    */
    bookService
      .getBookById(id)
      .then(data => res.send(data))
      .catch(err => res.send(err));
  });

module.exports = router;
