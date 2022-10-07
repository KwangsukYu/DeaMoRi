import React, { useState } from "react";
import "./PasswordInput.scss";
import { CircularProgress } from "@mui/material";

interface PasswordInputProps {
  passwordConfirm: (password: string) => void;
  closeModal: () => void;
}

function PasswordInput({ passwordConfirm, closeModal }: PasswordInputProps) {
  const [pw, setPW] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="password-wrapper">
      <div id="password-input">
        <div className="password-input">
          <p className="password-input-label">지갑 비밀번호 입력</p>
          <input
            type="password"
            onChange={e => {
              setPW(e.target.value);
            }}
          />
        </div>
        {loading ? (
          <div className="button-container">
            <CircularProgress />
          </div>
        ) : (
          <div className="button-container">
            <button
              onClick={() => {
                passwordConfirm(pw);
                setLoading(true);
              }}
              className="blue"
              type="button"
            >
              확인
            </button>
            <button onClick={closeModal} type="button">
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PasswordInput;
