import React from "react";
import "./Leagues.scss";
import Carousel from "./Carousel";
import LeagueList from "./LeagueList";
import Scroll from "./Scroll";

function Leagues() {
  return (
    <div id="leagues">
      <div className="leagues">
        <div className="leagues-function">
          <span>
            <button className="leagues-function-createLeague" type="button">
              대회 생성
            </button>
            <input
              className="leagues-function-search"
              placeholder="검색창"
              type="text"
            />
          </span>
        </div>
        <Carousel />
        <Scroll />
      </div>
    </div>
  );
}
export default Leagues;
