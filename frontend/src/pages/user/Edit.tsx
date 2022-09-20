import React from "react";
import "./Accounts.scss";
import logo from "assets/images/DAEMORI_logo.svg";
import CheckIcon from "@mui/icons-material/Check";

const Edit = () => {
  return (
    <>
      <div id="login">
        <div className="input-list">
          <img className="logo" src={logo} alt="logo" />
          <h1 className="login-title">Edit</h1>
          <form action="">
            <input
              className="inputform"
              name="name"
              type="text"
              placeholder="NAME"
              disabled
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
            <input
              className="inputform"
              name="id"
              type="text"
              placeholder="ID"
              disabled
            />
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
            <button className="submit-button">SUBMIT</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Edit;
