import React, { useState } from "react";
import "./Accounts.scss";
import logo from "assets/images/DAEMORI_logo.svg";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector } from "react-redux";
import { infoType } from "Slices/userInfo";
// import store from "store";
import axios from "axios";

function Edit() {
  const storeUser = useSelector((state: infoType) => state.userInfo.userInfo);
  const [password, setPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [nickNameCheck, setnickNameCheck] = useState(false);

  // const [idCheck, setIdCheck] = useState(false);

  function inputForm(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "nickname") {
      setNickname(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "check_password") {
      setPwConfirm(e.target.value);
    }
  }

  function CheckNickName(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    if (nickname === "") {
      alert("닉네임을 입력해주세요");
    } else {
      e.preventDefault();
      axios({
        url: "https://j7c208.p.ssafy.io:8080/api/users/check/nickname",
        method: "get",
        params: { nickName: nickname }
      })
        .then(res => {
          console.log(res);
          // setnickNameCheck(id)
          setnickNameCheck(true);
        })
        .catch(err => {
          console.log(err);
          setnickNameCheck(false);
          console.log(nickname);
          alert("이미 사용중인 닉네임 입니다.");
        });
    }
  }

  const signUpForm = {
    password,
    nickName: nickname,
    userName: username
    // userId: storeUser.userId
  };

  console.log(signUpForm);
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
            placeholder={storeUser.userName}
            disabled
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
            {nickNameCheck ? (
              <CheckIcon
                className="IDcheck-true"
                onClick={e => {
                  CheckNickName(e);
                }}
              />
            ) : (
              <CheckIcon
                className="IDcheck-false"
                onClick={e => {
                  CheckNickName(e);
                }}
              />
            )}
          </div>
          <input
            className="inputform"
            name="id"
            type="text"
            placeholder={storeUser.userId}
            disabled
          />
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
          <button className="submit-button" type="button">
            수정하기
          </button>
        </form>
      </div>
    </div>
  );
}
export default Edit;
