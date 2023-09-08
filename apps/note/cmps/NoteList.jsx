const { useState } = React;
import { NoteCard } from "./NoteCard.jsx";

export function NoteList({
  notes,
  onRemoveNote,
  onEditNote,
  onColorPicked,
  onNotePin,
}) {
  function onPinPress(note) {
    note.isPinned = !note.isPinned;
    onNotePin(note);
  }

  return (
    <ul className="note-list clean-list">
      <NoteCard
        notes={notes.filter((note) => note.isPinned)}
        onColorPicked={onColorPicked}
        onRemoveNote={onRemoveNote}
        onEditNote={onEditNote}
        onPinPress={onPinPress}
      ></NoteCard>
      <NoteCard
        notes={notes.filter((note) => !note.isPinned)}
        onColorPicked={onColorPicked}
        onRemoveNote={onRemoveNote}
        onEditNote={onEditNote}
        onPinPress={onPinPress}
      ></NoteCard>
    </ul>
  );
}
