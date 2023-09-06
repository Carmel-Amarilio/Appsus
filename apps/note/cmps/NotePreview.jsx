export function NotePreview({ note }) {
  return (
    <div className="note-preview">
      <h2>{note.info.title}</h2>
      <h4>{note.info.txt}</h4>
    </div>
  );
}
