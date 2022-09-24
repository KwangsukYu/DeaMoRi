import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Counter from "components/Counter/Counter";
import Logo from "assets/images/DAEMORI_logo.svg";
import "./Landing.scss";

function Landing() {
  const navigate = useNavigate();

  return (
    <div id="landing">
      <div className="landing">
        <div className="landing-logo">
          <img src={Logo} alt="" />
        </div>
        <div className="landing-title">
          대학 <span>모아</span> 리그
        </div>
        <div className="landing-league">
          <div className="landing-league-desc">
            <p className="landing-league-label">진행 중인 대회</p>
            <Counter end={155} timer={1} />
          </div>
          <div className="landing-league-desc">
            <p className="landing-league-label">현재까지 진행된 대회</p>
            <Counter end={1558} timer={1} />
          </div>
        </div>
        <div className="landing-amount">
          <p className="landing-league-label">누적 후원 총 액</p>
          <div className="landing-amount-total">
            <Counter end={2088888888} timer={0.1} />
            <p>WON</p>
          </div>
        </div>
        <button
          className="landing-button"
          type="button"
          onClick={() => navigate("/leagues")}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}

export default Landing;
