const { useState } = React;
import { noteService } from "../services/note.service.js";
export function NoteAdd({ onNoteAdded, isAdd, setIsAdd }) {
  const [newNote, setNewNote] = useState({ title: "", txt: "" });
  const { title, txt } = newNote;

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = value || 0;
        break;

      case "checkbox":
        value = target.checked;
        break;

      default:
        break;
    }

    setNewNote((prevNewNote) => ({ ...prevNewNote, [field]: value }));
  }
  function onSaveNote() {
    const note = noteService.createNote(new Date(), title, txt);
    setNewNote(note);
    console.log(note);
    noteService
      .save(note, false)
      .then(() => onNoteAdded())
      .catch((err) => console.log("err:", err));
  }

  return (
    <div className={"note-add-popup"}>
      <div className={"flex justify-end "}>
        <button
          className={"list-button "}
          onClick={() => {
            setIsAdd(!isAdd);
          }}
        >
          <img
            src={"assets/icons/close_FILL0_wght400_GRAD0_opsz24.png"}
            alt=""
          />
        </button>
      </div>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          onSaveNote();
        }}
      >
        <input
          onChange={handleChange}
          value={title}
          placeholder="Title"
          type="text"
          name="title"
          id="title"
        />
        <textarea
          onChange={handleChange}
          value={txt}
          placeholder="What is on your mind?"
          type="text"
          name="txt"
          id="txt"
        />
        <button className={"words-button"}>Save</button>
      </form>
    </div>
  );
}
