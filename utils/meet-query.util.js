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

// TODO with type
function meetFilter(filter) {
  return book => {
    if (filter) {
      switch (filter.title) {
        case 'All Books':
          return true;
        case 'Most Recent':
          //TODO
          return true;
        case 'Most Popular':
          return book.rating >= 4;
        case 'Free Books':
          return book.cost === 0;
      }
    }
    return true;
  };
}

// TODO with type?
function meetCategory(category) {
  return book => true;
}

module.exports = meetQuery;
