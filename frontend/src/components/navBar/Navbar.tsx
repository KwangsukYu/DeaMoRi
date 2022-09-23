import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";
import NavLogo from "assets/images/DAMORI_navBar.svg";
import UserDummy from "assets/images/UserDummy.svg";
import Badge from "assets/images/RewardBadge.svg";

function NavBar() {
  const [dropDown, setdropDown] = useState(false);
  const [active, setActive] = useState("대회");

  return (
    <div id="navbar">
      <div className="navbar">
        <div className="navbar-content">
          <div className="navbar-content-logo">
            <img className="navbar-logo" src={NavLogo} alt="" />
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
            {/* <div className="navbar-content-tap-login">
              <Link to="login">로그인</Link>
            </div> */}
            <div className="navbar-content-tap-profile">
              <div>닉네임은팔글자임</div>
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
                  <Link onClick={() => setActive("")} to="mypage">
                    회원정보수정
                  </Link>
                  <Link onClick={() => setActive("")} to="login">
                    로그아웃
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
