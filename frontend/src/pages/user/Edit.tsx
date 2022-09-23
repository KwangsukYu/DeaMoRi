import React from "react";
import "./Accounts.scss";
import logo from "assets/images/DAEMORI_logo.svg";
import CheckIcon from "@mui/icons-material/Check";

function Edit() {
  return (
    <div id="login">
      <div className="input-list">
        <img className="logo" src={logo} alt="logo" />
        <h1 className="login-title">회원정보 수정</h1>
        <form action="">
          <input
            className="inputform"
            name="name"
            type="text"
            placeholder="이름"
            disabled
          />
          <div className="nickname-form">
            <input
              className="inputform"
              name="nickname"
              type="text"
              placeholder="닉네임"
            />
            <a href="#!">
              <CheckIcon className="IDcheck" />
            </a>
          </div>
          <input
            className="inputform"
            name="id"
            type="text"
            placeholder="아이디"
            disabled
          />
          <input
            className="inputform"
            name="password"
            type="text"
            placeholder="비밀번호"
          />
          <input
            className="inputform"
            name="check_password"
            type="text"
            placeholder="비밀번호 확인"
          />
          <button className="submit-button" type="button">
            수정하기
          </button>
        </form>
      </div>
    </div>
  );
}
export default Edit;
