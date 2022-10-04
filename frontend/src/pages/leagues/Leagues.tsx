import React, { useState, useEffect } from "react";
import "./Leagues.scss";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
import SearchIcon from "assets/images/searchIcon.svg";
import Carousel from "./Carousel";
import Scroll from "./Scroll";
import SearchIng from "./SearchIng";
import SearchEnd from "./SearchEnd";

function Leagues() {
  const [ing, setIng] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isValue, setIsvalue] = useState(false);
  // date : 대회중 & 대회종료 필터 구분
  const [date, setDate] = useState("start");

  const changeSearch = (value: boolean) => {
    setIsvalue(value);
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // if (inputValue.length >= )
    console.log(inputValue);
  };

  // enter클릭시 해당 키워드에 해당하는 대회 찾기
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsvalue(true);
    if (inputValue === "") {
      setIsvalue(false);
    }
    // return null;
    // Search(inputValue);
  };

  const reset = () => {
    setIsvalue(false);
  };

  // useEffect(() => {}, [inputValue]);

  return (
    <div id="leagues">
      <div className="leagues">
        <div className="leagues-function">
          <span>
            <Link to="/leagues/create">
              <button className="leagues-function-createLeague" type="button">
                대회 생성
              </button>
            </Link>
            <div className="leagues-function-leaguelist">우리 대학 대회</div>
          </span>
        </div>
        <Carousel />
        <div className="leagues-function-leaguelist">대회 목록</div>
        <div className="leagues-buttonlist">
          <div>
            <button
              type="button"
              className={
                ing === true
                  ? "leagues-buttonlist-active"
                  : "leagues-buttonlist-nonactive"
              }
              onClick={() => {
                setIng(true);
              }}
            >
              진행중
            </button>
            {ing === true ? (
              <div className="leagues-buttonlist-bar-active" />
            ) : (
              <div className="leagues-buttonlist-bar-nonactive" />
            )}
          </div>
          <div>
            <button
              type="button"
              className={
                ing === false
                  ? "leagues-buttonlist-active"
                  : "leagues-buttonlist-nonactive"
              }
              onClick={() => {
                setIng(false);
              }}
            >
              종료
            </button>
            {ing === false ? (
              <div className="leagues-buttonlist-bar-active" />
            ) : (
              <div className="leagues-buttonlist-bar-nonactive" />
            )}
          </div>
        </div>
        {ing && <SearchIng leagueStatus={v4()} />}
        {!ing && <SearchEnd leagueStatus={ing} />}
      </div>
    </div>
  );
}
export default Leagues;
