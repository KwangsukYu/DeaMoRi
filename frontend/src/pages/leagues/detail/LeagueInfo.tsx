import React from "react";
import "./LeagueInfo.scss";
import PosterSample from "assets/images/poster_sample.jpg";

interface LeagueDetailProps {
  signal: (type: string) => void;
}

function LeaegueInfo({ signal }: LeagueDetailProps) {
  return (
    <div className="info-wrapper">
      <div id="leagueinfo">
        <div className="leagueinfo">
          <p className="leagueinfo-title">대회 정보</p>
          <img className="leagueinfo-img" src={PosterSample} alt="poster" />
          <div className="leagueinfo-desc">
            <p>대회 이름</p>
            <p>대회 일시</p>
            <p>대회 장소</p>
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
