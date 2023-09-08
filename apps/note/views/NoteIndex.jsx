const { useState, useEffect } = React;
import { noteService } from "../services/note.service.js";
import { NoteList } from "../cmps/NoteList.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { NoteFilter } from "../cmps/NoteFilter.jsx";
import { NoteAdd } from "../cmps/NoteAdd.jsx";
export function NoteIndex({ setBackdrop }) {
  const [notes, setNotes] = useState([]);
  const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter());
  const [isAdd, setIsAdd] = useState(false);
  const dynClass = isAdd ? "on" : "off";

  useEffect(() => {
    getAllNotes();
  }, []);

  useEffect(() => {
    getAllNotes();
  }, [filterBy]);

  useEffect(() => {
    setBackdrop(isAdd);
  }, [isAdd]);

  function getAllNotes() {
    noteService.query(filterBy).then((res) => {
      setNotes(res);
    });
  }
  function onRemoveNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
        showSuccessMsg(`Book Removed! ${noteId}`);
      })
      .catch((err) => {
        console.log("err:", err);
        showErrorMsg("Problem Removing " + noteId);
      });
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

  function handleNoteAdded() {
    getAllNotes();
    setIsAdd(false);
  }

  if (!notes) return <div>Loading...</div>;
  return (
    <div className={"note-index"}>
      <div
        className={`backdrop-${dynClass}`}
        onClick={() => setIsAdd(false)}
      ></div>
      <div className={"note-header flex"}>
        <h1>Appsus Keep</h1>
        <div>
          <NoteFilter
            filterBy={filterBy}
            onSetFilterBy={onSetFilterBy}
          ></NoteFilter>
        </div>
      </div>

      <div
        className={"note-add flex"}
        onClick={() => {
          setIsAdd(true);
        }}
      >
        <p>Add a note</p>
        <div>
          <button className={"note-add-button"}>
            <img
              src={"assets/icons/check_box_FILL0_wght400_GRAD0_opsz24.png"}
              alt=""
            />
          </button>
          <button className={"note-add-button"}>
            <img
              src={"assets/icons/image_FILL0_wght400_GRAD0_opsz24.png"}
              alt=""
            />
          </button>
        </div>
      </div>
      {isAdd && <NoteAdd onNoteAdded={handleNoteAdded}></NoteAdd>}
      <NoteList
        notes={notes}
        onRemoveNote={onRemoveNote}
        onEditNote={onEditNote}
      ></NoteList>
    </div>
  );
}
