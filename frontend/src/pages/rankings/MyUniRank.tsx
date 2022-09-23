import React from "react";
import "./Rankings.scss";
import rankLogo1 from "assets/images/rank1.png";
import rankLogo2 from "assets/images/rank2.png";
import rankLogo3 from "assets/images/rank3.png";
import rankLogo4 from "assets/images/rank4.png";

function MyUniRank() {
  const myUni = { rank: 112, name: "싸피대학교", price: "53000000" };
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
    <div key={myUni.rank} className="rank-main">
      <div className="logo-box">
        <img className={rankClass} src={rankImg} alt="" />
        <p className="rank-main-rank">{myUni.rank}</p>
      </div>
      <p className="rank-main-name">{myUni.name}</p>
      <p className="rank-main-price">{myUni.price} MOKO</p>
    </div>
  );
}

export default MyUniRank;
