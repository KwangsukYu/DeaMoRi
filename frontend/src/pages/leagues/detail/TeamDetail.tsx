import React, { useState } from "react";
import "./TeamDetail.scss";
import SupportList from "./SupportList";
import LeagueComment from "./LeagueComment";

interface LeagueDetailProps {
  teamColor: string;
}

function TeamDetail({ teamColor }: LeagueDetailProps) {
  const [tap, setTap] = useState("응원");
  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div id="teamdetail">
      <div className="teamdetail">
        <div className="teamdetail-header">
          <button
            type="button"
            className="teamdetail-header-tap"
            style={{
              borderBottom: tap === "응원" ? `4px solid ${teamColor}` : ""
            }}
            onClick={() => setTap("응원")}
          >
            응원 메세지
          </button>
          <button
            type="button"
            className="teamdetail-header-tap"
            style={{
              borderBottom: tap === "후원" ? `4px solid ${teamColor}` : ""
            }}
            onClick={() => setTap("후원")}
          >
            후원자 랭킹
          </button>
        </div>
        <div className="teamdetail-detail">
          {tap === "응원" ? (
            <LeagueComment teamColor={teamColor} />
          ) : (
            <SupportList />
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamDetail;
