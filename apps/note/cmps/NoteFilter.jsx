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
    <section className="book-filter flex space-around  align-center">
      <h2>Filter By</h2>
      <form onSubmit={onSubmitFilter}>
        {/* <label htmlFor="title">By Title </label> */}
        <input
          value={filter}
          onChange={handleChange}
          type="text"
          placeholder="Filter"
          id="filter"
          name="filter"
        />
        {/* <label htmlFor="text">By text</label> */}
        {/* <input
          value={txt}
          onChange={handleChange}
          type="text"
          placeholder="By text"
          id="txt"
          name="txt"
        /> */}
      </form>
    </section>
  );
}
