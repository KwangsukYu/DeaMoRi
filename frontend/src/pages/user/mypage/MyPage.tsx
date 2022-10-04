import React, { useState, useEffect, useRef } from "react";
import "./MyPage.scss";
import UserDummy from "assets/images/userDummy2.png";
import WalletIcon from "assets/images/Wallet.svg";
import { v4 } from "uuid";
import { setProfile } from "apis/myPage/myPage";
import { numberWithCommas } from "utils/numberComma";
import { getWalletBalance } from "apis/web3/web3";
import { useSelector } from "react-redux";
import { infoType } from "Slices/userInfo";
import SupportTxList from "pages/leagues/detail/SupportTxList";
import CoinCharge from "./CoinCharge";
import CreateWallet from "./CreateWallet";
import UniAuth from "./UniAuth";

function MyPage() {
  const userInfo = useSelector((state: infoType) => state.userInfo.userInfo);
  const [schoolChk, setSchoolChk] = useState(
    !!userInfo.universityName || false
  );
  const [modal, setModal] = useState(false);
  const [changed, setCahnged] = useState(false);
  const [haveWallet, setHaveWallet] = useState(!!userInfo.address || false);
  const [userBalance, setUserBalance] = useState<string | number>("???");
  const [authModal, setAuthModal] = useState(false);
  const [tap, setTap] = useState(1);
  const imgRef = useRef<HTMLInputElement>(null);

  const getUserBalance = async () => {
    const balance = await getWalletBalance(userInfo.address);
    setUserBalance(balance);
  };

  useEffect(() => {
    if (userInfo.address) {
      getUserBalance();
    }
  }, [userInfo.address]);

  const signal = () => {
    setHaveWallet(true);
  };

  const change = () => {
    setCahnged(!changed);
  };

  const fileUpload = () => {
    if (imgRef.current) {
      imgRef.current.click();
    }
  };

  const changeProfile = () => {
    if (imgRef.current?.files) {
      const file = imgRef.current.files[0];
      if (file) {
        setProfile(file);
      }
    }
  };

  return (
    <div id="mypage">
      <div className="mypage">
        <div className="mypage-profile">
          <input
            type="file"
            className="img-input"
            ref={imgRef}
            onChange={changeProfile}
          />
          <button
            type="button"
            className="mypage-profile-img"
            onClick={fileUpload}
          >
            <img src={UserDummy} alt="" />
          </button>
          <div className="mypage-profile-detail">
            <div className="mypage-username">{userInfo.nickName}</div>
            {schoolChk ? (
              <div className="mypage-school">
                <div className="mypage-school-icon">
                  <img src={userInfo.universityLogo} alt="" />
                </div>
                <div className="mypage-school-name">
                  {userInfo.universityName}
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="mypage-school-chk"
                onClick={() => setAuthModal(true)}
              >
                대학 인증
              </button>
            )}
          </div>
          {authModal && (
            <UniAuth change={change} closeModal={() => setAuthModal(false)} />
          )}
        </div>
        <div className="mypage-wallet">
          <div className="mypage-wallet-icon">
            <img src={WalletIcon} alt="" />
          </div>
          {haveWallet ? (
            <div className="mypage-wallet-detail">
              <p>
                지갑 주소 <br />
                <span>{userInfo.address}</span>
              </p>
              <p>
                보유 코인 <br /> <span>{numberWithCommas(userBalance)}</span>
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
            <CreateWallet signal={signal} />
          )}
        </div>
        <div className="mypage-badge">
          <p>보유 뱃지</p>
          <div className="mypage-badge-container">
            {userInfo.badgeList
              ? userInfo.badgeList.map((item: string) => (
                  <img
                    src={item}
                    alt="badge"
                    title="후원1등"
                    key={v4()}
                    className="badge-item"
                  />
                ))
              : null}
          </div>
        </div>
        <div className="mypage-support">
          <div className="mypage-support-tap">
            <button
              type="button"
              className={tap === 1 ? "active" : ""}
              onClick={() => setTap(1)}
            >
              출금 내역
            </button>
            <button
              type="button"
              className={tap === 0 ? "active" : ""}
              onClick={() => setTap(0)}
            >
              입금 내역
            </button>
          </div>
          <div className="mypage-support-desc">
            <p>일시</p>
            <p>후원 내용</p>
            <p>금액</p>
          </div>
        </div>
        {tap === 0 ? (
          <SupportTxList state={tap} />
        ) : (
          <SupportTxList state={tap} />
        )}
      </div>
      {modal && (
        <CoinCharge
          userAddress={userInfo.address}
          signal={() => {
            setModal(!modal);
            getUserBalance();
          }}
        />
      )}
    </div>
  );
}
export default MyPage;
