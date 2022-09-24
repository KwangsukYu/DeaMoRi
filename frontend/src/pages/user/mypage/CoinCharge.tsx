import React from "react";
import "./CoinCharge.scss";

interface CoinChargeProps {
  signal: () => void;
}

function CoinCharge({ signal }: CoinChargeProps) {
  return (
    <div className="wrapper">
      <div id="charge">
        <div className="charge">
          <p>코인 충전</p>
          <p>블록체인 결정되면 마저 구현</p>
          <button type="button" onClick={signal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoinCharge;
