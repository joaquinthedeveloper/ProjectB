function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let available = [];
  let unavailable = [];
  const bookStatuses = [];
  books.forEach((book) => {
    const isBookReturned = book.borrows[0].returned;

    if (isBookReturned) {
      unavailable.push(book);
    } else {
      available.push(book);
    }
  });
  bookStatuses.push(available);
  bookStatuses.push(unavailable);
  return bookStatuses;
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  let borrowArray = book.borrows;
  borrowArray.forEach(({id, returned}) => {
    let account = accounts.find((acc) => acc.id === id);
    let obj = account;
    obj["returned"] = returned;
    result.push(obj);
  });
  console.log(result);
  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
