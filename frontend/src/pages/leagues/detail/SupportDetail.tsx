import React, { useState } from "react";
import "./SupportDetail.scss";
import SchoolIcon from "assets/images/SchoolIcon.svg";
import SchoolIcon2 from "assets/images/SchoolIcon2.svg";

interface SupportDetailProps {
  signal: () => void;
}

function SupportDetail({ signal }: SupportDetailProps) {
  const [selectTeam, setSelectTeam] = useState<null | number>(null);
  const [nowSelected, setNowSelected] = useState("후원할 팀을 선택해주세요");

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
                onClick={() => setSelectTeam(1)}
              >
                <img src={SchoolIcon} alt="" />
                <p className={`${selectTeam === 1 && "active-team"}`}>
                  전남대학교
                </p>
              </button>
              <button
                type="button"
                className="supportdetail-team-container"
                onClick={() => setSelectTeam(2)}
              >
                <img src={SchoolIcon2} alt="" />
                <p className={`${selectTeam === 2 && "active-team"}`}>
                  조선대학교
                </p>
              </button>
            </div>
          </div>
          <p>보유 금액</p>
          <p>1,000,000</p>
          <p>금액 입력</p>
          <input type="text" />
          <button type="button">후원</button>
          <button type="button" onClick={signal}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default SupportDetail;
