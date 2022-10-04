import React, { useState } from "react";
import "./LeagueSupport.scss";
import { leagueDetailType, teamType } from "apis/leagues/LeagueDetail";
import { numberWithCommas } from "utils/numberComma";
import Counter from "components/Counter/Counter";
import SupportDetail from "./SupportDetail";

interface leagueSupportType {
  leagueInfo: leagueDetailType;
  change: () => void;
  isClose: boolean;
}

function LeagueSupport({ leagueInfo, change, isClose }: leagueSupportType) {
  const test = 60;
  const test2 = 40;
  const [detailModal, setDetailModal] = useState(false);

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
              width: test * 10,
              backgroundColor: leagueInfo.team1.teamColor
            }}
          >
            {numberWithCommas(leagueInfo.team1.teamDonation)} WON
          </div>
          <div
            className="leaguesupport-bar-item"
            style={{
              width: test2 * 10,
              backgroundColor: leagueInfo.team2.teamColor
            }}
          >
            {numberWithCommas(leagueInfo.team2.teamDonation)} WON
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
