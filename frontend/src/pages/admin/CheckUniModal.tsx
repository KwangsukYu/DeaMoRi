import React from "react";
import "./CheckUniModal.scss";
import testImg from "assets/images/posterSample.png";

interface CoinChargeProps {
  signal: () => void;
  userFile: string;
}

function CheckUniModal({ signal, userFile }: CoinChargeProps) {
  return (
    <div className="wrapper">
      <div id="check-uni">
        <div className="check-uni">
          <img className="admin-img" src={userFile} alt="" />
          <button className="admin-button" type="button" onClick={signal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckUniModal;
