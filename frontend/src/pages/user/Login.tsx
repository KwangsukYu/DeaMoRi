import React from 'react'
import style from './Accounts.module.css'
import logo from 'assets/images/DAEMORI_logo.svg'
const Login = () => {
  return (
    <>
      <div className={`${style.box}`}>
        <div className={`${style.input_list}`}>
          <img className={`${style.logo}`} src={logo} alt="logo" />
          <h1 style={{ fontSize: '70px', marginTop: 0, color: 'white' }}>Login</h1>
          <form action="">
            <input className={`${style.inputform}`} name='id' type="text" placeholder='ID' />
            <input className={`${style.inputform}`} name='password' type="text" placeholder='PASSWORD' />
            <button className={`${style.submit_button}`}>SUBMIT</button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
