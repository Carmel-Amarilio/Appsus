const { useState, useEffect } = React;
import { noteService } from "../services/note.service.js";
export function NoteAdd({ onNoteAdded }) {
  const [newNote, SetNewNote] = useState({ title: "", txt: "" });
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

    SetNewNote((prevNewNote) => ({ ...prevNewNote, [field]: value }));
  }
  function onSaveNote() {
    const note = noteService.createNote(new Date(), title, txt);
    SetNewNote(note);
    console.log(note);
    noteService
      .save(note, false)
      .then(() => onNoteAdded())
      // .then(() => navigate("/book"))
      .catch((err) => console.log("err:", err));
  }

  return (
    <div className={"note-add-popup"}>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          onSaveNote();
        }}
      >
        <input
          onChange={handleChange}
          value={title}
          placeholder="title"
          type="text"
          name="title"
          id="title"
        />
        <input
          onChange={handleChange}
          value={txt}
          placeholder="note"
          type="text"
          name="txt"
          id="txt"
        />
        <button>Save</button>
      </form>
    </div>
  );
}
