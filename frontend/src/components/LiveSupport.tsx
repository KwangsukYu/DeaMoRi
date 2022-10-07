import React, { useState, useEffect } from "react";
import { getLeagueDetail, leagueDetailType } from "apis/leagues/LeagueDetail";
import Counter from "components/Counter/Counter";
import { numberWithCommas } from "utils/numberComma";
import SupportDetail from "pages/leagues/detail/SupportDetail";
import "./LiveSupport.scss";

interface LiveSupportProps {
  leaguePk: number;
}

function LiveSupport({ leaguePk }: LiveSupportProps) {
  const [leagueInfo, setLeagueInfo] = useState<leagueDetailType>();
  const [team1, setTeam1] = useState(50);
  const [team2, setTeam2] = useState(50);
  const [change, setChange] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await getLeagueDetail(leaguePk);
      setLeagueInfo(result);
      if (result) {
        const team1Amount = result.team1.teamDonation;
        const team2Amount = result.team2.teamDonation;
        const perCent = (team1Amount / (team1Amount + team2Amount)) * 100;
        if (perCent) {
          setTeam1(perCent);
          setTeam2(100 - perCent);
        } else if (!team1Amount && !team2Amount) {
          setTeam1(50);
          setTeam2(50);
        } else {
          setTeam1(0);
          setTeam2(100);
        }
      }
    })();
  }, [leaguePk, change]);

  if (!leagueInfo) {
    return <div>123</div>;
  }

  return (
    <div id="live-support">
      <div className="live-support">
        <div
          className="live-support-team"
          // style={{ backgroundColor: leagueInfo?.team1.teamColor }}
        >
          <img src={leagueInfo?.team1.teamUniversitylogoUrl} alt="" />
          <p>{leagueInfo?.team1.teamUniversityName}</p>
        </div>
        <div className="live-support-bar">
          <div className="live-support-bar-amount">
            <span>총 후원액 : </span>
            {leagueInfo.allDonation === 0 ? (
              <div className="empty-support">0</div>
            ) : (
              <Counter end={leagueInfo.allDonation} timer={0.1} />
            )}
            <span> WON </span>
          </div>
          <div className="live-support-bar-bar">
            <div
              className="live-support-bar-item"
              style={{
                width: team1 * 7.0,
                backgroundColor: leagueInfo.team1.teamColor
              }}
            />
            <div
              className="live-support-bar-item"
              style={{
                width: team2 * 7.0,
                backgroundColor: leagueInfo.team2.teamColor
              }}
            />
          </div>
          <div className="live-support-bar-desc">
            <div className="live-support-bar-team1">
              <p>{numberWithCommas(leagueInfo.team1.teamDonation)} WON</p>
              <p>{leagueInfo?.team1.teamName}</p>
            </div>
            <div className="live-support-bar-support">
              <button
                onClick={() => setModal(true)}
                type="button"
                className="live-support-bar-support-button"
              >
                후원하기
              </button>
            </div>
            <div className="live-support-bar-team2">
              <p>{numberWithCommas(leagueInfo.team2.teamDonation)} WON</p>
              <p>{leagueInfo?.team2.teamName}</p>
            </div>
          </div>
        </div>
        <div
          className="live-support-team"
          // style={{ backgroundColor: leagueInfo?.team2.teamColor }}
        >
          <img src={leagueInfo?.team2.teamUniversitylogoUrl} alt="" />
          <p>{leagueInfo?.team2.teamUniversityName}</p>
        </div>
      </div>
      {modal && (
        <SupportDetail
          leagueInfo={leagueInfo}
          signal={() => {
            setChange(!change);
            setModal(false);
          }}
        />
      )}
    </div>
  );
}

export default LiveSupport;
