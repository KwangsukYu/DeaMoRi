import React from "react";
import "./Accounts.scss";
import logo from "assets/images/DAEMORI_logo.svg";
const Login = () => {
  return (
    <>
      <div id="login">
        <div className="input-list">
          <img className="logo" src={logo} alt="logo" />
          <h1 className="login-title">Login</h1>
          <form action="">
            <input
              className="inputform"
              name="id"
              type="text"
              placeholder="ID"
            />
            <input
              className="inputform"
              name="password"
              type="text"
              placeholder="PASSWORD"
            />
            <button className="submit-button">SUBMIT</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
