const { useState, useEffect } = React;
import { noteService } from "../services/note.service.js";
import { NoteList } from "../cmps/NoteList.jsx";
import { NoteAdd } from "../cmps/NoteAdd.jsx";

export function NoteIndex() {
  const [notes, setNotes] = useState([]);
  //   const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter());

  //   const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    noteService.query().then((res) => {
      console.log(res);
      setNotes(res);
    });
  }, []);

  //   useEffect(() => {
  //     getAllBooks();
  //   }, []);

  //   useEffect(() => {
  //     getAllBooks();
  //   }, [filterBy]);

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
  //   function onSetFilterBy(filterBy) {
  //     setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
  //   }

  //   async function handleBookAdded() {
  //     await getAllBooks();
  //     setIsAdd(!isAdd);
  //   }

  if (!notes) return <div>Loading...</div>;
  return (
    <div className={"noteIndex"}>
      <div className={"note-header flex"}>
        <h1>Appsus Keep</h1>
        <div className={"search-bar flex"}>
          <input type="text" placeholder="search" />
          <button>
            <img src={"assets/icons/search.png"} alt="" />
          </button>
        </div>
      </div>
      <NoteAdd></NoteAdd>
      <NoteList notes={notes} onRemoveNote={onRemoveNote}></NoteList>
    </div>
  );
}
