import React from "react";
import { v4 } from "uuid";
import "./SupportList.scss";
import { supporterType } from "apis/leagues/LeagueDetail";
import SupportItem from "./SupportItem";

interface SupportListProps {
  supporters: supporterType[];
}

function SupportList({ supporters }: SupportListProps) {
  const supportersRank = supporters
    .sort(function (a, b) {
      return b.supportBalance - a.supportBalance;
    })
    .slice(0, 10);

  return (
    <div id="supportlist">
      <div className="supportlist">
        <p>후원 랭킹은 대회 후원을 기준으로 집계됩니다.</p>
        {supportersRank.map((supporter, i) => {
          return <SupportItem key={v4()} rank={i + 1} supporter={supporter} />;
        })}
      </div>
    </div>
  );
}

export default SupportList;
