import { utilService } from "../../../services/util.service.js";
import { bookService } from "../services/book.service.js";
import { LongTxt } from "../../../cmps/LongTxt.jsx";
import { AddReview } from "../cmps/review/book-review.jsx";
import { ReviewList } from "../cmps/review/review-list.jsx";
import { BookDetailsNav } from "../cmps/book-detail-nav.jsx";

const { useState, useEffect } = React;
const { useParams, useNavigate } = ReactRouterDOM;

export function BookDetails() {
  const [book, setBook] = useState(null);
  const [isReview, setIsReview] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadRobot();
  }, [params.bookId]);

  function loadRobot() {
    bookService
      .get(params.bookId)
      .then(setBook)
      .catch((err) => {
        console.log("err:", err);
        navigate("/book");
      });
  }

  function onBack() {
    navigate("/book");
  }

  function getPageCount() {
    let pageCount = book.pageCount;
    if (pageCount > 500) return `${pageCount} - Serious Reading`;
    else if (pageCount > 200) return `${pageCount} - Descent Reading`;
    else if (pageCount < 100) return `${pageCount} - Light Reading`;
  }

  function getPublisheYear() {
    const currYear = new Date().getFullYear();
    let publishedYear = book.publishedDate;
    let diff = currYear - publishedYear;
    if (diff > 10) publishedYear += " - Vintage";
    else if (diff < 1) publishedYear += " - New!";
    return publishedYear;
  }

  function getPriceColor() {
    const price = book.listPrice.amount;
    if (price > 150) return "red";
    else if (price < 20) return "green";
  }

  function getBookPrice() {
    let price = book.listPrice.amount;
    let currencyCode = utilService.getCurrencySymbol(
      book.listPrice.currencyCode
    );
    return `${price} ${currencyCode}`;
  }

  function onAddReview(reviewToAdd) {
    console.log("review to add", reviewToAdd);
    bookService
      .addReview(params.bookId, reviewToAdd)
      .then((updatedBook) => {
        setBook(updatedBook);
        setIsReview(false);
        showSuccessMsg("Review saved successfully");
      })
      .catch((err) => {
        console.log("err:", err);
        showErrorMsg("Error saving review");
      });
  }
  function onDeleteReview(reviewId) {
    bookService
      .deleteReview(bookId, reviewId)
      .then((savedBook) => {
        // console.log({savedBook});
        // setBook({...savedBook})
        setBook(savedBook);
        showSuccessMsg("Review deleted successfully");
      })
      .catch((err) => {
        console.log("err:", err);
        showErrorMsg("Error deleting review");
        navigate("/book");
      });
  }
  if (!book) return <div>Loading...</div>;
  return (
    <div className="book-page">
      <section className="book-details">
        <BookDetailsNav bookId={book.id}></BookDetailsNav>
        <h4>Title: {book.title}</h4>
        <h4>Subtitle: {book.subtitle}</h4>
        <h4>Authors: {book.authors.join(",")}</h4>
        <h4>Publish year: {getPublisheYear()}</h4>
        <img src={book.thumbnail} />
        <h4>Categories: {book.categories.join(",")}</h4>
        <h4>Page Count: {getPageCount()}</h4>
        <h4>
          Price: <span className={getPriceColor()}>{getBookPrice()}</span>{" "}
        </h4>
        {book.listPrice.isOnSale && <p className="sale">On Sale</p>}
        <div>
          Description:
          <LongTxt txt={book.description} />
        </div>
        <button onClick={() => setIsReview(!isReview)}>Rate book</button>
        {isReview && <AddReview onAddReview={onAddReview} />}
        <ReviewList reviews={book.reviews} onDeleteReview={onDeleteReview} />
        <button onClick={onBack}>Back</button>
      </section>
    </div>
  );
}
