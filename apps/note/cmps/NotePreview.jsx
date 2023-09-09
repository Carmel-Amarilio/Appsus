const { useEffect, useState } = React;
import { LongTxt } from "../../../cmps/LongTxt.jsx";

export function NotePreview({ note }) {
  return (
    <div className="note-preview flex column justify-start">
      <h3>{note.info.title}</h3>
      <p>
        <LongTxt txt={note.info.txt}></LongTxt>
      </p>
    </div>
  );
}
