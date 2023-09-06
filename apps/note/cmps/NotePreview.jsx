import { LongTxt } from "../../../cmps/LongTxt.jsx";

const { useState, useEffect } = React;

export function NotePreview({ note }) {
  return (
    <div className="note-preview">
      <h3>{note.info.title}</h3>
      <LongTxt txt={note.info.txt}></LongTxt>
    </div>
  );
}
