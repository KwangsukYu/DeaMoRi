import React, { useState } from "react";
import "./Leagues.scss";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import Scroll from "./Scroll";

function Leagues() {
  const [ing, setIng] = useState(true);

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
        </div>
        <input
          className="leagues-function-search"
          placeholder="검색창"
          type="text"
        />
        <Scroll />
      </div>
    </div>
  );
}
export default Leagues;
