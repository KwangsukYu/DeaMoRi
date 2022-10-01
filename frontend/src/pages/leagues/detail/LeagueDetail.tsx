import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./LeagueDetail.scss";
import {
  getLeagueDetail,
  leagueDetailType,
  teamType
} from "apis/leagues/LeagueDetail";
import CreateRoom from "pages/live/CreateRoom";
import LeagueSupport from "./LeagueSupport";
import TeamDetail from "./TeamDetail";
import LeaegueInfo from "./LeagueInfo";
import ResultModal from "./ResultModal";

function LeagueDetail() {
  const [leagueState, setLeagueState] = useState("start");
  const [detailModal, setDetailModal] = useState(false);
  const [isOwner, setIsOwner] = useState(true);
  const [resultModal, setResultModal] = useState(false);
  const [leagueInfo, setLeagueInfo] = useState<leagueDetailType>();
  const [team1, setTeam1] = useState<teamType>();
  const [team2, setTeam2] = useState<teamType>();
  const [changed, setChanged] = useState(false);
  const { leagueId } = useParams();

  useEffect(() => {
    (async () => {
      const res = await getLeagueDetail(parseInt(leagueId as string, 10));
      setLeagueInfo(res);
      setTeam1(res.team1);
      setTeam2(res.team2);
    })();
  }, [leagueId, changed]);

  const signal = (type: string) => {
    if (type === "info") {
      setDetailModal(false);
    } else if (type === "result") {
      setResultModal(false);
    }
  };

  const change = () => {
    setChanged(!changed);
  };

  if (!leagueInfo) {
    return <div>123</div>;
  }

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
            <p>대회 종료</p>
          </div>
          <div className="leaguedetail-status-bar" />
        </div>
        {isOwner && (
          <div className="leaguedetail-status-change">
            <p>주최자만 경기 상태를 변경할 수 있습니다.</p>
            <select onChange={e => setLeagueState(e.target.value)}>
              <option value="start">대회시작 전</option>
              <option value="playing">대회진행 중</option>
              <option value="end">대회종료</option>
            </select>
          </div>
        )}
        <p className="leaguedetail-title">{leagueInfo?.leagueId}</p>
        <div className="leaguedetail-info">
          <div
            className="leaguedetail-info-team"
            style={{ backgroundColor: team1?.teamColor }}
          >
            <div className="leaguedetail-info-team-info">
              <p>60%</p>
              <button type="button">대학 정보</button>
            </div>
            <div className="leaguedetail-info-team-profile">
              <img src={team1?.teamUniversitylogoUrl} alt="team" />
              <p>{team1?.teamUniversityName}</p>
            </div>
          </div>
          <div className="leaguedetail-info-desc">
            <button type="button" onClick={() => setDetailModal(true)}>
              대회 정보
            </button>
            {detailModal && <LeaegueInfo signal={signal} />}
            <p>VS</p>
            {leagueState === "start" && (
              <div>
                <p>대회 시작 일</p>
                <p>{leagueInfo?.leagueStartDate}</p>
              </div>
            )}
            {leagueState === "playing" && !isOwner && (
              <button type="button" className="live-button">
                중계
              </button>
            )}
            {leagueState === "playing" && isOwner && <CreateRoom />}
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
            style={{ backgroundColor: team2?.teamColor }}
          >
            <div className="leaguedetail-info-team-profile">
              <img src={team2?.teamUniversitylogoUrl} alt="team" />
              <p>{team2?.teamUniversityName}</p>
            </div>
            <div className="leaguedetail-info-team-info">
              <p>40%</p>
              <button type="button">대학 정보</button>
            </div>
          </div>
        </div>
        <LeagueSupport leagueInfo={leagueInfo} change={change} />
        <div className="leaguedetail-tip">
          <TeamDetail
            leaguePk={leagueInfo.leaguePk}
            teamNumber={0}
            teamInfo={leagueInfo.team1}
            change={change}
          />
          <TeamDetail
            leaguePk={leagueInfo.leaguePk}
            teamNumber={1}
            teamInfo={leagueInfo.team2}
            change={change}
          />
        </div>
      </div>
    </div>
  );
}

export default LeagueDetail;
