import React, { useState } from "react";
import "./LeagueSupport.scss";
import { numberWithCommas } from "utils/numberComma";
import Counter from "components/Counter/Counter";
import SupportDetail from "./SupportDetail";

function LeagueSupport() {
  const test = 60;
  const test2 = 40;
  const teamColor1 = "#007350";
  const teamColor2 = "#5b89e6";
  const [detailModal, setDetailModal] = useState(false);

  return (
    <div id="leaguesupport">
      <div className="leaguesupport">
        <p className="leaguesupport-amount">
          <Counter end={200000000} timer={0.1} /> WON
        </p>
        <div className="leaguesupport-bar">
          <div
            className="leaguesupport-bar-item"
            style={{ width: test * 10, backgroundColor: teamColor1 }}
          >
            {numberWithCommas(120000000)} WON
          </div>
          <div
            className="leaguesupport-bar-item"
            style={{ width: test2 * 10, backgroundColor: teamColor2 }}
          >
            {numberWithCommas(80000000)} WON
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
            signal={() => {
              setDetailModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default LeagueSupport;
