const { useState, Fragment } = React;
import { NotePreview } from "./NotePreview.jsx";
import { NoteEdit } from "./NoteEdit.jsx";
import { Backdrop } from "./Backdrop.jsx";
import { ColorPicker } from "./ColorPicker.jsx";

export function NoteList({ notes, onRemoveNote, onEditNote, onColorPicked }) {
  const [noteEditOpened, setNoteEditOpened] = useState(null);
  const [colorPickerOpen, setColorPickerOpen] = useState(null);
  const [isPinned, setIsPinned] = useState(false);

  return (
    <ul className="note-list clean-list">
      {notes.map((note, idx) => {
        return (
          <li
            key={idx}
            className="note-card"
            style={{ backgroundColor: note.style.backgroundColor }}
          >
            <button className={"list-button"}>
              <img
                src={"assets/icons/push_pin_FILL0_wght400_GRAD0_opsz24.png"}
                alt="Pin to start"
              />
            </button>
            <NotePreview note={note}></NotePreview>
            <section className="list-button-nav flex ">
              <button
                className={"list-button"}
                onClick={() =>
                  setColorPickerOpen((prev) => (prev === idx ? null : idx))
                }
              >
                <img
                  src={"assets/icons/palette_FILL0_wght400_GRAD0_opsz24.png"}
                  alt="Change background"
                />
              </button>
              <button className={"list-button"}>
                <img
                  src={"assets/icons/image_FILL0_wght400_GRAD0_opsz24.png"}
                  alt="Add photo"
                />
              </button>
              <button
                className={"list-button"}
                onClick={() => {
                  setNoteEditOpened((prev) =>
                    prev != null && prev === idx ? null : idx
                  );
                }}
              >
                <img
                  src={
                    "assets/icons/edit_square_FILL0_wght400_GRAD0_opsz24.png"
                  }
                  alt="Edit note"
                />
              </button>
              <button
                className={"list-button"}
                onClick={() => onRemoveNote(note.id)}
              >
                <img src={"assets/icons/delete.png"} alt="Delete" />
              </button>
              <button className={"list-button"}>
                <img src={"assets/icons/mail.png"} alt="Send as mail" />
              </button>
            </section>
            {noteEditOpened === idx && (
              <Fragment>
                <NoteEdit
                  noteId={note.id}
                  onNoteEdit={(note) => {
                    setNoteEditOpened(null);
                    onEditNote(note);
                  }}
                ></NoteEdit>
                <Backdrop onBackdropClose={setNoteEditOpened}></Backdrop>
              </Fragment>
            )}

            {colorPickerOpen === idx && (
              <ColorPicker
                colors={[
                  "#FFF8B8",
                  "#FAAFA7",
                  "#D4E3ED",
                  "#E2F5D3",
                  "#D3BFDB",
                  "#F6E2DD",
                  "#FFFFFF",
                ]}
                onColorPicked={(color) => onColorPicked(color, idx)}
              ></ColorPicker>
            )}
          </li>
        );
      })}
    </ul>
  );
}
