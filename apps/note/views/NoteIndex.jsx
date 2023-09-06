const { useState, useEffect } = React;
import { noteService } from "../services/note.service";
import { NoteList } from "../cmps/NoteList";

export function NoteIndex() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getAllNotes();
  }, []);

  async function getAllNotes() {
    setNotes(await noteService.getAll());
  }
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
        <NoteList notes={notes} onRemoveNote={onRemoveNote}></NoteList>
      </div>
    </div>
  );
}
