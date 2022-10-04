import React, { useState } from "react";
import "./Accounts.scss";
import logo from "assets/images/DAEMORI_logo.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInfo } from "../../Slices/userInfo";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const loginForm = { userId: id, password };

  function getMyInfo() {
    axios({
      url: "https://j7c208.p.ssafy.io:8080/api/users/me",
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.token}` }
    })
      .then(res => {
        console.log(res.data, "로그인 시 스토어 저장 데이터");
        dispatch(getInfo(res.data));
        navigate("/");
      })
      .catch(err => {
        console.error(err);
      });
  }

  function tryLogin(getLoginForm: { userId: string; password: string }) {
    // console.log(getLoginForm)
    axios({
      url: "https://j7c208.p.ssafy.io:8080/api/auth/login",
      method: "post",
      data: getLoginForm
    })
      .then(res => {
        const token = res.data.accessToken;
        localStorage.setItem("token", token);
        getMyInfo();
      })
      .catch(err => {
        if (err.response.status === 403) {
          alert("이용이 제한된 계정입니다.");
        } else {
          alert("아이디와 비밀번호를 확인해주세요");
        }
      });
  }
  function submitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    tryLogin(loginForm);
  }

  return (
    <div id="login">
      <div className="input-list">
        <img className="logo" src={logo} alt="logo" />
        <h1 className="login-title">로그인</h1>
        <form
          onSubmit={e => {
            submitLogin(e);
          }}
        >
          <input
            className="inputform"
            name="id"
            type="text"
            placeholder="아이디"
            onChange={e => {
              setId(e.target.value);
            }}
          />
          <input
            className="inputform"
            name="password"
            type="password"
            placeholder="비밀번호"
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <button className="submit-button" type="submit">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
