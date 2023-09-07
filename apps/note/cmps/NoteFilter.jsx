const { useState, useEffect } = React;

export function NoteFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    onSetFilterBy(filterByToEdit);
  }, [filterByToEdit]);

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

    // function validateDate(inputDate) {
    //     const currentDate = new Date();
    //     if (inputDate > currentDate) {

    //     } else {
    //         return inputDate
    //     }

    // }

    setFilterByToEdit((prevFilter) => {
      return { ...prevFilter, [field]: value };
    });
  }

  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilterBy(filterByToEdit);
  }

  const { filter } = filterByToEdit;
  return (
    <section className="search-bar flex space-around  align-center">
      <button>
        <img src={"assets/icons/search.png"} alt="" />
      </button>
      <form onSubmit={onSubmitFilter}>
        <input
          value={filter}
          onChange={handleChange}
          type="text"
          placeholder="Search"
          id="filter"
          name="filter"
        />
      </form>
    </section>
  );
}
