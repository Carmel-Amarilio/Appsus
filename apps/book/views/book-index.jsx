const { useState, useEffect } = React;
import { bookService } from "../services/book.service.js";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js";
import { BookList } from "../cmps/book-list.jsx";
import { BookFilter } from "../cmps/book-filter.jsx";
import { BookAdd } from "../cmps/book-add.jsx";

export function BookIndex() {
  const [books, setBooks] = useState([]);
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    getAllBooks();
  }, []);

  useEffect(() => {
    getAllBooks();
  }, [filterBy]);

  async function getAllBooks() {
    setBooks(await bookService.query(filterBy));
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
        showSuccessMsg(`Book Removed! ${bookId}`);
      })
      .catch((err) => {
        console.log("err:", err);
        showErrorMsg("Problem Removing " + bookId);
      });
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
  }

  async function handleBookAdded() {
    await getAllBooks();
    setIsAdd(!isAdd);
  }

  if (!books) return <div>Loading...</div>;
  return (
    <div  className="book-page">
      <h1>Our Books</h1>
      <button onClick={() => setIsAdd(!isAdd)}>Add a New Book</button>
      {isAdd && <BookAdd onBookAdded={async () => await handleBookAdded()} />}
      <BookFilter
        filterBy={filterBy}
        onSetFilterBy={onSetFilterBy}
      ></BookFilter>
      <BookList books={books} onRemoveBook={onRemoveBook}></BookList>
    </div>
  );
}
