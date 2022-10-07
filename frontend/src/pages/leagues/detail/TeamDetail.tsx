import React, { useState } from "react";
import "./TeamDetail.scss";
import { teamType } from "apis/leagues/LeagueDetail";
import SupportList from "./SupportList";
import LeagueComment from "./LeagueComment";

interface LeagueDetailProps {
  teamInfo: teamType;
  teamNumber: number;
  leaguePk: number;
  change: () => void;
}

function TeamDetail({
  teamInfo,
  teamNumber,
  leaguePk,
  change
}: LeagueDetailProps) {
  const [tap, setTap] = useState("응원");

  return (
    <div id="teamdetail">
      <div className="teamdetail">
        <div className="teamdetail-header">
          <button
            type="button"
            className="teamdetail-header-tap"
            style={{
              borderBottom:
                tap === "응원" ? `4px solid ${teamInfo.teamColor}` : ""
            }}
            onClick={() => setTap("응원")}
          >
            응원 메세지
          </button>
          <button
            type="button"
            className="teamdetail-header-tap"
            style={{
              borderBottom:
                tap === "후원" ? `4px solid ${teamInfo.teamColor}` : ""
            }}
            onClick={() => setTap("후원")}
          >
            후원 TOP 10
          </button>
        </div>
        <div className="teamdetail-detail">
          {tap === "응원" ? (
            <LeagueComment
              change={change}
              leaguePk={leaguePk}
              teamInfo={teamInfo}
              teamNumber={teamNumber}
            />
          ) : (
            <SupportList supporters={teamInfo.getSupports} />
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamDetail;
