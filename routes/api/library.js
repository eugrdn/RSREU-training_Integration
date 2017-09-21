const router = require('express').Router();

const service = require('../../services/library.service');
const MongoDB = require('../../db/index');


router
  .get('/', (req, res) => {
    /**
     * need it?
     */
    MongoDB.connect().then(() => {
      service
        .getAllBooks()
        .then(data => res.send(data))
        .catch(err => res.send(err));
        //***
        MongoDB.close();
    });
  })
  .get('/recent', (req, res) => {})
  .get('/popular', (req, res) => {
    service
      .getMostPopular()
      .then(data => res.send(data))
      .catch(err => res.send(err));
  })
  .get('/free', (req, res) => {
    service
      .getFreeBooks()
      .then(data => res.send(data))
      .catch(err => res.send(err));
  })
  .get('/:bookId', (req, res) => {})
  .post('/', ({ body: book }, res) => {
    service
      .addBook(book)
      .then(data => res.send(data))
      .catch(err => res.send(err));
  });

module.exports = router;
