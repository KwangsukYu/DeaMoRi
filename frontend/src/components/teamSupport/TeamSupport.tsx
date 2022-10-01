import React, { useState } from "react";
import "./TeamSupport.scss";
import { teamType } from "apis/leagues/LeagueDetail";
import { useSelector } from "react-redux";
import { infoType } from "Slices/userInfo";
import { cheerWithERC20 } from "apis/web3/web3";
import { addCheer, addCheerType } from "apis/web3/Transactions";
import PasswordInput from "components/passwordInput/PasswordInput";

interface TeamSupport {
  signal: () => void;
  teamInfo: teamType;
  teamNumber: number;
  leaguePk: number;
}

function TeamSupport({ signal, teamInfo, teamNumber, leaguePk }: TeamSupport) {
  const [supporter, setSupporter] = useState("");
  const [amount, setAmount] = useState(500);
  const [supMsg, setSupMsg] = useState("");
  const [inputModal, setInputModal] = useState(false);
  const userInfo = useSelector((state: infoType) => state.userInfo.userInfo);

  const changeAmount = (add: boolean) => {
    if (add) {
      if (amount <= 4500) {
        setAmount(amount + 500);
      }
      return;
    }
    if (amount >= 1000) {
      setAmount(amount - 500);
    }
  };

  const passwordConfirm = async (password: string) => {
    const txHash = await cheerWithERC20(
      userInfo.address,
      teamInfo.teamWalletAddress,
      amount,
      password
    );

    const data = {
      content: supMsg,
      leaguePk,
      sendTeam: teamNumber,
      supportName: supporter,
      transactionHash: txHash
    };
    await addCheer(data);

    signal();
  };

  const chk = () => {
    setInputModal(true);
  };

  return (
    <div className="teamsupport-wrapper">
      <div id="teamsupport">
        <div className="teamsupport">
          <p className="teamsupport-title">
            <span style={{ color: teamInfo.teamColor }}>
              {teamInfo.teamUniversityName}
            </span>
            <br />
            응원하기
          </p>
          <div className="teamsupport-desc">
            <p>팀에게 따뜻한 응원의 마음을!</p>
            <p>응원 금액은 블록체인을 통해 직접 팀에게 전달됩니다.</p>
          </div>
          <div className="teamsupport-input">
            <p>응원자 이름</p>
            <input
              className="teamsupport-input-name"
              type="text"
              onChange={e => setSupporter(e.target.value)}
            />
          </div>

          <div className="teamsupport-amount">
            <p>코인으로 응원하기</p>
            <div className="teamsupport-amount-button">
              <button
                className="teamsupport-amount-button-minus"
                type="button"
                onClick={() => changeAmount(false)}
              >
                -
              </button>
              <div className="teamsupport-amount-button-amount">
                <p>{amount}</p>
              </div>
              <button
                className="teamsupport-amount-button-add"
                type="button"
                onClick={() => changeAmount(true)}
              >
                +
              </button>
            </div>
          </div>
          <div className="teamsupport-input">
            <p>응원의 한마디</p>
            <input
              className="teamsupport-input-msg"
              type="text"
              onChange={e => setSupMsg(e.target.value)}
            />
          </div>
          <div className="teamsupport-button">
            <button type="button" onClick={chk}>
              응원
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

export default TeamSupport;
