const filterCol = require('../db/index')
  .getCollection('filters');

module.exports = {
  getAllFilters() {
    return filterCol.find({}).toArray();
  },
  getFilterById(id) {
    return filterCol.findOne({id});
  }
};
