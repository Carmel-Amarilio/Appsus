import { NotePreview } from "./NotePreview";
export function NoteList({ notes, onRemoveNote }) {
  return (
    <ul className="note-list clean-list">
      {notes.map((note, idx) => (
        <li key={idx} className="note-card">
          <button>pin</button>
          <NotePreview note={note}></NotePreview>
          <section className="list-button-nav">
            <button onClick={() => onRemoveNote(note.id)}>delete</button>
            <button>edit</button>
            <button>Change bg</button>
            <button>Add photo</button>
            <button>share to mail</button>
          </section>
        </li>
      ))}
    </ul>
  );
}
