const { useEffect } = React;
export function Backdrop({ isBackdrop, setIsBackdrop }) {
  const dynClass = isBackdrop ? "on" : "off";

  useEffect(() => {
    const classList = document.body.classList;

    isBackdrop
      ? classList.add("overflow-none")
      : classList.remove("overflow-none");
  }, [isBackdrop]);

  return (
    <div
      className={`backdrop-${dynClass}`}
      onClick={() => setIsBackdrop(false)}
    ></div>
  );
}
