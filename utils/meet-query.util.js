function meetQuery({book, search, filter, category}) {
  const expectations = [
    meetFilter(filter),
    meetSearch(search),
    meetCategory(category)
  ];

  return expectations.filter(f => f(book)).length === expectations.length;
}

const POPULAR_RATING = 4;

function meetFilter(filterType) {
  return book => {
    switch (filterType) {
      case 'all':
        return true;
      case 'recent':
        return true;
      case 'popular':
        return book.rating >= POPULAR_RATING;
      case 'free':
        return book.cost == 0;
      default:
        return true;
    }
  };
}

function meetSearch(queryString) {
  return ({title = '', firstName = '', lastName = ''}) =>
    queryString
      ? title.includes(queryString) ||
        firstName.includes(queryString) ||
        lastName.includes(queryString)
      : true;
}

function meetCategory(categoryType) {
  return book => (categoryType ? book.categories.includes(categoryType) : true);
}

module.exports = meetQuery;
