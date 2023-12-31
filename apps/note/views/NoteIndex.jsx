const { useState, useEffect } = React;
import { noteService } from "../services/note.service.js";
import { NoteList } from "../cmps/NoteList.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { NoteFilter } from "../cmps/NoteFilter.jsx";
import { NoteAdd } from "../cmps/NoteAdd.jsx";
export function NoteIndex() {
  const [notes, setNotes] = useState([]);
  const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter());
  const [isAdd, setIsAdd] = useState(false);
  const dynClassAddDiv = isAdd ? "display-none" : "";

  useEffect(() => {
    getAllNotes();
  }, []);

  useEffect(() => {
    getAllNotes();
  }, [filterBy]);

  async function getAllNotes() {
    setNotes(await noteService.query(filterBy));
  }
  function onRemoveNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
        showSuccessMsg(`Note Removed!`);
      })
      .catch((err) => {
        console.log("err:", err);
        showErrorMsg("Problem Removing Note");
      });
  }
  async function onNotePin(note) {
    onEditNote(note);
    await noteService.save(note, true);
  }
  function onEditNote(note) {
    const noteIdx = notes.findIndex((noteItem) => noteItem.id === note.id);
    setNotes((prevNotes) => [
      ...prevNotes.slice(0, noteIdx),
      note,
      ...prevNotes.slice(noteIdx + 1, prevNotes.length),
    ]);
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
  }

  async function handleNoteAdded(note) {
    setNotes([...notes, note]);
    setIsAdd(false);
  }
  async function onColorPicked(color, note) {
    const newNote = { ...note, style: { backgroundColor: color } };
    onEditNote(newNote);
    await noteService.save(newNote, true);
  }

  if (!notes) return <div>Loading...</div>;
  return (
    <div className={"note-index"}>
      <div className={"note-header flex"}>
        <img src={"assets/icons/icons8-google-keep-48 (1).png"} alt="" />
        <h1>Keep</h1>
        <div>
          <NoteFilter
            filterBy={filterBy}
            onSetFilterBy={onSetFilterBy}
          ></NoteFilter>
        </div>
      </div>
      <div className={"flex justify-center note-add-container"}>
        <div
          className={`note-add flex ${dynClassAddDiv}`}
          onClick={() => {
            setIsAdd(true);
          }}
        >
          <p>Add a note</p>
          <div>
            <button className={"note-add-button"}>
              <img src={"assets/icons/pen.png"} alt="" />
            </button>
          </div>
        </div>
        {isAdd && (
          <NoteAdd
            onNoteAdded={async (note) => await handleNoteAdded(note)}
            isAdd={isAdd}
            setIsAdd={setIsAdd}
          ></NoteAdd>
        )}
      </div>

      <NoteList
        notes={notes}
        onRemoveNote={onRemoveNote}
        onEditNote={onEditNote}
        onColorPicked={onColorPicked}
        onNotePin={onNotePin}
        onNoteDuplicated={async (note) => await handleNoteAdded(note)}
      ></NoteList>
    </div>
  );
}
