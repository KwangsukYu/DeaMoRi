import React from "react";
import "./UniList.scss";
import uniLogo1 from "assets/images/uni1.png";

function UniList() {
  return (
    <div id="uni-list">
      <div className="uni-list">
        <p>내 대학</p>
        <div className="uni-list-background">
          <div className="uni-list-background-my">
            <div className="uni-list-background-my-logo-box">
              <div className="uni-list-background-my-logo-box-logo">
                <img src={uniLogo1} alt="asdf" />
              </div>
              <p className="uni-list-background-my-logo-box-text">서울대학교</p>
            </div>
            <div className="uni-list-my-title">
              <p>랭킹</p>
              <p>총 후원 받은 금액</p>
              <p>내가 후원 한 금액</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UniList;
