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
          <p className="check-uni-title">대학 인증</p>
          <div className="file-box">
            <img className="admin-img" src={userFile} alt="" />
          </div>

          <button className="admin-button" type="button" onClick={signal}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckUniModal;
