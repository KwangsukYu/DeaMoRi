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
      url: "https://j7c208.p.ssafy.io:8080/api/ranking/update/user",
      method: "put",
      params: { page: 0, size: 10 }
    })
      .then(res => {
        console.log(res.data);
        axios({
          url: "https://j7c208.p.ssafy.io:8080/api/ranking/user",
          method: "get",
          params: { page: 0, size: 10 }
        })
          .then(resp => {
            setUserRank(resp.data.userRankings);
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

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
      <button type="button" key={v4()} className="rank-main">
        {user.donation === 0 ? (
          <div className="logo-box">
            <img className={rankClass} src={rankLogo4} alt="" />
            <p className="rank-main-unrank">-</p>
          </div>
        ) : (
          <div className="logo-box">
            <img className={rankClass} src={rankImg} alt="" />
            <p className="rank-main-rank">{user.ranking}</p>
          </div>
        )}

        <p className="rank-main-name">{user.nickName}</p>
        <p className="rank-main-price">
          {user.donation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} WON
        </p>
      </button>
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
