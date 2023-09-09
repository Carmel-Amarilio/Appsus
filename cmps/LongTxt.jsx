const { useState } = React;

export function LongTxt({ txt, length = 40, showMore = true }) {
  const [isShowMore, setIsShowMore] = useState(false);

  function handleClick() {
    setIsShowMore((prevState) => !prevState);
  }

  function getTxtToShow() {
    if (txt.length < length) return txt;
    else {
      if (isShowMore) return txt;
      else return txt.substring(0, length) + "...";
    }
  }

  return (
    <div>
      <p>{getTxtToShow()}</p>
      {txt.length > length && showMore && (
        <button className={"words-button"} onClick={handleClick}>
          {!isShowMore ? "Show More" : "Show Less"}
        </button>
      )}
    </div>
  );
}
