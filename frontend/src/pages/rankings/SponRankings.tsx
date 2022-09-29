import React, { useEffect } from "react";
import "./Rankings.scss";
import rankLogo1 from "assets/images/rank1.png";
import rankLogo2 from "assets/images/rank2.png";
import rankLogo3 from "assets/images/rank3.png";
import rankLogo4 from "assets/images/rank4.png";
import axios from "axios";
import MySponRank from "./MySponRank";

function SponRankings() {
  useEffect(() => {
    axios({
      url: "http://j7c208.p.ssafy.io:8080/api/ranking/user",
      method: "get",
      params: { page: 0, size: 10 }

      // headers: { Authorization: `Bearer ${localStorage.token}` }
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  });

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
        <p className="rank-menu-name">후원자명</p>
        <p className="rank-menu-price">후원금</p>
      </div>
      <div>
        <p className="my-uni-title">마이 대학 순위</p>
        <MySponRank />
        <div className="line" />
      </div>
      <p className="total-uni-title">전체 대학 순위</p>
      {RankMain}
    </div>
  );
}
export default SponRankings;
