import React from "react";
import "./Leagues.scss";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import Scroll from "./Scroll";

function Leagues() {
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
          </span>
        </div>
        <h2 className="leagues-function-myuniversity">우리 대학 대회</h2>
        <Carousel />
        <h2>대회 목록</h2>
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
