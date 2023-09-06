const { useState, useEffect } = React;

export function BookFilter({ filterBy, onSetFilterBy }) {
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

    setFilterByToEdit((prevFilter) => {
      return { ...prevFilter, [field]: value };
    });
  }

  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilterBy(filterByToEdit);
  }

  const { title, price } = filterByToEdit;
  return (
    <section className="book-filter">
      <h2>Filter By</h2>
      <form onSubmit={onSubmitFilter}>
        <label htmlFor="title">By Title </label>
        <input
          value={title}
          onChange={handleChange}
          type="text"
          placeholder="By Title"
          id="title"
          name="title"
        />

        <label htmlFor="price">By Price </label>
        <input
          value={price}
          onChange={handleChange}
          type="number"
          placeholder="By Price"
          id="price"
          name="price"
        />
        <button>Set Filter</button>
      </form>
    </section>
  );
}
