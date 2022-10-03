import React, { useState, useRef } from "react";
import "./UniAuth.scss";
import { sendUniAuth } from "apis/myPage/myPage";
import { useDispatch } from "react-redux";
import { getInfo } from "Slices/userInfo";
import { getMyInfo } from "apis/login/Login";

interface UniAuthProps {
  closeModal: () => void;
  change: () => void;
}

function UniAuth({ closeModal, change }: UniAuthProps) {
  const dispatch = useDispatch();
  const imgRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLInputElement>(null);
  const [uniName, setUniName] = useState("");

  const fileUpload = () => {
    if (imgRef.current) {
      imgRef.current.click();
    }
  };

  const sendAuth = async () => {
    if (imgRef.current?.files) {
      const file = imgRef.current.files[0];
      if (file) {
        sendUniAuth(file, uniName);
        alert("인증이 전송되었습니다.");
        closeModal();
      } else {
        alert("파일을 업로드해주세요!");
      }
    }
    return 0;
  };

  return (
    <div className="uniauth-wrapper">
      <div id="uniauthmodal">
        <div className="uniauthmodal">
          <p className="uniauthmodal-title">대학 인증</p>
          <p className="uniauthmodal-uni-label">학교명을 입력해주세요.</p>
          <input
            className="uniauthmodal-uni"
            type="text"
            ref={textRef}
            onChange={e => setUniName(e.target.value)}
          />
          <p className="uniauthmodal-file-label">
            학생이나 졸업생을 증명할 수 있는 자료를 첨부해주세요. <br />
            (예시 : 학생증, 졸업증명서, 재학증명서)
          </p>
          <button
            onClick={fileUpload}
            className="uniauthmodal-file-button"
            type="button"
          >
            파일 추가
          </button>
          <input className="uniauthmodal-file" type="file" ref={imgRef} />
          <div className="button-container">
            <button className="confirm-button" type="button" onClick={sendAuth}>
              인증
            </button>
            <button className="close-button" type="button" onClick={closeModal}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UniAuth;
