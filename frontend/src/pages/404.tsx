import React from "react";
import { Link } from "react-router-dom";
import Logo from "assets/images/DAEMORI_logo.svg";

import "./404.scss";

function PageNotFound() {
  return (
    <div className="page-not">
      <img src={Logo} alt="" />
      <p>페이지를 찾을 수 없습니다.</p>
      <Link to="/">메인페이지로</Link>
    </div>
  );
}

export default PageNotFound;
