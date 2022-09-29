import React, { useEffect, useState } from "react";
import "./University.scss";
import nullLogo from "assets/images/noimage.gif";

import rankLogo1 from "assets/images/rank1.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import LeaguesIng from "./LeaguesIng";
import LeaguesEd from "./LeaguesEd";
import UniSponRank from "./UniSponRank";
import Trophy from "./Trophy";

interface myUniType {
  universityName: string;
  universityAddress: string;
  homepage: string;
  logoUrl: string | undefined;
}

function University() {
  const [bar, setBar] = useState("ing");
  const [myUni, setMyUni] = useState<myUniType>({
    universityName: "",
    homepage: "",
    universityAddress: "",
    logoUrl: ""
  });

  const uniId = useParams().id;

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

  console.log(myUni.homepage);
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
              <img className="rank-logo" src={rankLogo1} alt="" />
              <p className="rank-logo-text">1</p>
            </div>
          </p>
          <p className="uni-box-text-total">{myUni.universityAddress}</p>
          <p className="uni-box-text-price">총 후원 금액 : 300,000,000 eth</p>
        </div>
        <Trophy />
        <UniSponRank />
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
              {bar === "ing" ? <LeaguesIng /> : <LeaguesEd />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default University;
