import React from "react";
import "./SupportDetail.scss";

interface SupportDetailProps {
  signal: () => void;
}

function SupportDetail({ signal }: SupportDetailProps) {
  return (
    <div className="support-wrapper">
      <div id="supportdetail">
        <div className="supportdetail">
          <p>후원 하기</p>
          <p>팀 선택</p>
          <p>teamA vs teamB</p>
          <p>보유 금액</p>
          <p>1,000,000</p>
          <p>금액 입력</p>
          <input type="text" />
          <button type="button">후원</button>
          <button type="button" onClick={signal}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default SupportDetail;
