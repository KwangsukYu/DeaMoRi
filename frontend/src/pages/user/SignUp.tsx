import React from "react";
import "./Accounts.scss";
import logo from "assets/images/DAEMORI_logo.svg";
import CheckIcon from "@mui/icons-material/Check";

function SignUp() {
  return (
    <div id="login">
      <div className="input-list">
        <img className="logo" src={logo} alt="logo" />
        <h1 className="login-title">SignUp</h1>
        <form action="">
          <input
            className="inputform"
            name="name"
            type="text"
            placeholder="NAME"
          />
          <div className="nickname-form">
            <input
              className="inputform"
              name="nickname"
              type="text"
              placeholder="NICKNAME"
            />
            <a href="#!">
              <CheckIcon className="IDcheck" />
            </a>
          </div>
          <input className="inputform" name="id" type="text" placeholder="ID" />
          <input
            className="inputform"
            name="password"
            type="text"
            placeholder="PASSWORD"
          />
          <input
            className="inputform"
            name="check_password"
            type="text"
            placeholder="CHECK PASSWORD"
          />
          <button className="submit-button" type="button">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
