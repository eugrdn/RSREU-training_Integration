const router = require('express').Router();
const books = require('../models/book.json');

router.get('/books', function(request, response) {
  response.send(books.items);
});

router.get('/books/:id', function(request, response) {
  var id = request.params.id,
    book = books.items.find(function(book) {
      return book.id === id;
    });
  response.send(book);
});

module.exports = router;