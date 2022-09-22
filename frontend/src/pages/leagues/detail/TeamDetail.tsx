import React, { useState } from "react";
import "./TeamDetail.scss";
import SupportList from "./SupportList";

interface LeagueDetailProps {
  teamColor: string;
}

function TeamDetail({ teamColor }: LeagueDetailProps) {
  const [tap, setTap] = useState("응원");

  return (
    <div id="teamdetail">
      <div className="teamdetail">
        <div className="teamdetail-header">
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
        </div>
        <div className="teamdetail-detail">
          {tap === "후원" ? <SupportList /> : null}
        </div>
      </div>
    </div>
  );
}

export default TeamDetail;
