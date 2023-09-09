import { bookService } from "../../services/book.service.js";
import { StarRating } from "./star-rating.jsx";
const { useState } = React;

export function AddReview({ onAddReview }) {
  const [reviewToAdd, setReviewToAdd] = useState(bookService.getEmptyReview());
  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = +value || "";
        break;

      case "checkbox":
        value = target.checked;
        break;

      default:
        break;
    }
    setReviewToAdd((prevReview) => ({ ...prevReview, [field]: value }));
  }
  function onSaveReview(ev) {
    ev.preventDefault();
    onAddReview(reviewToAdd);
  }
  const { fullname, readAt } = reviewToAdd;

  return (
    <section className="book-review">
      <form onSubmit={onSaveReview}>
        <label htmlFor="fullname">Fullname:</label>
        <input
          onChange={handleChange}
          value={fullname}
          type="text"
          name="fullname"
          id="fullname"
        />

        <StarRating handleChange={handleChange}></StarRating>
        <label htmlFor="readAt">Read at:</label>
        <input
          onChange={handleChange}
          value={readAt}
          type="date"
          name="readAt"
          id="readAt"
        />
        <button type="submit">Save</button>
      </form>
    </section>
  );
}
