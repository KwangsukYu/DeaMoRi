import React, { useState } from "react";
import "./LeagueDetail.scss";
import SchoolIcon from "assets/images/SchoolIcon.svg";
import SchoolIcon2 from "assets/images/SchoolIcon2.svg";
import LeagueSupport from "./LeagueSupport";
import TeamDetail from "./TeamDetail";
import LeaegueInfo from "./LeagueInfo";
import ResultModal from "./ResultModal";

function LeagueDetail() {
  const [leagueState, setLeagueState] = useState("end");
  const [detailModal, setDetailModal] = useState(false);
  const [isOwner, setIsOwner] = useState(true);
  const [resultModal, setResultModal] = useState(false);

  const teamColor1 = "#007350";
  const teamColor2 = "#5b89e6";

  const signal = (type: string) => {
    if (type === "info") {
      setDetailModal(false);
    } else if (type === "result") {
      setResultModal(false);
    }
  };

  return (
    <div id="leaguedetail">
      <div className="leaguedetail">
        <div className="leaguedetail-status">
          <div className="leaguedetail-status-circle">
            <div
              className={`circle ${
                leagueState === "start" ? "active" : "white"
              }`}
            />
            <p>진행 예정</p>
          </div>
          <div className="leaguedetail-status-circle">
            <div
              className={`circle ${
                leagueState === "playing" ? "active" : "white"
              }`}
            />
            <p>진행 중</p>
          </div>
          <div className="leaguedetail-status-circle">
            <div
              className={`circle ${leagueState === "end" ? "active" : "white"}`}
            />
            <p>경기 종료</p>
          </div>
          <div className="leaguedetail-status-bar" />
        </div>
        {isOwner && (
          <div className="leaguedetail-status-change">
            <p>주최자만 경기 상태를 변경할 수 있습니다.</p>
            <select onChange={e => setLeagueState(e.target.value)}>
              <option value="start">대회시작 전</option>
              <option value="playing">대회진행 중</option>
              <option value="end">대회완료</option>
            </select>
          </div>
        )}
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
            <button type="button" onClick={() => setDetailModal(true)}>
              대회 정보
            </button>
            {detailModal && <LeaegueInfo signal={signal} />}
            <p>VS</p>
            {leagueState === "start" && <div> 시작 전</div>}
            {leagueState === "playing" && (
              <button type="button" className="live-button">
                중계
              </button>
            )}
            {leagueState === "end" && !isOwner && (
              <button type="button" className="end-button ">
                경기 종료
              </button>
            )}
            {leagueState === "end" && isOwner && (
              <button
                type="button"
                onClick={() => setResultModal(true)}
                className="live-button"
              >
                정산 하기
              </button>
            )}
            {resultModal && <ResultModal signal={signal} />}
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
