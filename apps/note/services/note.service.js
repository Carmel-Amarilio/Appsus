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
  createNote,
  getEmptyNote,
  getDefaultFilter,
};

function query(filterBy = {}) {
  return storageService.query(NOTE_KEY).then((notes) => {
    if (filterBy.filter) {
      const regExp = new RegExp(filterBy.filter, "i");
      notes = notes.filter(
        (note) => regExp.test(note.info.title) || regExp.test(note.info.txt)
      );
    }
    // if (filterBy.txt) {
    //   const regExp = new RegExp(filterBy.txt, "i");
    //   notes = notes.filter((note) => regExp.test(note.info.txt));
    // }

    return notes;
  });
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId).then((note) => {
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
  return storageService.get(NOTE_KEY);
}
function getEmptyNote(title = "", txt = "") {
  return createNote(new Date(), title, txt);
}

function getDefaultFilter() {
  return { filter: "" };
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY);
  if (!notes || !notes.length) {
    notes = [];
    notes.push(
      createNote(
        utilService.getRandomDate(new Date("2022-01-01"), new Date("2023-9-1")),
        "gmail password",
        "PinkHippo123"
      )
    );
    notes.push(
      createNote(
        utilService.getRandomDate(new Date("2022-01-01"), new Date("2023-9-1")),
        "Haiku",
        `old pond frog leaps in water's sound`
      )
    );
    notes.push(
      createNote(
        utilService.getRandomDate(new Date("2022-01-01"), new Date("2023-9-1")),
        "shopping list:",
        `milk bread jam`
      )
    );

    notes.push(
      createNote(
        utilService.getRandomDate(new Date("2022-01-01"), new Date("2023-9-1")),
        "names for the new puppy",
        `roku rexy boof`
      )
    );
    utilService.saveToStorage(NOTE_KEY, notes);
  }
}

function createNote(createdAt, title, txt, backgroundColor = "transparent") {
  return {
    id: utilService.makeId(),
    createdAt,
    type: "NoteTxt",
    isPinned: false,
    style: {
      backgroundColor,
    },
    info: {
      title,
      txt,
    },
  };
}
