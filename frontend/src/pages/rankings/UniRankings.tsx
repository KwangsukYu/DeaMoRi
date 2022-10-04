import React, { useEffect, useState } from "react";
import "./Rankings.scss";
import rankLogo1 from "assets/images/rank1.png";
import rankLogo2 from "assets/images/rank2.png";
import rankLogo3 from "assets/images/rank3.png";
import rankLogo4 from "assets/images/rank4.png";
import axios from "axios";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import MyUniRank from "./MyUniRank";

interface uniRankType {
  uniPk: number;
  uniName: string;
  homepage: string;
  uniAddress: string;
  logoUrl: string;
  donation: number;
  ranking: number;
}

function UniRankings() {
  const navigate = useNavigate();

  const [uniRank, setUniRank] = useState<uniRankType[]>([]);

  useEffect(() => {
    axios({
      url: "https://j7c208.p.ssafy.io:8080/api/ranking/university",
      method: "get",
      params: { page: 0, size: 10 }
    })
      .then(res => {
        setUniRank(res.data.universityRankings);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios({
      url: "https://j7c208.p.ssafy.io:8080/api/ranking/update/university",
      method: "patch"
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const RankMain = uniRank.map(uni => {
    let rankImg = "";
    let rankClass = "";
    if (uni.ranking === 1) {
      rankImg = rankLogo1;
      rankClass = "rankLogo1";
    } else if (uni.ranking === 2) {
      rankImg = rankLogo2;
      rankClass = "rankLogo2";
    } else if (uni.ranking === 3) {
      rankImg = rankLogo3;
      rankClass = "rankLogo3";
    } else {
      rankImg = rankLogo4;
      rankClass = "rankLogo4";
    }
    return (
      <div key={v4()}>
        {uni.uniName ? (
          <button
            type="button"
            key={v4()}
            className="rank-main"
            onClick={() => {
              navigate(`/university/${uni.uniPk}`);
            }}
            style={{ cursor: "pointer" }}
          >
            {uni.donation === 0 ? (
              <div className="logo-box">
                <img className={rankClass} src={rankLogo4} alt="" />
                <p className="rank-main-unrank">-</p>
              </div>
            ) : (
              <div className="logo-box">
                <img className={rankClass} src={rankImg} alt="" />
                <p className="rank-main-rank">{uni.ranking}</p>
              </div>
            )}

            <p className="rank-main-name">{uni.uniName}</p>
            <p className="rank-main-price">
              {uni.donation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              WON
            </p>
          </button>
        ) : (
          <div>대학없어용</div>
        )}
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
      <div>
        <p className="my-uni-title">내 대학 순위</p>
        <MyUniRank />
        <div className="line" />
      </div>
      <p className="total-uni-title">전체 대학 순위</p>
      {RankMain}
    </div>
  );
}
export default UniRankings;
