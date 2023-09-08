const { useState } = React;

export function LongTxt({ txt, length = 100, showMore = true }) {
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
      {getTxtToShow()}
      {txt.length > length && (
       (showMore && <button className={"show-more"} onClick={handleClick}>
          {!isShowMore ? "Show More" : "Show Less"}
        </button>)
      )}
    </div>
  );
}
