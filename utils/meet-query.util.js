function meetQuery({book, search, filter, category}) {
  const expectations = [
    meetSearch(search),
    meetFilter(filter),
    meetCategory(category)
  ];

  return expectations.filter(f => f(book)).length === expectations.length;
}

function meetSearch(queryString) {
  return book =>
    queryString
      ? queryString.includes(book.title) || queryString.includes(book.author)
      : true;
}

function meetFilter(filter) {
  return book => {
    if (filter) {
      switch (filter.type) {
        case 'all':
          return true;
        case 'recent':
          //TODO
          return true;
        case 'popular':
          return book.rating >= 4;
        case 'free':
          return book.cost === 0;
      }
    }
    return true;
  };
}

function meetCategory(category) {
  return book => (category ? book.categories.includes(category.type) : true);
}

module.exports = meetQuery;
