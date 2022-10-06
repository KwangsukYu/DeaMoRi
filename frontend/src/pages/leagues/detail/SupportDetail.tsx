import React, { useState, useRef, useEffect } from "react";
import "./SupportDetail.scss";
import WalletIcon from "assets/images/Wallet.svg";
import { leagueDetailType, teamType } from "apis/leagues/LeagueDetail";
import { addSupport, addSupportType } from "apis/web3/Transactions";
import { numberWithCommas } from "utils/numberComma";
import { fundWithERC20, getWalletBalance } from "apis/web3/web3";
import { useSelector } from "react-redux";
import { infoType } from "Slices/userInfo";
import PasswordInput from "components/passwordInput/PasswordInput";

interface SupportDetailProps {
  signal: () => void;
  leagueInfo: leagueDetailType;
}

function SupportDetail({ signal, leagueInfo }: SupportDetailProps) {
  const [selectTeam, setSelectTeam] = useState<number>(-1);
  const [inputModal, setInputModal] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const userInfo = useSelector((state: infoType) => state.userInfo.userInfo);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);

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
    const res = await fundWithERC20(
      userInfo.address,
      leagueInfo.leagueContractAddress,
      inputRef.current?.value,
      password
    );

    const data = {
      leaguePk: leagueInfo.leaguePk,
      sendUniversity: selectTeam,
      supportName: inputRef2.current?.value as string,
      transactionHash: res
    };

    await addSupport(data);

    await getUserBalance();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    if (inputRef2.current) {
      inputRef2.current.value = "";
    }
    setInputModal(false);
    signal();

    return res;
  };

  const chk = () => {
    if (selectTeam === -1) {
      return alert("후원 할 팀을 선택해주세요!");
    }

    if (!inputRef.current?.value.trim() || !inputRef2.current?.value.trim()) {
      return alert("값을 입력해주세요!");
    }

    return setInputModal(true);
  };

  return (
    <div className="support-wrapper">
      <div id="supportdetail">
        <div className="supportdetail">
          <p className="supportdetail-title">후원 하기</p>
          <div className="supportdetail-team">
            <div className="supportdetail-team-wrapper">
              <button
                type="button"
                className="supportdetail-team-container"
                style={{
                  backgroundColor:
                    selectTeam === 0 ? leagueInfo.team1.teamColor : ""
                }}
                onClick={() => {
                  setSelectTeam(0);
                }}
              >
                <img src={leagueInfo.team1.teamUniversitylogoUrl} alt="" />
                <p>{leagueInfo.team1.teamUniversityName}</p>
              </button>
              <button
                type="button"
                className="supportdetail-team-container"
                style={{
                  backgroundColor:
                    selectTeam === 1 ? leagueInfo.team2.teamColor : ""
                }}
                onClick={() => {
                  setSelectTeam(1);
                }}
              >
                <img src={leagueInfo.team2.teamUniversitylogoUrl} alt="" />
                <p>{leagueInfo.team2.teamUniversityName}</p>
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
          <div className="input-wrapper">
            <div className="supportdetail-input">
              <p className="supportdetail-input-label">후원자 명</p>
              <input
                className="supportdetail-supporter"
                type="text"
                placeholder="후원자 명"
                ref={inputRef2}
              />
            </div>
            <div className="supportdetail-input">
              <p className="supportdetail-input-label">금액 입력</p>
              <input
                className="supportdetail-amount"
                placeholder="금액을 입력해주세요"
                type="number"
                ref={inputRef}
              />
            </div>
          </div>
          <div className="button-container">
            <button className="blue" type="button" onClick={chk}>
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
