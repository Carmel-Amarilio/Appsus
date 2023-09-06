import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/async-storage.service.js";

const NOTE_KEY = "noteDB";
_createNotes();

export const noteService = {
  query,
  get,
  remove,
  save,
  getAll,
  getEmptyNote,
  getDefaultFilter,
};

function query(filterBy = {}) {
  return storageService.query(NOTE_KEY).then((notes) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, "i");
      notes = notes.filter((car) => regExp.test(car.vendor));
    }

    if (filterBy.minSpeed) {
      notes = notes.filter((car) => car.maxSpeed >= filterBy.minSpeed);
    }

    return notes;
  });
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId).then((note) => {
    note = _setNextPrevCarId(note);
    return note;
  });
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId);
}

function save(note, isEdit) {
  if (isEdit) {
    return storageService.put(NOTE_KEY, note);
  } else {
    return storageService.post(NOTE_KEY, note);
  }
}

function getAll() {
  return storageService.get(BOOK_KEY);
}
function getEmptyNote(vendor = "", maxSpeed = "") {
  return { vendor, maxSpeed };
}

function getDefaultFilter() {
  return { txt: "", minSpeed: "" };
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY);
  if (!notes || !notes.length) {
    notes = [];
    notes.push(
      _createNote(
        getRandomDate(new Date("2022-01-01"), new Date("2023-9-1")),
        "title",
        "My password-********"
      )
    );
    notes.push(
      _createNote(
        getRandomDate(new Date("2022-01-01"), new Date("2023-9-1")),
        "title",
        "es un EMBOLA"
      )
    );
    notes.push(
      _createNote(
        getRandomDate(new Date("2022-01-01"), new Date("2023-9-1")),
        "title",
        "shopping list:milk,bread,jam"
      )
    );

    notes.push(
      _createNote(
        getRandomDate(new Date("2022-01-01"), new Date("2023-9-1")),
        "title",
        "Ad Matay"
      )
    );
    utilService.saveToStorage(NOTE_KEY, notes);
  }
}

function _createNote(createdAt, title, txt) {
  return {
    id: utilService.makeId(),
    createdAt,
    type: "NoteTxt",
    isPinned: false,
    style: {
      backgroundColor: "#ffffff",
    },
    info: {
      title,
      txt,
    },
  };
}
function _setNextPrevCarId(note) {
  return storageService.query(NOTE_KEY).then((notes) => {
    const noteIdx = notes.findIndex((currNote) => currNote.id === note.id);
    const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0];
    const prevNote = notes[noteIdx - 1]
      ? notes[noteIdx - 1]
      : notes[notes.length - 1];
    note.nextNoteId = nextNote.id;
    note.prevNoteId = prevNote.id;
    return note;
  });
}
