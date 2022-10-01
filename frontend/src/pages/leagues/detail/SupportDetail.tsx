import React, { useState, useRef, useEffect } from "react";
import "./SupportDetail.scss";
import SchoolIcon from "assets/images/SchoolIcon.svg";
import SchoolIcon2 from "assets/images/SchoolIcon2.svg";
import WalletIcon from "assets/images/Wallet.svg";
import { numberWithCommas } from "utils/numberComma";
import { fundWithERC20, getWalletBalance } from "apis/web3/web3";
import { useSelector } from "react-redux";
import { infoType } from "Slices/userInfo";
import PasswordInput from "components/passwordInput/PasswordInput";

interface SupportDetailProps {
  signal: () => void;
}

function SupportDetail({ signal }: SupportDetailProps) {
  const [selectTeam, setSelectTeam] = useState<null | number>(null);
  const [nowSelected, setNowSelected] = useState("후원할 팀을 선택해주세요");
  const [inputModal, setInputModal] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const userInfo = useSelector((state: infoType) => state.userInfo.userInfo);
  const teamColor1 = "#007350";
  const teamColor2 = "#5b89e6";
  const inputRef = useRef<HTMLInputElement>(null);
  const tmpID = "0xec25cD677935183AA1741881F78d2836A44BeEEC";
  const tmpCA = "0x9cf11416164226F863B39CEa79F5F55585e579D5";

  const getUserBalance = async () => {
    const balance = await getWalletBalance(userInfo.address);
    setUserBalance(balance);
  };

  useEffect(() => {
    if (userInfo?.address) {
      getUserBalance();
    }
  }, []);

  const passwordConfirm = async (password: string) => {
    await fundWithERC20(
      userInfo.address,
      tmpCA,
      inputRef.current?.value,
      password
    );
    await getUserBalance();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setInputModal(false);
  };

  return (
    <div className="support-wrapper">
      <div id="supportdetail">
        <div className="supportdetail">
          <p className="supportdetail-title">후원 하기</p>
          <div className="supportdetail-team">
            <p className="supportdetail-team-label">{nowSelected}</p>
            <div className="supportdetail-team-wrapper">
              <button
                type="button"
                className="supportdetail-team-container"
                style={{
                  backgroundColor: selectTeam === 1 ? teamColor1 : "#1c1c1c"
                }}
                onClick={() => {
                  setSelectTeam(1);
                  setNowSelected("전남대학교");
                }}
              >
                <img src={SchoolIcon} alt="" />
                <p>전남대학교</p>
              </button>
              <button
                type="button"
                className="supportdetail-team-container"
                style={{
                  backgroundColor: selectTeam === 2 ? teamColor2 : "#1c1c1c"
                }}
                onClick={() => {
                  setSelectTeam(2);
                  setNowSelected("조선대학교");
                }}
              >
                <img src={SchoolIcon2} alt="" />
                <p>조선대학교</p>
              </button>
            </div>
          </div>
          <div className="supportdetail-amount">
            <div className="supportdetail-amount-wallet">
              <div className="supportdetail-amount-wallet-icon">
                <img src={WalletIcon} alt="" />
              </div>
              <div className="supportdetail-amount-wallet-detail">
                <p>
                  지갑 주소 <br />
                  <span>{userInfo?.address}</span>
                </p>
                <p>
                  보유 코인 <br /> <span>{numberWithCommas(userBalance)}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="supportdetail-input">
            <p className="supportdetail-input-label">금액 입력</p>
            <input type="text" ref={inputRef} />
          </div>
          <div className="button-container">
            <button
              className="blue"
              type="button"
              onClick={() => setInputModal(true)}
            >
              후원 하기
            </button>
            <button type="button" onClick={signal}>
              닫기
            </button>
          </div>
          {inputModal && (
            <PasswordInput
              closeModal={() => {
                setInputModal(false);
              }}
              passwordConfirm={passwordConfirm}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SupportDetail;
