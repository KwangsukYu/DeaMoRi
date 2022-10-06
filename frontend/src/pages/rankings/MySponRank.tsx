import React, { useEffect } from "react";
import "./Rankings.scss";
import rankLogo1 from "assets/images/rank1.png";
import rankLogo2 from "assets/images/rank2.png";
import rankLogo3 from "assets/images/rank3.png";
import rankLogo4 from "assets/images/rank4.png";
import { infoType } from "Slices/userInfo";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getInfo } from "../../Slices/userInfo";

function MySponRank() {
  const storeUser = useSelector((state: infoType) => state.userInfo.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.token) {
      axios({
        url: "https://j7c208.p.ssafy.io:8080/api/users/me",
        method: "get",
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          dispatch(getInfo(res.data));
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, []);

  let rankImg = "";
  let rankClass = "";
  if (localStorage.token) {
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
  }

  return (
    <div>
      {localStorage.token ? (
        <button type="button" key={storeUser.ranking} className="rank-main">
          {storeUser.donation === 0 ? (
            <div className="logo-box-my">
              <img className={rankClass} src={rankLogo4} alt="" />
              <p className="rank-main-unrank">-</p>
            </div>
          ) : (
            <div className="logo-box-my">
              <img className={rankClass} src={rankImg} alt="" />
              <p className="rank-main-rank">{storeUser.ranking}</p>
            </div>
          )}

          <p className="rank-main-name">{storeUser.nickName}</p>
          <p className="rank-main-price">
            {storeUser.donation
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            WON
          </p>
        </button>
      ) : (
        <div>
          <div className="rank-main">
            <div className="no-uni-box">
              <p>로그인이 필요합니다.</p>
              <div className="login-signup-box">
                <button
                  type="button"
                  className="go-button"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  로그인
                </button>
                <button
                  type="button"
                  className="go-button"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  회원가입
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MySponRank;
