import { BookPreview } from "./book-preview.jsx";
const { Link } = ReactRouterDOM;

export function BookList({ books, onRemoveBook }) {
  return (
    <ul className="book-list clean-list">
      {books.map((book, idx) => (
        <li key={idx} className="book-card">
          <BookPreview book={book}></BookPreview>
          <section className="list-button-nav">
            <button onClick={() => onRemoveBook(book.id)}>Remove</button>
            <button>
              <Link to={`/book/edit/${book.id}`}>Edit</Link>
            </button>
            <button>
              <Link to={`/book/${book.id}`}>Details</Link>
            </button>
          </section>
        </li>
      ))}
    </ul>
  );
}
