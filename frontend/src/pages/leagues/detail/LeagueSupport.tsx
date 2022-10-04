import React, { useState, useEffect } from "react";
import "./LeagueSupport.scss";
import { leagueDetailType } from "apis/leagues/LeagueDetail";
import { numberWithCommas } from "utils/numberComma";
import Counter from "components/Counter/Counter";
import SupportDetail from "./SupportDetail";

interface leagueSupportType {
  leagueInfo: leagueDetailType;
  change: () => void;
  isClose: boolean;
}

function LeagueSupport({ leagueInfo, change, isClose }: leagueSupportType) {
  const [team1, setTeam1] = useState(50);
  const [detailModal, setDetailModal] = useState(false);

  useEffect(() => {
    const team1Amount = leagueInfo.team1.teamDonation;
    const team2Amount = leagueInfo.team2.teamDonation;
    const perCent = (team1Amount / (team1Amount + team2Amount)) * 100;
    if (perCent) {
      setTeam1(perCent);
    }
  }, [leagueInfo]);

  return (
    <div id="leaguesupport">
      <div className="leaguesupport">
        <div className="leaguesupport-amount">
          <Counter end={leagueInfo.allDonation} timer={0.1} /> WON
        </div>
        <div className="leaguesupport-bar">
          <div
            className="leaguesupport-bar-item"
            style={{
              width: team1 * 10,
              backgroundColor: leagueInfo.team1.teamColor
            }}
          >
            <p className="team1">
              {numberWithCommas(leagueInfo.team1.teamDonation)} WON
            </p>
          </div>
          <div
            className="leaguesupport-bar-item"
            style={{
              width: (100 - team1) * 10,
              backgroundColor: leagueInfo.team2.teamColor
            }}
          >
            <p className="team2">
              {numberWithCommas(leagueInfo.team2.teamDonation)} WON
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            if (isClose) {
              return alert("종료 된 대회입니다.");
            }
            return setDetailModal(true);
          }}
          className="leaguesupport-support"
          type="button"
        >
          대회 후원하기
        </button>
        {detailModal && (
          <SupportDetail
            leagueInfo={leagueInfo}
            signal={() => {
              change();
              setDetailModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default LeagueSupport;
