const { useEffect } = React;
export function Backdrop({ onBackdropClose }) {
  const classList = document.body.classList;

  useEffect(() => {
    classList.add("overflow-none");
  }, []);

  return (
    <div
      className={`backdrop-on`}
      onClick={() => {
        classList.remove("overflow-none");
        onBackdropClose();
      }}
    ></div>
  );
}
