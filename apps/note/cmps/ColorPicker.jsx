const { useState, useEffect } = React;

export function ColorPicker({ colors, onColorPicked }) {
  const [pickedColor, setPickedColor] = useState(null);
  useEffect(() => {
    if (pickedColor != null) {
      onColorPicked(colors[pickedColor]);
    }
  }, [pickedColor]);
  return (
    <div className={"color-picker flex"}>
      {colors.map((color, idx) => (
        <span
          key={idx}
          style={{ backgroundColor: color }}
          className={`color-picker-color ${
            pickedColor && pickedColor === idx ? "chosen-color" : ""
          }`}
          onClick={() => setPickedColor(idx)}
        >
          {" "}
        </span>
      ))}
    </div>
  );
}
