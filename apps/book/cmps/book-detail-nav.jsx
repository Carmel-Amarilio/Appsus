import { bookService } from "../services/book.service.js";
const { useState, useEffect } = React;
const { Link } = ReactRouterDOM;
export function BookDetailsNav({ bookId }) {
  const [nextBookId, setNextBookId] = useState(null);
  const [prevBookId, setPrevBookId] = useState(null);
  async function getNextBook() {
    setNextBookId(await bookService.getNeighborBookId(bookId, 1));
  }
  async function getPrevBook() {
    setPrevBookId(await bookService.getNeighborBookId(bookId, -1));
  }
  useEffect(() => {
    getNextBook();
    getPrevBook();
  }, []);
  useEffect(() => {
    getNextBook();
    getPrevBook();
  }, [bookId]);
  return (
    <div className={"book-details-nav"}>
      <div>
        <Link to={`/book/${prevBookId}`}>Previous</Link>
      </div>
      <div>
        <Link to={`/book/${nextBookId}`}>Next</Link>
      </div>
    </div>
  );
}
