import React from "react";
import "./Rankings.scss";
import rankLogo1 from "assets/images/rank1.png";
import rankLogo2 from "assets/images/rank2.png";
import rankLogo3 from "assets/images/rank3.png";
import rankLogo4 from "assets/images/rank4.png";
import { infoType } from "Slices/userInfo";
import { useSelector } from "react-redux";

function MySponRank() {
  const storeUser = useSelector((state: infoType) => state.userInfo.userInfo);
  console.log(storeUser);
  const myUni = { rank: 123, name: "김싸피", price: "20000" };
  let rankImg = "";
  let rankClass = "";
  if (storeUser.ranking === 1) {
    rankImg = rankLogo1;
    rankClass = "rankLogo1";
  } else if (storeUser.ranking === 2) {
    rankImg = rankLogo2;
    rankClass = "rankLogo2";
  } else if (storeUser.ranking === 3) {
    rankImg = rankLogo3;
    rankClass = "rankLogo3";
  } else {
    rankImg = rankLogo4;
    rankClass = "rankLogo4";
  }
  return (
    <div key={storeUser.ranking} className="rank-main">
      <div className="logo-box">
        <img className={rankClass} src={rankImg} alt="" />
        <p className="rank-main-rank">{storeUser.ranking}</p>
      </div>
      <p className="rank-main-name">{storeUser.nickName}</p>
      <p className="rank-main-price">
        {storeUser.donation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
        MOKO
      </p>
    </div>
  );
}

export default MySponRank;
