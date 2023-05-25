function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last > accountB.name.last ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  return books.filter((book) =>
    book.borrows.some((borrow) => account.id === borrow.id)
  ).length;
}

function getBooksPossessedByAccount(account, books, authors) {
  return books
    .filter((book) =>
      book.borrows.some(
        (borrow) => account.id === borrow.id && !borrow.returned
      )
    )
    .reduce((resultsBooks, book, index) => {
      resultsBooks.push(book);
      resultsBooks[index].author = authors.find(
        (author) => author.id === book.authorId
      );
      return resultsBooks;
    }, []);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
