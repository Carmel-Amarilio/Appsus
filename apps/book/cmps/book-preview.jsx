export function BookPreview({ book }) {
  return (
    <div className="book-preview">
      <img className="book-img" src={book.thumbnail} alt={book.title} />
      <h2>{book.title}</h2>
      <h4>{book.authors}</h4>
    </div>
  );
}
