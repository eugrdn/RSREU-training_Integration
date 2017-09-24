const router = require('express').Router();
const service = require('../../services/library.service');

const handleDBrequest = (promise, res) =>
  promise
    .then(data => res.send(data))
    .catch(err => res.send(err));

router
  .get('/', (req, res) => {
    handleDBrequest(
      service.getAllBooks(),
      res
    );
  })
  
  .get('/recent', (req, res) => {})
  
  .get('/popular', (req, res) => {
    handleDBrequest(
      service.getMostPopular(),
      res
    );
  })

  .get('/free', (req, res) => {
    handleDBrequest(
      service.getFreeBooks(),
      res
    );
  })

  .get('/:bookId', (req, res) => {
    const id = req.params.bookId;
    handleDBrequest(
      service.getBook(id),
      res
    );
  })

  .post('/', ({body: book}, res) => {
    handleDBrequest(
      service.addBook(book),
      res
    );
  });

module.exports = router;
