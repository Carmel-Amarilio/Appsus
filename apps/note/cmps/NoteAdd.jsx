export function NoteAdd() {
  return (
    <div className={"note-add flex"}>
      <p>Add a note</p>
      <div>
        <button>
          <img
            src={"assets/icons/check_box_FILL0_wght400_GRAD0_opsz24.png"}
            alt=""
          />
        </button>
        <button>
          <img
            src={"assets/icons/image_FILL0_wght400_GRAD0_opsz24.png"}
            alt=""
          />
        </button>
      </div>
    </div>
  );
}
