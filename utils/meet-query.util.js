function meetQuery({book, search, filter, category}) {
  const expectations = [
    meetSearch(search),
    meetFilter(filter),
    meetCategory(category)
  ];

  return expectations.filter(f => f(book)).length === expectations.length;
}

function meetSearch(queryString) {
  return ({title = '', firstName = '', lastName = ''}) =>
    queryString
      ? title.includes(queryString) ||
        firstName.includes(queryString) ||
        lastName.includes(queryString)
      : true;
}

const POPULAR_RATING = 4;

function meetFilter(filter) {
  return book => {
    switch (filter) {
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

function meetCategory(category) {
  return book => (category ? book.categories.includes(category) : true);
}

module.exports = meetQuery;
