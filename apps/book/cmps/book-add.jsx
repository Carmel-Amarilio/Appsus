const { useState, useEffect } = React;
const { useNavigate } = ReactRouterDOM;
import { bookService } from "../services/book.service.js";
export function BookAdd({ onBookAdded }) {
  const [newBook, setNewBook] = useState({ title: "", amount: 0 });
  const navigate = useNavigate();
  const { title, amount } = newBook;

  useEffect(() => {
    if (title.length >= 3) {
      fetch(
        `https://www.googleapis.com/books/v1/volumes?printType=books&q=${title}`
      )
        .then((res) => res.json())
        .then((resJson) => console.log(resJson.items));
    }
  }, [newBook]);

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = value || 0;
        break;

      case "checkbox":
        value = target.checked;
        break;

      default:
        break;
    }

    setNewBook((prevNewBook) => ({ ...prevNewBook, [field]: value }));
  }

  function onSaveBook() {
    const book = bookService.createBook(title, amount);
    setNewBook(book);
    console.log(book);
    bookService
      .save(book, false)
      .then(() => onBookAdded())
      .then(() => navigate("/book"))
      .catch((err) => console.log("err:", err));
  }
  return (
    <div className={"add-book"}>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          onSaveBook();
        }}
      >
        <label htmlFor="title">Title:</label>
        <input
          onChange={handleChange}
          value={title}
          type="text"
          name="title"
          id="title"
        />

        <label htmlFor="amount">Price:</label>
        <input
          onChange={handleChange}
          value={amount}
          type="number"
          name="amount"
          id="amount"
        />

        <button>Save</button>
      </form>
    </div>
  );
}
