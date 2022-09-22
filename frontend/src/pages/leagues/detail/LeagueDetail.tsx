import React, { useState } from "react";
import "./LeagueDetail.scss";
import SchoolIcon from "assets/images/SchoolIcon.svg";
import SchoolIcon2 from "assets/images/SchoolIcon2.svg";
import LeagueSupport from "./LeagueSupport";
import TeamDetail from "./TeamDetail";

function LeagueDetail() {
  const [leagueStatue, setLeagueStatue] = useState("playing");
  const teamColor1 = "#007350";
  const teamColor2 = "#5b89e6";

  return (
    <div id="leaguedetail">
      <div className="leaguedetail">
        <div className="leaguedetail-status">
          <div className="leaguedetail-status-circle">
            <div
              className={`circle ${
                leagueStatue === "start" ? "active" : "white"
              }`}
            />
            <p>진행 예정</p>
          </div>
          <div className="leaguedetail-status-circle">
            <div
              className={`circle ${
                leagueStatue === "playing" ? "active" : "white"
              }`}
            />
            <p>진행 중</p>
          </div>
          <div className="leaguedetail-status-circle">
            <div
              className={`circle ${
                leagueStatue === "end" ? "active" : "white"
              }`}
            />
            <p>경기 종료</p>
          </div>
          <div className="leaguedetail-status-bar" />
        </div>
        <p className="leaguedetail-title">대회는 최대 몇 글자입니까</p>
        <div className="leaguedetail-info">
          <div
            className="leaguedetail-info-team"
            style={{ backgroundColor: teamColor1 }}
          >
            <div className="leaguedetail-info-team-info">
              <p>60%</p>
              <button type="button">대학 정보</button>
            </div>
            <div className="leaguedetail-info-team-profile">
              <img src={SchoolIcon} alt="team" />
              <p>전남대학교</p>
            </div>
          </div>
          <div className="leaguedetail-info-desc">
            <button type="button">대회 정보</button>
            <p>VS</p>
            <button type="button">중계</button>
          </div>
          <div
            className="leaguedetail-info-team"
            style={{ backgroundColor: teamColor2 }}
          >
            <div className="leaguedetail-info-team-profile">
              <img src={SchoolIcon2} alt="team" />
              <p>조선대학교</p>
            </div>
            <div className="leaguedetail-info-team-info">
              <p>40%</p>
              <button type="button">대학 정보</button>
            </div>
          </div>
        </div>
        <LeagueSupport />
        <div className="leaguedetail-tip">
          <TeamDetail teamColor={teamColor1} />
          <TeamDetail teamColor={teamColor2} />
        </div>
      </div>
    </div>
  );
}

export default LeagueDetail;
