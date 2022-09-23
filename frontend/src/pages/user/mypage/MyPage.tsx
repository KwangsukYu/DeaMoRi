import React, { useState } from "react";
import "./MyPage.scss";
import UserDummy from "assets/images/UserDummy.svg";
import SchoolIcon from "assets/images/SchoolIcon.svg";
import WalletIcon from "assets/images/Wallet.svg";
import Badge from "assets/images/RewardBadge.svg";
import { v4 } from "uuid";
import { getWalletBalance } from "apis/web3/web3";
import SupportAmount from "./SupportAmount";
import CoinCharge from "./CoinCharge";
import CreateWallet from "./CreateWallet";

function MyPage() {
  const [schoolChk, setSchoolChk] = useState(true);
  const [modal, setModal] = useState(false);
  const [haveWallet, setHaveWallet] = useState(true);
  const [userBalance, setUserBalance] = useState<string | number>("???");
  const badgeDummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const supportDummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const getUserBalance = async () => {
    const balance = await getWalletBalance();
    setUserBalance(balance);
  };

  return (
    <div id="mypage">
      <div className="mypage">
        <div className="mypage-profile">
          <div className="mypage-profile-img">
            <img src={UserDummy} alt="" />
          </div>
          <div className="mypage-profile-detail">
            <div className="mypage-username">닉네임은팔글자임</div>
            {schoolChk ? (
              <div className="mypage-school">
                <div className="mypage-school-icon">
                  <img src={SchoolIcon} alt="" />
                </div>
                <div className="mypage-school-name">전남대학교</div>
              </div>
            ) : (
              <button type="button" className="mypage-school-chk">
                대학 인증
              </button>
            )}
          </div>
        </div>
        <div className="mypage-wallet">
          <div className="mypage-wallet-icon">
            <img src={WalletIcon} alt="" />
          </div>
          {haveWallet ? (
            <div className="mypage-wallet-detail">
              <p>
                보유 코인 : <span>{userBalance}</span>
              </p>
              <div className="mypage-wallet-detail-btn">
                <button type="button" onClick={getUserBalance}>
                  코인 조회
                </button>
                <button type="button" onClick={() => setModal(true)}>
                  코인 충전
                </button>
              </div>
            </div>
          ) : (
            <CreateWallet />
          )}
        </div>
        <div className="mypage-badge">
          <p>보유 뱃지</p>
          <div className="mypage-badge-container">
            {badgeDummy.map(() => (
              <img
                src={Badge}
                alt="badge"
                title="후원1등"
                key={v4()}
                className="badge-item"
              />
            ))}
          </div>
        </div>
        <div className="mypage-support">
          <p>후원 기록</p>
          <div className="mypage-support-desc">
            <p>일시</p>
            <p>후원 내용</p>
            <p>금액</p>
          </div>
        </div>
        {supportDummy.map(() => {
          return <SupportAmount key={v4()} />;
        })}
      </div>
      {modal && <CoinCharge signal={() => setModal(!modal)} />}
    </div>
  );
}
export default MyPage;
