import React, { useCallback, useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import "./ColorPicker.scss";

interface Props {
  team: number;
  teamColorProps: (n: number, c: string) => void;
}

function ColorPicker({ team, teamColorProps }: Props) {
  // function ColorPicker() {
  const [color, setColor] = useState<string>("#5c6bc0");
  const handleColorChange = useCallback(
    // 온체인지 이벤트를 담당할 함수다.
    (colorProps: string) => {
      // 바뀌는 컬러값을 매개변수로 받아서 setColor 안에 넣어 color 를 변경해준다.
      setColor(colorProps);
    },
    [color]
  ); // 단 컬러 데이터가 바뀔때마다 이 함수는 갱신된다.

  useEffect(() => {
    if (!color) {
      // 받아온 레이블 컬러가 없으면 그냥 빈칸
      setColor("#5c6bc0");
    }
    teamColorProps(team, color);
    setColor(color); // 데이터가 있으면 컬러로 세팅
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
