import React from "react";
import "./SupportItem.scss";
import numberComma from "utils/numberComma";
import UserDummy from "assets/images/UserDummy.svg";
import SchoolIcon from "assets/images/SchoolIcon.svg";
import RewardBadge from "assets/images/RewardBadge.svg";

interface SupportListProps {
  rank: number;
}

function SupportItem({ rank }: SupportListProps) {
  const getRank = (num: number) => {
    if (rank === 1) {
      return "#5c6bc0";
    }
    if (rank === 2) {
      return "#9fa8da";
    }
    if (rank === 3) {
      return "#99a0be";
    }
    if (rank === 4) {
      return "#e3e3e3";
    }
    return "#ffffff";
  };
  return (
    <div id="supportitem">
      <div
        className="supportitem"
        style={{
          background: `${getRank(rank)}`,
          color: rank === 1 ? "white" : "black"
        }}
      >
        <div className="supportitem-profile">
          <img src={SchoolIcon} alt="" />
        </div>
        <div className="supportitem-content">
          <img className="supportitem-content-icon" src={UserDummy} alt="" />
          <p className="supportitem-content-title">닉네임은팔글자야</p>
          <img className="supportitem-content-icon" src={RewardBadge} alt="" />
        </div>
        <div className="supportitem-amount">100,000,000</div>
      </div>
    </div>
  );
}

export default SupportItem;
