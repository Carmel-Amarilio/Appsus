const { useState, useEffect } = React;
import { noteService } from "../services/note.service.js";
export function NoteEdit({ noteId, onNoteEdit, onNoteEdited }) {
  const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote());
  const { info } = noteToEdit;

  useEffect(() => {
    getNoteToEdit();
  }, []);

  async function getNoteToEdit() {
    setNoteToEdit(await noteService.get(noteId));
  }

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
    setNoteToEdit((prevNoteToEdit) => {
      const newNoteToEdit = { ...prevNoteToEdit };
      newNoteToEdit.info[field] = value;
      return newNoteToEdit;
    });
  }

  function onSaveNote(note) {
    noteService
      .save(note, true)
      .then((newNote) => onNoteEdit(newNote))
      .then(() => {
        onNoteEdited();
      })
      .catch((err) => console.log("err:", err));
  }

  return (
    <div className={`note-edit`}>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          onSaveNote(noteToEdit);
        }}
      >
        <input
          onChange={handleChange}
          value={info.title}
          placeholder="title"
          type="text"
          name="title"
          id="title"
        />
        <textarea
          onChange={handleChange}
          value={info.txt}
          placeholder="note"
          type="text"
          name="txt"
          id="txt"
        />
        <button className={"words-button"}>Save</button>
      </form>
    </div>
  );
}
