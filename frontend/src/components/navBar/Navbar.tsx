import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.scss";
import NavLogo from "assets/images/DAMORI_navBar.svg";
import UserDummy from "assets/images/UserDummy.svg";
import Badge from "assets/images/RewardBadge.svg";
import { useSelector, useDispatch } from "react-redux";
import { infoType } from "Slices/userInfo";
import { delInfo } from "../../Slices/userInfo";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const storeUser = useSelector((state: infoType) => {
  //   return state;
  // });
  // let storeUser;
  const storeUser = useSelector((state: infoType) => state.userInfo.userInfo);

  const [dropDown, setdropDown] = useState(false);
  const [active, setActive] = useState("대회");
  console.log(storeUser);
  // localStorage.token
  // console.log(storeUser);

  function Logout(e: any) {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch(delInfo());
    alert("로그아웃 되었습니다");
    navigate("/");
  }

  return (
    <div id="navbar" onMouseLeave={() => setdropDown(false)}>
      <div className="navbar">
        <div className="navbar-content">
          <div className="navbar-content-logo">
            <Link to="/">
              <img className="navbar-logo" src={NavLogo} alt="" />
            </Link>
          </div>
          <div className="navbar-content-tap">
            <div className="navbar-content-tap-menu">
              <Link
                className={active === "대회" ? "active" : ""}
                to="leagues"
                onClick={() => setActive("대회")}
              >
                대회
              </Link>
              <Link
                className={active === "랭킹" ? "active" : ""}
                onClick={() => setActive("랭킹")}
                to="rankings"
              >
                랭킹
              </Link>
              <Link
                className={active === "대학" ? "active" : ""}
                onClick={() => setActive("대학")}
                to="university"
              >
                대학
              </Link>
            </div>
            {storeUser ? (
              <div className="navbar-content-tap-profile">
                <div>{storeUser.nickName}</div>
                <div className="badge-container">
                  <img src={Badge} alt="school-icon" />
                </div>
                <div className="profile-container">
                  <button
                    className="nav-button"
                    type="button"
                    onClick={() => setdropDown(!dropDown)}
                  >
                    <img src={UserDummy} alt="dummy" />
                  </button>
                </div>
                {dropDown && (
                  <div className="profile-dropdown">
                    <Link onClick={() => setActive("")} to="mypage">
                      마이페이지
                    </Link>
                    <Link onClick={() => setActive("")} to="edit">
                      회원정보수정
                    </Link>
                    <Link onClick={e => Logout(e)} to="/">
                      로그아웃
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="navbar-content-tap-login">
                <Link to="login" onClick={() => setActive("")}>
                  로그인
                </Link>
                <Link to="signup" onClick={() => setActive("")}>
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
