import React, { useState } from "react";
import "./ResultModal.scss";
import { closeLeague } from "apis/web3/web3";
import { numberWithCommas } from "utils/numberComma";
import { leagueDetailType, changeToEnd } from "apis/leagues/LeagueDetail";
import TrophyGenerator from "./TrophyGenerator";

interface LeagueDetailProps {
  signal: (type: string) => void;
  leagueInfo: leagueDetailType;
  change: () => void;
}

function ResultModal({ signal, leagueInfo, change }: LeagueDetailProps) {
  const [selectTeam, setSelectTeam] = useState("-1");
  const [TrophyImg, setTrophyImg] = useState("");

  const isGenerated = (tx: string) => {
    setTrophyImg(tx);
  };

  const leagueEnd = async () => {
    if (selectTeam === "-1") {
      return alert("후원 할 팀을 선택해주세요!");
    }

    if (TrophyImg === "") {
      return alert("트로피를 만들어주세요!");
    }

    const txHash = await closeLeague(
      leagueInfo.leagueContractAddress,
      parseInt(selectTeam, 10),
      leagueInfo.allDonation
    );

    console.log(txHash);

    await changeToEnd(leagueInfo.leaguePk, txHash, TrophyImg, selectTeam);
    // change();
    // return signal("result");
    return 0;
  };

  return (
    <div className="result-wrapper">
      <div id="resultmodal">
        <div className="resultmodal">
          <p className="resultmodal-title">결과 정산</p>
          <p>우승팀은 변경이 불가합니다. 신중하게 선택해주세요!</p>
          <div className="resultmodal-team">
            <div className="resultmodal-team-wrapper">
              <button
                type="button"
                className="resultmodal-team-container"
                style={{
                  backgroundColor:
                    selectTeam === "0" ? leagueInfo.team1.teamColor : ""
                }}
                onClick={() => {
                  setSelectTeam("0");
                }}
              >
                <img src={leagueInfo.team1.teamUniversitylogoUrl} alt="" />
                <p>{leagueInfo.team1.teamUniversityName}</p>
              </button>
              <button
                type="button"
                className="resultmodal-team-container"
                style={{
                  backgroundColor:
                    selectTeam === "1" ? leagueInfo.team2.teamColor : ""
                }}
                onClick={() => {
                  setSelectTeam("1");
                }}
              >
                <img src={leagueInfo.team2.teamUniversitylogoUrl} alt="" />
                <p>{leagueInfo.team2.teamUniversityName}</p>
              </button>
            </div>
          </div>
          <div className="resultmodal-amount">
            <p className="resultmodal-amount-label">모인 후원금</p>
            <p className="resultmodal-amount-amount">
              {numberWithCommas(leagueInfo.allDonation)} WON
            </p>
          </div>
          <div className="resultmodal-trophy">
            {selectTeam !== "-1" && (
              <TrophyGenerator
                isGenerated={isGenerated}
                leagueInfo={leagueInfo}
                teamInfo={
                  selectTeam === "0" ? leagueInfo.team1 : leagueInfo.team2
                }
              />
            )}
          </div>
          <div className="resultmodal-button">
            <button type="button" onClick={leagueEnd}>
              정산
            </button>
            <button type="button" onClick={() => signal("result")}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultModal;
