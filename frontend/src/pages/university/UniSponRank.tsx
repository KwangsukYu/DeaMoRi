import React, { ReactNode } from "react";
import { v4 } from "uuid";
import Badge from "assets/images/RewardBadge.svg";
import "./UniSponRank.scss";
import rankLogo1 from "assets/images/rank1.png";
import rankLogo2 from "assets/images/rank2.png";
import rankLogo3 from "assets/images/rank3.png";
import rankLogo4 from "assets/images/rank4.png";

function SponRank({ userList }: any) {
  const universities = [
    { rank: 1, name: "홍석호홍석호홍석호", price: "5000000" },
    { rank: 2, name: "유광석", price: "4000000" },
    { rank: 3, name: "이민재", price: "3000000" },
    { rank: 4, name: "김성민", price: "2000000" },
    { rank: 5, name: "이성조", price: "1000000" }
  ];
  console.log(userList, "유저리스트");
  const RankMain = userList?.map(
    (
      user: {
        donation: ReactNode;
        nickName: ReactNode;
        index: number;
        rank:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | React.ReactFragment
          | null
          | undefined;
        name:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | React.ReactFragment
          | React.ReactPortal
          | null
          | undefined;
        price:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | React.ReactFragment
          | React.ReactPortal
          | null
          | undefined;
      },
      index: any
    ) => {
      let rankImg = "";
      let rankClass = "";
      if (index === 0) {
        rankImg = rankLogo1;
        rankClass = "rankLogo1";
      } else if (index === 1) {
        rankImg = rankLogo2;
        rankClass = "rankLogo2";
      } else if (index === 2) {
        rankImg = rankLogo3;
        rankClass = "rankLogo3";
      } else {
        rankImg = rankLogo4;
        rankClass = "rankLogo4";
      }
      return (
        <div key={v4()} className="spon-rank-amount">
          <div className="logo-box">
            <img className={rankClass} src={rankImg} alt="" />
            <p className="spon-rank-rank">{index + 1}</p>
          </div>
          <p className="spon-rank-name">{user.nickName}</p>
          <p className="spon-rank-price">{user.donation}</p>
        </div>
      );
    }
  );

  return (
    <div id="spon-rank">
      <p className="spon-rank-title">후원랭킹</p>
      <div className="spon-rank">
        <div id="spon-rank-amount">
          <div className="spon-support-desc">
            <p>랭킹</p>
            <p>이름</p>
            <p>금액</p>
          </div>
          {RankMain}
        </div>
      </div>
    </div>
  );
}
export default SponRank;
