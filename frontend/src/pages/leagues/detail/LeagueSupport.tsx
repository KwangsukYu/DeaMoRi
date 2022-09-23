import React from "react";
import "./LeagueSupport.scss";
import getCounts from "utils/getCounts";

function LeagueSupport() {
  const test = 60;
  const test2 = 40;
  const teamColor1 = "#007350";
  const teamColor2 = "#5b89e6";

  return (
    <div id="leaguesupport">
      <div className="leaguesupport">
        <p className="leaguesupport-amount">200,000,000 WON</p>
        <div className="leaguesupport-bar">
          <div
            className="leaguesupport-bar-item"
            style={{ width: test * 10, backgroundColor: teamColor1 }}
          >
            120,000,000 MOK
          </div>
          <div
            className="leaguesupport-bar-item"
            style={{ width: test2 * 10, backgroundColor: teamColor2 }}
          >
            80,000,000 MOK
          </div>
        </div>
        <button className="leaguesupport-support" type="button">
          후원 하기
        </button>
      </div>
    </div>
  );
}

export default LeagueSupport;
