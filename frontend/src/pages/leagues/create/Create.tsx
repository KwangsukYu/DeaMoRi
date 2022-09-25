import React from "react";
import "./Create.scss";
import ColorPicker from "components/colorPicker/ColorPicker";

function Create() {
  return (
    <div id="create">
      <div className="create">
        {/* 공통 옵션 선택 */}
        <div className="create-option">
          <h1>대회생성</h1>
          <input
            className="create-option-input"
            type="text"
            placeholder="대회명"
          />
          <div className="create-option-text">후원 시작일</div>
          <input className="create-option-input" type="date" />
          <div className="create-option-comment">
            후원 종료일은 대회 종료일과 동일하게 적용됩니다.
          </div>
          <div className="create-option-text">대회 일정</div>
          <span>
            <input className="create-option-input" type="date" /> -{" "}
            <input className="create-option-input" type="date" />
          </span>
          <input
            className="create-option-input"
            type="text"
            placeholder="장소"
          />

          <div className="create-option-text">포스터 등록</div>
          <input
            className="create-option-poster"
            type="file"
            placeholder="포스터"
          />

          <fieldset className="create-option-broadcast">
            <legend>중계여부</legend>
            <span>
              <label htmlFor="yes">
                Yes
                <input type="radio" id="yes" name="yes" value="yes" />
              </label>
              <label htmlFor="no">
                No
                <input type="radio" id="no" name="no" value="no" />
              </label>
            </span>
          </fieldset>
        </div>

        {/* 팀별 옵션 선택 */}
        <span className="create-container">
          {/* 1팀 */}
          <div className="create-container-teamoption1">
            <h2>1팀</h2>
            <input type="text" placeholder="학교명" />
            <input type="text" placeholder="팀명" />
            <input type="text" placeholder="팀장 지갑주소" />
            <div className="create-container-teamoption1-text">
              팀장 계정으로 각 팀의 후원이 제공됩니다.
            </div>
            <h4>1팀 대표 색상 선택</h4>

            <ColorPicker />
          </div>

          {/* 2팀 */}
          <div className="create-container-teamoption2">
            <h2>2팀</h2>
            <input type="text" placeholder="학교명" />
            <input type="text" placeholder="팀명" />
            <input type="text" placeholder="팀장 지갑주소" />
            <div className="create-container-teamoption2-text">
              팀장 계정으로 각 팀의 후원이 제공됩니다.
            </div>
            <h4>1팀 대표 색상 선택</h4>
            <ColorPicker />
          </div>
        </span>

        <div className="create-buttoncontainer">
          <button className="create-buttoncontainer-cancel" type="button">
            취소
          </button>
          <button className="create-buttoncontainer-approve" type="button">
            대회 생성
          </button>
        </div>
      </div>
    </div>
  );
}

export default Create;
