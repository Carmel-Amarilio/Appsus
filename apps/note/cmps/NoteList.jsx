import { NoteCard } from "./NoteCard.jsx";
import { noteService } from "../services/note.service.js";

export function NoteList({
  notes,
  onRemoveNote,
  onEditNote,
  onColorPicked,
  onNotePin,
  onNoteDuplicated,
}) {
  function onPinPress(note) {
    note.isPinned = !note.isPinned;
    onNotePin(note);
  }

  async function onDuplicateNote(note) {
    const newNote = noteService.createNote(
      new Date(),
      note.info.title,
      note.info.txt,
      note.style.backgroundColor
    );
    onNoteDuplicated(newNote);
    await noteService.save(newNote, false);
  }

  return (
    <ul className="note-list clean-list">
      <NoteCard
        notes={notes.filter((note) => note.isPinned)}
        onColorPicked={onColorPicked}
        onRemoveNote={onRemoveNote}
        onEditNote={onEditNote}
        onPinPress={onPinPress}
        onDuplicateNote={async (note) => await onDuplicateNote(note)}
      ></NoteCard>
      <NoteCard
        notes={notes.filter((note) => !note.isPinned)}
        onColorPicked={onColorPicked}
        onRemoveNote={onRemoveNote}
        onEditNote={onEditNote}
        onPinPress={onPinPress}
        onDuplicateNote={async (note) => await onDuplicateNote(note)}
      ></NoteCard>
    </ul>
  );
}
