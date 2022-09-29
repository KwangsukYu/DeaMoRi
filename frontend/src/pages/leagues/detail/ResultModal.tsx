import React from "react";
import "./ResultModal.scss";
import TrophyGenerator from "./TrophyGenerator";

interface LeagueDetailProps {
  signal: (type: string) => void;
}

function ResultModal({ signal }: LeagueDetailProps) {
  return (
    <div className="result-wrapper">
      <div id="resultmodal">
        <div className="resultmodal">
          <p className="result-title">결과 정산</p>
          <TrophyGenerator />
          <button type="button" onClick={() => signal("result")}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultModal;
