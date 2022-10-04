import React, { useEffect } from "react";
import "./Rankings.scss";
import rankLogo1 from "assets/images/rank1.png";
import rankLogo2 from "assets/images/rank2.png";
import rankLogo3 from "assets/images/rank3.png";
import rankLogo4 from "assets/images/rank4.png";
import { infoType } from "Slices/userInfo";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getInfo } from "../../Slices/userInfo";

function MySponRank() {
  const storeUser = useSelector((state: infoType) => state.userInfo.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      url: "http://j7c208.p.ssafy.io:8080/api/users/me",
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.token}` }
    })
      .then(res => {
        console.log(res.data, "로그인 시 스토어 저장 데이터");
        dispatch(getInfo(res.data));
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

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
    <button type="button" key={storeUser.ranking} className="rank-main">
      <div className="logo-box">
        <img className={rankClass} src={rankImg} alt="" />
        <p className="rank-main-rank">{storeUser.ranking}</p>
      </div>
      <p className="rank-main-name">{storeUser.nickName}</p>
      <p className="rank-main-price">
        {storeUser.donation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
        WON
      </p>
    </button>
  );
}

export default MySponRank;
