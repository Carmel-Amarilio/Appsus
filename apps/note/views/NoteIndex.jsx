const { useState, useEffect } = React;
import { noteService } from "../services/note.service.js";
import { NoteList } from "../cmps/NoteList.jsx";

export function NoteIndex() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    noteService.query().then((res) => {
      console.log(res);
      setNotes(res);
    });
  }, []);

  function onRemoveNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
        // showSuccessMsg(`Book Removed! ${bookId}`);
      })
      .catch((err) => {
        console.log("err:", err);
        // showErrorMsg("Problem Removing " + bookId);
      });
  }

  if (!notes) return <div>Loading...</div>;
  return (
    <div>
      <div className={"noteIndex"}>
        <div className={"note-header flex"}>
          <h1>Appsus Keep</h1>
          <input type="text" />
          <button>search</button>
        </div>
        <NoteList notes={notes} onRemoveNote={onRemoveNote}></NoteList>
      </div>
    </div>
  );
}
