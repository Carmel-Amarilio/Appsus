const { useState, useEffect } = React;
import { noteService } from "../services/note.service.js";
import { NoteList } from "../cmps/NoteList.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { NoteFilter } from "../cmps/NoteFilter.jsx";

export function NoteIndex() {
  const [notes, setNotes] = useState([]);
  const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter());
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    getAllNotes();
  }, []);

  useEffect(() => {
    getAllNotes();
    console.log(filterBy);
  }, [filterBy]);

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
  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
  }

  if (!notes) return <div>Loading...</div>;
  return (
    <div className={"note-index"}>
      <div className={"note-header flex"}>
        <h1>Appsus Keep</h1>
        <div>
          <NoteFilter
            filterBy={filterBy}
            onSetFilterBy={onSetFilterBy}
          ></NoteFilter>
        </div>
        {/* <div className={"search-bar flex"}>
          <input type="text" placeholder="search" />
          <button>
            <img src={"assets/icons/search.png"} alt="" />
          </button>
        </div> */}
      </div>

      <div
        className={"note-add flex"}
        onClick={() => {
          setIsAdd(!isAdd);
          console.log(isAdd);
        }}
      >
        <p>Add a note</p>
        <div>
          <button>
            <img
              src={"assets/icons/check_box_FILL0_wght400_GRAD0_opsz24.png"}
              alt=""
            />
          </button>
          <button>
            <img
              src={"assets/icons/image_FILL0_wght400_GRAD0_opsz24.png"}
              alt=""
            />
          </button>
        </div>
      </div>
      <NoteList notes={notes} onRemoveNote={onRemoveNote}></NoteList>
    </div>
  );
}
