import React, { useState, useEffect } from "react";
import { getLeagueDetail, leagueDetailType } from "apis/leagues/LeagueDetail";
import Counter from "components/Counter/Counter";
import { numberWithCommas } from "utils/numberComma";
import "./LiveSupport.scss";

function LiveSupport() {
  const [leagueInfo, setLeagueInfo] = useState<leagueDetailType>();
  const [team1, setTeam1] = useState(50);
  const [team2, setTeam2] = useState(50);

  useEffect(() => {
    (async () => {
      const result = await getLeagueDetail(13);
      setLeagueInfo(result);
    })();
    if (leagueInfo) {
      const team1Amount = leagueInfo.team1.teamDonation;
      const team2Amount = leagueInfo.team2.teamDonation;
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
  }, []);

  if (!leagueInfo) {
    return <div>123</div>;
  }

  return (
    <div id="live-support">
      <div className="live-support">
        <div
          className="live-support-team"
          //   style={{ backgroundColor: leagueInfo?.team1.teamColor }}
        >
          <img src={leagueInfo?.team1.teamUniversitylogoUrl} alt="" />
          <p>{leagueInfo?.team1.teamUniversityName}</p>
        </div>
        <div className="live-support-bar">
          <div className="live-support-bar-amount">
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
                width: team1 * 6,
                backgroundColor: leagueInfo.team1.teamColor
              }}
            />
            <div
              className="live-support-bar-item"
              style={{
                width: team2 * 6,
                backgroundColor: leagueInfo.team2.teamColor
              }}
            />
          </div>
          <div className="live-support-bar-desc">
            <div className="live-support-bar-team1">
              <p>{leagueInfo.team1.teamDonation}</p>
              <p>{leagueInfo?.team1.teamName}</p>
            </div>
            <div className="live-support-bar-support">
              <button type="button" className="live-support-bar-support-button">
                후원하기
              </button>
            </div>
            <div className="live-support-bar-team2">
              <p>{leagueInfo.team2.teamDonation}</p>
              <p>{leagueInfo?.team2.teamName}</p>
            </div>
          </div>
        </div>
        <div
          className="live-support-team"
          //   style={{ backgroundColor: leagueInfo?.team2.teamColor }}
        >
          <img src={leagueInfo?.team2.teamUniversitylogoUrl} alt="" />
          <p>{leagueInfo?.team2.teamUniversityName}</p>
        </div>
      </div>
    </div>
  );
}

export default LiveSupport;
