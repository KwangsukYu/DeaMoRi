import React, { useCallback, useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import "./ColorPicker.scss";

interface Props {
  team: number;
  teamColorProps: (n: number, c: string) => void;
}

function ColorPicker({ team, teamColorProps }: Props) {
  const [color, setColor] = useState<string>("#5c6bc0");
  const handleColorChange = useCallback(
    (colorProps: string) => {
      setColor(colorProps);
    },
    [color]
  );

  useEffect(() => {
    if (!color) {
      setColor("#5c6bc0");
    }
    teamColorProps(team, color);
    setColor(color);
  }, [color]);
  return (
    <div id="colorpicker">
      <div className="container">
        <label htmlFor="color">
          <input
            id="color"
            value={color}
            onChange={e => handleColorChange(e.target.value)}
            placeholder="색상코드를 입력하세요"
          />
        </label>
        <ChromePicker
          className="colorpicker"
          color={color}
          onChange={colorProps => handleColorChange(colorProps.hex)}
        />
      </div>
    </div>
  );
}

export default ColorPicker;
