import React, { useState } from "react";
import "./Donation.scss";
import { useSelector, useDispatch } from "react-redux";
import { infoType } from "Slices/userInfo";

export default function Donation() {
  const [title, setTitle] = useState("id");
  const [coin, setCoin] = useState("후원금액");
  const { nickName } = useSelector(state => state.userInfo.userInfo);
  const [discription, setDiscription] =
    useState("이것은 상세내용입니다 확인해주세요");

  return (
    <div className="donation">
      <h3 className="donation-title">
        {nickName} 님이 {coin} MOK을 후원했습니다.
      </h3>
      <h5 className="donation-text">{discription}</h5>
    </div>
  );
}
