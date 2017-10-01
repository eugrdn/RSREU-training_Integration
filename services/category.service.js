const categoryCol = require('../db/index')
  .getCollection('categories');

module.exports = {
  getCategories() {
    return categoryCol.find({}).toArray();
  }
};
