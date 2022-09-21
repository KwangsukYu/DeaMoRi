import React, { useState } from "react";
import "./Rankings.scss";
import rankLogo1 from "assets/images/rank1.png";
import rankLogo2 from "assets/images/rank2.png";
import rankLogo3 from "assets/images/rank3.png";
import rankLogo4 from "assets/images/rank4.png";

function UniRankings() {
  const universities = [
    { rank: 1, name: "전남대학교", price: "5000000" },
    { rank: 2, name: "조선대학교", price: "4000000" },
    { rank: 3, name: "서울대학교", price: "3000000" },
    { rank: 4, name: "연세대학교", price: "2000000" },
    { rank: 500, name: "고려대학교", price: "1000000" }
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
      <div key={uni.rank} className="rank-main">
        <div className="logo-box">
          <img className={rankClass} src={rankImg} alt="" />
          <p className="rank-main-rank">{uni.rank}</p>
        </div>
        <p className="rank-main-name">{uni.name}</p>
        <p className="rank-main-price">{uni.price} MOKO</p>
      </div>
    );
  });

  return (
    <div id="rank-box">
      <div className="rank-menu">
        <p className="rank-menu-rank">순위</p>
        <p className="rank-menu-name">학교명</p>
        <p className="rank-menu-price">획득상금</p>
      </div>
      {RankMain}
    </div>
  );
}
export default UniRankings;
