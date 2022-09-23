import React from "react";
import "./CheckUniModal.scss";
import testImg from "assets/images/posterSample.png";

interface CoinChargeProps {
  signal: () => void;
}

function CheckUniModal({ signal }: CoinChargeProps) {
  return (
    <div className="wrapper">
      <div id="check-uni">
        <div className="check-uni">
          <p>추후 구현</p>
          <button type="button" onClick={signal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckUniModal;
