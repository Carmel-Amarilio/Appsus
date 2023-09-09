import { ReviewPreview } from "./review-preview.jsx";

export function ReviewList({ reviews, onDeleteReview }) {
  return (
    <ul className="review-list clean-list">
      {reviews.map((review) => (
        <li key={review.id}>
          <ReviewPreview review={review} onDeleteReview={onDeleteReview} />
        </li>
      ))}
    </ul>
  );
}
