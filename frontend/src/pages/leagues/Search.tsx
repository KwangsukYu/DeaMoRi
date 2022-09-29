import React, { useState, useEffect } from "react";
import Poster from "./Poster";
import "./Search.scss";

function Search() {
  const [userInput, setUserInput] = useState("");

  // 입력값을 가져와서 소문자로변경
  const getValue = (e: any) => {
    setUserInput(e.target.value.toLowerCase());
  };

  // 데이터들을 배열로 monsters 에 배열 state로 담아준 상태
  const [posters, setPosters] = useState([]);

  const test = () => {
    console.log(userInput);
  };

  // 데이터 목록중, name에 사용자 입력값이 있는 데이터만 불러오기
  // 사용자 입력값을 소문자로 변경해주었기 때문에 데이터도 소문자로
  const searched = posters.filter((item: any) =>
    item.name.toLowerCase().includes(userInput)
  );

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_limit=100`
      );
      const data = await res.json();
      setPosters(data);
    };
    getComments();
  }, []);

  return (
    <div>
      <button type="button" onClick={test}>
        클릭시 입력값 console 확인
      </button>
      <input onChange={getValue} />
      <div className="card-container">
        {searched.map((item: any) => (
          <Poster key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Search;
