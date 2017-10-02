const router = require('express').Router();
const meetQuery = require('../utils/meet-query.util');
const bookService = require('../services/book.service');
const categoryService = require('../services/category.service');
const filterService = require('../services/filter.service');

const sendQueryBooks = ({search, filter, category}, response) =>
  bookService
    .getAllBooks()
    .then(data => {
      const requiredBooks = data.filter(book =>
        meetQuery({book, search, filter, category})
      );

      return response.send(requiredBooks);
    })
    .catch(err => Promise.reject(err));

router
  .get('/categories', (req, res) => {
    categoryService
      .getAllCategories()
      .then(data => res.send(data))
      .catch(err => res.send(err));
  })
  .get('/filters', (req, res) => {
    filterService
      .getAllFilters()
      .then(data => res.send(data))
      .catch(err => res.send(err));
  })
  .get('/books', (req, res) => {
    const {search, activeFilter, activeCategory} = req.query;

    Promise.all([
      filterService.getFilterById(+activeFilter),
      categoryService.getCategoryById(+activeCategory)
    ])
      .then(([filter, category]) =>
        sendQueryBooks({search, filter, category}, res)
      )
      .catch(err => res.send(err));
  })
  .post('/book', (req, res) => {
    const {
      search,
      activeFilter,
      activeCategory,
      id,
      action,
      rating,
      book
    } = req.body;

    Promise.all([
      filterService.getFilterById(+activeFilter),
      categoryService.getCategoryById(+activeCategory)
    ])
      .then(data => {
        let dbQuery;

        switch (action) {
          case 'create': {
            dbQuery = bookService.createBook(book);
          }
          case 'update': {
            dbQuery = bookService.updateBook(id, rating);
          }
          case 'delete': {
            dbQuery = bookService.deleteBook(id);
          }
        }

        return Promise.all([data, dbQuery]);
      })
      .then(([{category, filter}]) =>
        sendQueryBooks({search, filter, category}, res)
      )
      .catch(err => res.send(err));
  });

module.exports = router;
