import React, { useEffect, useState } from "react";
import "./Rankings.scss";
import rankLogo1 from "assets/images/rank1.png";
import rankLogo2 from "assets/images/rank2.png";
import rankLogo3 from "assets/images/rank3.png";
import rankLogo4 from "assets/images/rank4.png";
import axios from "axios";
import { v4 } from "uuid";
import MySponRank from "./MySponRank";

interface userRankType {
  userPk: number;
  ranking: number;
  donation: number;
  nickName: string;
  userName: string;
  badge: string;
  universityPk: number;
  universityName: null;
  universityLogo: null;
}

function SponRankings() {
  const [userRank, setUserRank] = useState<userRankType[]>([]);
  useEffect(() => {
    axios({
      url: "http://j7c208.p.ssafy.io:8080/api/ranking/user",
      method: "get",
      params: { page: 0, size: 10 }

      // headers: { Authorization: `Bearer ${localStorage.token}` }
    })
      .then(res => {
        console.log(res);
        setUserRank(res.data.userRankings);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  // const universities = [
  //   { rank: 1, name: "홍석호홍석호홍석호", price: "5000000" },
  //   { rank: 2, name: "유광석", price: "4000000" },
  //   { rank: 3, name: "이민재", price: "3000000" },
  //   { rank: 4, name: "김성민", price: "2000000" },
  //   { rank: 5, name: "이성조", price: "1000000" }
  // ];

  const RankMain = userRank.map(user => {
    let rankImg = "";
    let rankClass = "";
    console.log(user);
    if (user.ranking === 1) {
      rankImg = rankLogo1;
      rankClass = "rankLogo1";
    } else if (user.ranking === 2) {
      rankImg = rankLogo2;
      rankClass = "rankLogo2";
    } else if (user.ranking === 3) {
      rankImg = rankLogo3;
      rankClass = "rankLogo3";
    } else {
      rankImg = rankLogo4;
      rankClass = "rankLogo4";
    }

    return (
      <div key={v4()} className="rank-main">
        <div className="logo-box">
          <img className={rankClass} src={rankImg} alt="" />
          <p className="rank-main-rank">{user.ranking}</p>
        </div>
        <p className="rank-main-name">{user.nickName}</p>
        <p className="rank-main-price">{user.donation} MOKO</p>
      </div>
    );
  });

  console.log(userRank);

  return (
    <div id="rank-box">
      <div className="rank-menu">
        <p className="rank-menu-rank">순위</p>
        <p className="rank-menu-name">후원자명</p>
        <p className="rank-menu-price">후원금</p>
      </div>
      <div>
        <p className="my-uni-title">내 후원 순위</p>
        <MySponRank />
        <div className="line" />
      </div>
      <p className="total-uni-title">전체 후원 순위</p>
      {RankMain}
    </div>
  );
}
export default SponRankings;
