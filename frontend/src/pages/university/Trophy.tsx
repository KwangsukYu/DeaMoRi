import React from "react";
import Badge from "assets/images/RewardBadge.svg";
import "./Trophy.scss";
import { v4 } from "uuid";

function Trophy() {
  const badgeDummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="trophy">
      <p className="trophy-title">트로피</p>
      <div className="trophy-box">
        <div className="trophy-box-container">
          {badgeDummy.map(() => (
            <img
              src={Badge}
              alt="badge"
              title="후원1등"
              key={v4()}
              className="trophy-item"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Trophy;
