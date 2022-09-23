import React from "react";
import { v4 } from "uuid";
import Badge from "assets/images/RewardBadge.svg";
import "./UniSponRank.scss";
import rankLogo1 from "assets/images/rank1.png";
import rankLogo2 from "assets/images/rank2.png";
import rankLogo3 from "assets/images/rank3.png";
import rankLogo4 from "assets/images/rank4.png";

function SponRank() {
  const universities = [
    { rank: 1, name: "홍석호홍석호홍석호", price: "5000000" },
    { rank: 2, name: "유광석", price: "4000000" },
    { rank: 3, name: "이민재", price: "3000000" },
    { rank: 4, name: "김성민", price: "2000000" },
    { rank: 5, name: "이성조", price: "1000000" }
  ];
  const RankMain = universities.map(uni => {
    let rankImg = "";
    let rankClass = "";
    if (uni.rank === 1) {
      rankImg = rankLogo1;
      rankClass = "rankLogo1";
    } else if (uni.rank === 2) {
      rankImg = rankLogo2;
      rankClass = "rankLogo2";
    } else if (uni.rank === 3) {
      rankImg = rankLogo3;
      rankClass = "rankLogo3";
    } else {
      rankImg = rankLogo4;
      rankClass = "rankLogo4";
    }
    return (
      <div key={v4()} className="spon-rank-amount">
        <div className="logo-box">
          <img className={rankClass} src={rankImg} alt="" />
          <p className="spon-rank-rank">{uni.rank}</p>
        </div>
        <p className="spon-rank-name">{uni.name}</p>
        <p className="spon-rank-price">{uni.price}</p>
      </div>
    );
  });

  return (
    <div id="spon-rank">
      <p className="spon-rank-title">후원랭킹</p>
      <div className="spon-rank">
        <div id="spon-rank-amount">
          <div className="spon-support-desc">
            <p>랭킹</p>
            <p>이름</p>
            <p>금액</p>
          </div>
          {RankMain}
        </div>
      </div>
    </div>
  );
}
export default SponRank;
