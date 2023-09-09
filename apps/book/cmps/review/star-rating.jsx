const { useEffect, useState } = React;

export function StarRating({ handleChange }) {
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(null);

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, idx) => {
        idx++;
        return (
          <button
            onMouseEnter={() => {
              setHover(idx);
              setRating(null);
            }}
            onMouseLeave={() => setHover(null)}
            onClick={(ev) => {
              ev.preventDefault();
              setRating(idx);
              handleChange({ target: { name: "rating", value: idx } });
            }}
            className={idx <= rating || idx <= hover ? "on" : "off"}
            key={idx}
          >
            <span className="star">
              <i className="fa-solid fa-star fa-lg"></i>
            </span>
          </button>
        );
      })}
      <span>rating is {rating || hover}</span>
    </div>
  );
}
