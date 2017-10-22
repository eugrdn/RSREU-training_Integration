const router = require('express').Router();
const meetQuery = require('../utils/meet-query.util');
const bookService = require('../services/book.service');
const categoryService = require('../services/category.service');
const filterService = require('../services/filter.service');

router
  .get('/categories', (req, res) => {
    categoryService.getAllCategories((err, categories) => {
      if (err) {
        console.error(err);
        return res.send([]);
      }

      return res.send(categories);
    });
  })

  .get('/filters', (req, res) => {
    filterService.getAllFilters((err, filters) => {
      if (err) {
        console.error(err);
        return res.send([]);
      }

      return res.send(filters);
    });
  })

  .get('/books', (req, res) => {
    const {search, activeFilter, activeCategory} = req.query;

    bookService.getAllBooks((err, books) => {
      if (err) {
        console.error(err);
        return res.send([]);
      }

      const requiredBooks = books.filter(book =>
        meetQuery(book, search, activeFilter, activeCategory));

      return res.send(requiredBooks);
    });
  })

  .post('/book', (req, res) => {
    const action = req.body.action;
    const {search, activeFilter, activeCategory} = req.body;

    const getAllBooksCallback = (err, cursor) => {
      if (err) {
        console.error(err);
        return res.send([]);
      }

      bookService.getAllBooks((err, books) => {
        if (err) {
          console.error(err);
          return res.send([]);
        }

        const requiredBooks = books.filter(book =>
          meetQuery(book, search, activeFilter, activeCategory));

        return res.send(requiredBooks);
      });
    };

    switch (action) {
      case 'create': {
        const {book} = req.body;
        return bookService.createBook(book, getAllBooksCallback);
      }
      case 'update': {
        const {_id, rating} = req.body;
        return bookService.updateBookRating(_id, rating, getAllBooksCallback);
      }
      case 'delete': {
        const {_id} = req.body;
        return bookService.deleteBook(_id, getAllBooksCallback);
      }
    }
  });

module.exports = router;
