import React from "react";
import "./UniList.scss";
import nullLogo from "assets/images/noimage.gif";
import { v4 } from "uuid";

function UniCompo({ currentPosts }) {
  return (
    <div className="uni-list-total-background">
      {currentPosts.map(uni => {
        return (
          <div key={v4()} className="uni-card-background">
            <div className="uni-card">
              <div className="uni-card-back">
                {uni.logoUrl ? (
                  <img className="uni-card-logo" src={uni.logoUrl} alt="" />
                ) : (
                  <img className="uni-card-logo" src={nullLogo} alt="" />
                )}
                {/* <img className="uni-card-logo" src={uni.logoUrl} alt="" /> */}
              </div>
              <p className="uni-card-text">{uni.universityName}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default UniCompo;
