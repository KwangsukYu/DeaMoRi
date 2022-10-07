import React from "react";
import "./SupportItem.scss";
import numberComma, { numberWithCommas } from "utils/numberComma";
import DAEMORILogo from "assets/images/DAEMORI_logo.svg";
import UserDummy from "assets/images/userDummy2.png";
import defaultSchool from "assets/images/defaultSchool.png";
import { supporterType } from "apis/leagues/LeagueDetail";

interface SupportListProps {
  rank: number;
  supporter: supporterType;
}

function SupportItem({ rank, supporter }: SupportListProps) {
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
          <img
            src={
              supporter.universityLogoUrl
                ? supporter.universityLogoUrl
                : defaultSchool
            }
            alt=""
          />
        </div>
        <div className="supportitem-content">
          <img
            className="supportitem-content-icon"
            src={supporter.profileUrl ? supporter.profileUrl : UserDummy}
            alt=""
          />
          <p className="supportitem-content-title">{supporter.supportName}</p>
        </div>
        <div className="supportitem-amount">
          {numberWithCommas(supporter.supportBalance)} WON
        </div>
      </div>
    </div>
  );
}

export default SupportItem;
