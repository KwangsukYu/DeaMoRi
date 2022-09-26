import React, { useState } from "react";
import axios from "axios";
import "./Accounts.scss";
import logo from "assets/images/DAEMORI_logo.svg";
import CheckIcon from "@mui/icons-material/Check";

function SignUp() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  // const [idCheck, setIdCheck] = useState(false);

  const signUpForm = {
    password,
    nickName: nickname,
    userName: username,
    userId
  };

  function axiosSignup(credentials: {
    password: string;
    nickName: string;
    userName: string;
    userId: string;
  }) {
    axios({
      url: "http://j7c208.p.ssafy.io:8080/api/users",
      method: "post",
      data: credentials
    })
      .then(res => {
        alert("회원가입 되었습니다. 로그인을 해주세요!");
        document.location.href = "/login";
      })
      .catch(err => {
        console.log(credentials);
        console.log(err);
      });
  }

  function submitSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);
    if (password !== pwConfirm) {
      alert("비밀번호가 서로 맞지 않습니다.");
      // e.target.password.value = "";
      // e.target.pwconfirm.value = "";
      setPassword("");
      setPwConfirm("");
    } else {
      axiosSignup(signUpForm);
    }
  }

  function inputForm(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "id") {
      setUserId(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "check_password") {
      setPwConfirm(e.target.value);
    } else if (e.target.name === "nickname") {
      setNickname(e.target.value);
    } else if (e.target.name === "username") {
      setUsername(e.target.value);
    }
  }

  return (
    <div id="login">
      <div className="input-list">
        <img className="logo" src={logo} alt="logo" />
        <h1 className="login-title">회원가입</h1>
        <form
          onSubmit={e => {
            submitSignup(e);
          }}
        >
          <input
            className="inputform"
            name="username"
            type="text"
            placeholder="이름"
            onChange={e => {
              inputForm(e);
            }}
          />
          <div className="nickname-form">
            <input
              className="inputform"
              name="nickname"
              type="text"
              placeholder="닉네임"
              onChange={e => {
                inputForm(e);
              }}
            />
            <a href="#!">
              <CheckIcon className="IDcheck" />
            </a>
          </div>
          <div className="nickname-form">
            <input
              className="inputform"
              name="id"
              type="text"
              placeholder="아이디"
              onChange={e => {
                inputForm(e);
              }}
            />
            <a href="#!">
              <CheckIcon className="IDcheck" />
            </a>
          </div>
          <input
            className="inputform"
            name="password"
            type="password"
            placeholder="비밀번호"
            onChange={e => {
              inputForm(e);
            }}
          />
          <input
            className="inputform"
            name="check_password"
            type="password"
            placeholder="비밀번호 확인"
            onChange={e => {
              inputForm(e);
            }}
          />
          <button className="submit-button" type="submit">
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
