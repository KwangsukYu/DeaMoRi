import React, { useEffect, useState } from "react";
import "./University.scss";
import nullLogo from "assets/images/noimage.gif";
import rankLogo1 from "assets/images/rank1.png";
import rankLogo2 from "assets/images/rank2.png";
import rankLogo3 from "assets/images/rank3.png";
import rankLogo4 from "assets/images/rank4.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import LeaguesIng from "./LeaguesIng";
import LeaguesEd from "./LeaguesEd";
import UniSponRank from "./UniSponRank";
import Trophy from "./Trophy";

interface myUniType {
  donation: number;
  homepage: string;
  id: number;
  logoUrl: string;
  ranking: number;
  trophyList: [];
  universityAddress: string;
  universityName: string;
  userList: [];
}

function University() {
  const [bar, setBar] = useState("ing");
  const [myUni, setMyUni] = useState<myUniType>({
    donation: 0,
    homepage: "",
    id: 0,
    logoUrl: "",
    ranking: 0,
    trophyList: [],
    universityAddress: "",
    universityName: "",
    userList: []
  });

  const uniId = useParams().id;

  let rankImg = "";
  let uniRankClass = "";
  let textClass = "";
  if (myUni.ranking === 1) {
    rankImg = rankLogo1;
    uniRankClass = "rankLogo1";
    textClass = "1";
  } else if (myUni.ranking === 2) {
    rankImg = rankLogo2;
    uniRankClass = "rankLogo2";
    textClass = "2";
  } else if (myUni.ranking === 3) {
    rankImg = rankLogo3;
    uniRankClass = "rankLogo3";
    textClass = "3";
  } else {
    rankImg = rankLogo4;
    uniRankClass = "rankLogo4";
    textClass = "4";
  }

  useEffect(() => {
    axios({
      url: `http://j7c208.p.ssafy.io:8080/api/univers`,
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.token}` },
      params: { id: uniId }
    })
      .then(res => {
        setMyUni(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  console.log(myUni);
  return (
    <div id="university">
      <div className="background">
        <div className="uni-box">
          <div className="uni-box-logo">
            {myUni.logoUrl ? (
              <img className="uni-logo" src={myUni.logoUrl} alt="" />
            ) : (
              <img className="uni-logo" src={nullLogo} alt="" />
            )}
          </div>
        </div>
        {/* <div className="trophy-box"></div>
        <div className="leagues-box"></div> */}
        <div className="uni-box-text">
          <p className="uni-box-text-title">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.${myUni.homepage.trim()}`}
              className="homepage-link"
            >
              {myUni.universityName}
            </a>
            <div className="rank-logo-box">
              <img className={uniRankClass} src={rankImg} alt="" />
              <p className={`rank-logo-text-${textClass}`}>{myUni.ranking}</p>
            </div>
          </p>
          <p className="uni-box-text-total">{myUni.universityAddress}</p>
          <p className="uni-box-text-price">
            {myUni.donation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            WON
          </p>
        </div>
        <Trophy />
        <UniSponRank userList={myUni.userList} />
        <div id="rankings">
          <div className="modal">
            <div className="button-list">
              <button
                className="tab-button"
                type="button"
                onClick={() => {
                  setBar("ing");
                }}
              >
                <p
                  className={
                    bar === "ing"
                      ? "tab-button-title-active"
                      : "tab-button-title"
                  }
                >
                  진행중
                </p>
              </button>
              <button
                className="tab-button"
                type="button"
                onClick={() => {
                  setBar("ed");
                }}
              >
                <p
                  className={
                    bar === "ed"
                      ? "tab-button-title-active"
                      : "tab-button-title"
                  }
                >
                  종료
                </p>
              </button>
            </div>
            <div className="bar">
              {bar === "ing" ? (
                <div className="bar-state-uni" />
              ) : (
                <div className="bar-state-spon" />
              )}
            </div>
            <div className="tab-main">
              {bar === "ing" ? (
                <LeaguesIng uniPk={uniId} />
              ) : (
                <LeaguesEd uniPk={uniId} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default University;
