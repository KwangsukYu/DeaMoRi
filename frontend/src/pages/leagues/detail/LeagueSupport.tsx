import React, { useState } from "react";
import "./LeagueSupport.scss";
import { leagueDetailType, teamType } from "apis/leagues/LeagueDetail";
import { numberWithCommas } from "utils/numberComma";
import Counter from "components/Counter/Counter";
import SupportDetail from "./SupportDetail";

interface leagueSupportType {
  leagueInfo: leagueDetailType;
  change: () => void;
}

function LeagueSupport({ leagueInfo, change }: leagueSupportType) {
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
          onClick={() => setDetailModal(true)}
          className="leaguesupport-support"
          type="button"
        >
          후원 하기
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
