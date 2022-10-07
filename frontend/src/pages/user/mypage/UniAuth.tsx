import React, { useState, useRef } from "react";
import "./UniAuth.scss";
import { sendUniAuth } from "apis/myPage/myPage";
import { useDispatch } from "react-redux";
import { getInfo } from "Slices/userInfo";
import { getMyInfo } from "apis/login/Login";
import { CircularProgress } from "@mui/material";

interface UniAuthProps {
  closeModal: () => void;
  change: () => void;
}

function UniAuth({ closeModal, change }: UniAuthProps) {
  const dispatch = useDispatch();
  const imgRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLInputElement>(null);
  const [uniName, setUniName] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const [loading, setLoading] = useState(false);

  const fileUpload = () => {
    if (imgRef.current) {
      imgRef.current.click();
    }
  };

  const sendAuth = async () => {
    if (uniName.trim() && !uniName.includes("대학교") && uniName !== "대학교") {
      return alert("올바른 대학명을 입력해주세요");
    }
    if (imgRef.current?.files) {
      const file = imgRef.current.files[0];
      if (file) {
        setLoading(true);
        await sendUniAuth(file, uniName);
        const userInfo = await getMyInfo();
        dispatch(getInfo(userInfo));
        setLoading(false);
        change();
        alert("인증이 전송되었습니다.");
        window.location.href = "/mypage";
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
          <p className="uniauthmodal-uni-label">
            학교명을 입력해주세요. (OO대학교)
          </p>
          <input
            className="uniauthmodal-uni"
            type="text"
            placeholder="OO대학교"
            ref={textRef}
            onChange={e => setUniName(e.target.value)}
          />
          <p className="uniauthmodal-file-label">
            학생이나 졸업생을 증명할 수 있는 자료를 첨부해주세요. <br />
            (예시 : 학생증, 졸업증명서, 재학증명서)
          </p>
          {isUpload && (
            <p style={{ color: "#5c6bc0" }}>
              파일이 성공적으로 추가되었습니다.
            </p>
          )}
          <button
            onClick={fileUpload}
            className="uniauthmodal-file-button"
            type="button"
          >
            파일 추가
          </button>
          <input
            className="uniauthmodal-file"
            type="file"
            ref={imgRef}
            onChange={() => setIsUpload(!isUpload)}
          />
          {loading ? (
            <div className="button-container">
              <CircularProgress />
            </div>
          ) : (
            <div className="button-container">
              <button
                className="confirm-button"
                type="button"
                onClick={sendAuth}
              >
                인증
              </button>
              <button
                className="close-button"
                type="button"
                onClick={closeModal}
              >
                닫기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UniAuth;
