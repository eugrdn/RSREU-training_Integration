const filterCol = require('../db/index')
  .getCollection('filters');

module.exports = {
  getFilters() {
    return filterCol.find({}).toArray();
  }
};
