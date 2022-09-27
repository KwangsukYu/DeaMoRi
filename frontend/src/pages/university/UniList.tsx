import React, { useEffect, useState } from "react";
import "./UniList.scss";
import uniLogo1 from "assets/images/uni1.png";
import rankLogo1 from "assets/images/rank1.png";
import rankLogo2 from "assets/images/rank2.png";
import rankLogo3 from "assets/images/rank3.png";
import rankLogo4 from "assets/images/rank4.png";
import axios from "axios";
import Pagination from "../../components/Pagination/Pagination";

function UniList() {
  const [uniList, setUniList] = useState([]);

  useEffect(() => {
    axios({
      url: "http://j7c208.p.ssafy.io:8080/api/univers/list",
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.token}` }
    })
      .then(res => {
        console.log(res.data);
        setUniList(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  console.log(uniList);
  const myUni = { rank: 3, name: "싸피대학교", price: "53000000" };
  let rankImg = "";
  let rankClass = "";
  if (myUni.rank === 1) {
    rankImg = rankLogo1;
    rankClass = "rankLogo1";
  } else if (myUni.rank === 2) {
    rankImg = rankLogo2;
    rankClass = "rankLogo2";
  } else if (myUni.rank === 3) {
    rankImg = rankLogo3;
    rankClass = "rankLogo3";
  } else {
    rankImg = rankLogo4;
    rankClass = "rankLogo4";
  }

  return (
    <div id="uni-list">
      <div className="uni-list">
        <p className="uni-list-title">내 대학교</p>
        <div className="uni-list-background">
          <div className="uni-list-background-my">
            <div className="uni-list-background-my-logo-box">
              <div className="uni-list-background-my-logo-box-logo">
                <img src={uniLogo1} alt="asdf" />
              </div>
              <p className="uni-list-background-my-logo-box-text">
                {myUni.name}
              </p>
            </div>
            <div className="uni-list-my-text-box">
              <div className="uni-list-my-text">
                <p>랭킹</p>
                <p>총 후원 받은 금액</p>
                <p>내가 후원 한 금액</p>
              </div>
              <div className="uni-list-my-text">
                <div className="uni-list-my-text-logo-box">
                  <img className={rankClass} src={rankImg} alt="" />
                  <p className="uni-list-my-text-logo-box-text">{myUni.rank}</p>
                </div>
                <p>{myUni.price}</p>
                <p>100,000 MOK</p>
              </div>
            </div>
          </div>
        </div>
        <div className="uni-list-total">
          <div className="uni-list-total-title">전체 대학교</div>
          <div className="uni-list-total-background">
            <div className="uni-card-background">
              <div className="uni-card">
                <div className="uni-card-back">
                  <img className="uni-card-logo" src={uniLogo1} alt="" />
                </div>
                <p className="uni-card-text">서울대학교</p>
              </div>
            </div>
            <div className="uni-card-background">adsf</div>
            <div className="uni-card-background">adsf</div>
            <div className="uni-card-background">adsf</div>
            <div className="uni-card-background">adsf</div>
            <div className="uni-card-background">adsf</div>
            <div className="uni-card-background">adsf</div>
            <div className="uni-card-background">adsf</div>
            <div className="uni-card-background">adsf</div>
            <div className="uni-card-background">adsf</div>
            <div className="uni-card-background">adsf</div>
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  );
}
export default UniList;
