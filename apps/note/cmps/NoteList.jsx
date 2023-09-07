import { NotePreview } from "./NotePreview.jsx";
export function NoteList({ notes, onRemoveNote }) {
  return (
    <ul className="note-list clean-list">
      {notes.map((note, idx) => {
        return (
          <li key={idx} className="note-card">
            <button>
              <img
                src={"assets/icons/push_pin_FILL0_wght400_GRAD0_opsz24.png"}
                alt="Delete"
              />
            </button>
            <NotePreview note={note}></NotePreview>
            <section className="list-button-nav flex ">
              <button>
                <img
                  src={"assets/icons/palette_FILL0_wght400_GRAD0_opsz24.png"}
                  alt="Change background"
                />
              </button>
              <button>
                <img
                  src={"assets/icons/image_FILL0_wght400_GRAD0_opsz24.png"}
                  alt="Add photo"
                />
              </button>
              <button>
                <img
                  src={
                    "assets/icons/edit_square_FILL0_wght400_GRAD0_opsz24.png"
                  }
                  alt="Delete"
                />
              </button>
              <button onClick={() => onRemoveNote(note.id)}>
                <img src={"assets/icons/delete.png"} alt="Delete" />
              </button>
              <button>
                <img src={"assets/icons/mail.png"} alt="Delete" />
              </button>
            </section>
          </li>
        );
      })}
    </ul>
  );
}
