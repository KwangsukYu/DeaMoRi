import React from "react";
import "./Accounts.scss";
import logo from "assets/images/DAEMORI_logo.svg";

function Login() {
  return (
    <div id="login">
      <div className="input-list">
        <img className="logo" src={logo} alt="logo" />
        <h1 className="login-title">로그인</h1>
        <form action="">
          <input
            className="inputform"
            name="id"
            type="text"
            placeholder="아이디"
          />
          <input
            className="inputform"
            name="password"
            type="text"
            placeholder="비밀번호"
          />
          <button className="submit-button" type="button">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
