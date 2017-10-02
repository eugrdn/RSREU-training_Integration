const router = require('express').Router();
const meetQuery = require('../utils/meet-query.util');
const bookService = require('../services/book.service');
const categoryService = require('../services/category.service');
const filterService = require('../services/filter.service');

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
      .then(([filter, category]) => {
        bookService
          .getAllBooks()
          .then(data => {
            const requiredBooks = data.filter(book =>
              meetQuery({book, search, filter, category})
            );

            return res.send(requiredBooks);
          })
          .catch(err => res.send(err));
      })
      .catch(err => res.send(err));
  });
  /**
   * TODO
   * [ ] create book
   * [ ] update book
   * [ ] delete book
   */

module.exports = router;
