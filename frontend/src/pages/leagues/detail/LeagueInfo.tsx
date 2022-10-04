import React from "react";
import "./LeagueInfo.scss";
import PosterSample from "assets/images/poster_sample.jpg";
import { leagueDetailType } from "apis/leagues/LeagueDetail";

interface LeagueDetailProps {
  signal: (type: string) => void;
  leagueInfo: leagueDetailType;
}

function LeaegueInfo({ signal, leagueInfo }: LeagueDetailProps) {
  return (
    <div className="info-wrapper">
      <div id="leagueinfo">
        <div className="leagueinfo">
          <p className="leagueinfo-title">대회 정보</p>
          <img
            className="leagueinfo-img"
            src={leagueInfo.posterURL}
            alt="poster"
          />
          <div className="leagueinfo-desc">
            <p>
              대회 이름 : <span>{leagueInfo.leagueId}</span>{" "}
            </p>
            <p>
              대회 일시 :{" "}
              <span>
                {leagueInfo.leagueStartDate} ~ {leagueInfo.leagueEndDate}
              </span>
            </p>
            <p>
              대회 장소 : <span>{leagueInfo.location}</span>{" "}
            </p>
          </div>
          <button type="button" onClick={() => signal("info")}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeaegueInfo;
