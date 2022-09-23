import React, { useState } from "react";
import "./University.scss";
import uniLogo1 from "assets/images/uni1.png";
import rankLogo1 from "assets/images/rank1.png";
import LeaguesIng from "./LeaguesIng";
import LeaguesEd from "./LeaguesEd";
import UniSponRank from "./UniSponRank";
import Trophy from "./Trophy";

function University() {
  const [bar, setBar] = useState("ing");

  return (
    <div id="university">
      <div className="background">
        <div className="uni-box">
          <div className="uni-box-logo">
            <img src={uniLogo1} alt="" />
          </div>
        </div>
        {/* <div className="trophy-box"></div>
        <div className="leagues-box"></div> */}
        <div className="uni-box-text">
          <p className="uni-box-text-title">
            서울대학교
            <img className="rank-logo" src={rankLogo1} alt="" />
            <p className="rank-logo-text">1</p>
          </p>
          <p className="uni-box-text-total">40전 32승 8패</p>
          <p className="uni-box-text-price">총 후원 금액 : 300,000,000 eth</p>
        </div>
        <Trophy />
        <UniSponRank />
        <div id="rankings">
          <div className="modal">
            <div className="button-list">
              <button
                className="tab-button"
                type="button"
                onClick={() => {
                  setBar("ing");
                }}
              >
                <p
                  className={
                    bar === "ing"
                      ? "tab-button-title-active"
                      : "tab-button-title"
                  }
                >
                  진행중
                </p>
              </button>
              <button
                className="tab-button"
                type="button"
                onClick={() => {
                  setBar("ed");
                }}
              >
                <p
                  className={
                    bar === "ed"
                      ? "tab-button-title-active"
                      : "tab-button-title"
                  }
                >
                  종료
                </p>
              </button>
            </div>
            <div className="bar">
              {bar === "ing" ? (
                <div className="bar-state-uni" />
              ) : (
                <div className="bar-state-spon" />
              )}
            </div>
            <div className="tab-main">
              {bar === "ing" ? <LeaguesIng /> : <LeaguesEd />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default University;
