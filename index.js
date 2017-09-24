const MongoDB = require('./db/index');
const MONGO_URL = 'mongodb://localhost:27017/library';

MongoDB.connect(MONGO_URL)
  .then(() => {
    console.log(`Connected succsessfully!`);
    require('./server');
  })
  .catch(err => console.log(`An error with connection to db ${err}!`));
