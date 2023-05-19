function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((borrowCount, { borrows }) => {
    const mostRecent = borrows[0];
    if (!mostRecent.returned) borrowCount++;
    return borrowCount;
  }, 0);
}

function getMostCommonGenres(books) {
  return orderAndLimit(
    books.reduce((genres, book) => {
      const found = genres.find((genre) => genre.name === book.genre);
      !found ? genres.push({ name: book.genre, count: 1 }) : found.count++;
      return genres;
    }, [])
  );
}

function getMostPopularBooks(books) {
  return orderAndLimit(
    books.map((book) => ({ name: book.title, count: book.borrows.length }))
  );
}

function getMostPopularAuthors(books, authors) {
  return orderAndLimit(
    authors.map((author) => ({
      name: `${author.name.first} ${author.name.last}`,
      count: books
        .filter((book) => book.authorId === author.id)
        .reduce((total, book) => total + book.borrows.length, 0),
    }))
  );
}

function orderAndLimit(array) {
  return array
    .sort(({ count: count1 }, { count: count2 }) => count2 - count1)
    .slice(0, 5);
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
