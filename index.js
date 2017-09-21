const MongoDB = require('./db/index');

MongoDB.connect().then(
  () => {
    console.log(`Connected succsessfully!`);
    require('./server');
  },
  err => console.log(`An error with connection to db ${err}!`)
);
