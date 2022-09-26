import "./Admin.scss";
import React, { useState } from "react";
import { v4 } from "uuid";
import CheckUniModal from "./CheckUniModal";

function Admin() {
  const [modal, setModal] = useState(false);

  const authUser = [
    { name: "홍석호", role: "관리자", file: null },
    { name: "김성민", role: "일반", file: null },
    { name: "이민재", role: "정지", file: "O" },
    { name: "유광석", role: "인증", file: "O" },
    { name: "이성조", role: "인증", file: "O" }
  ];

  const mainList = authUser.map(user => {
    let userRole = user.role;
    return (
      <div className="admin-main-list" key={v4()}>
        <p>
          {user.name}
          {` (${user.role})`}
        </p>
        <div className="admin-main-list-desc">
          {user.file === null ? null : (
            <button
              className="check-file"
              type="button"
              onClick={() => {
                setModal(true);
              }}
            >
              파일확인
            </button>
          )}
          <form
            onSubmit={e => {
              e.preventDefault();
              console.log(e);
            }}
          >
            <select
              name="job"
              className="select-box"
              onChange={e => {
                userRole = e.target.value;
                console.log(userRole);
              }}
            >
              <option value="회원관리">회원관리</option>
              <option value="관리자">관리자</option>
              <option value="일반">일반</option>
              <option value="인증">인증</option>
              <option value="정지">정지</option>
            </select>
            <button className="submit-button" type="submit">
              저장
            </button>
          </form>
        </div>
      </div>
    );
  });

  return (
    <div id="admin">
      <div className="admin">
        <div className="admin-main">{mainList}</div>
      </div>
      {modal && <CheckUniModal signal={() => setModal(!modal)} />}
    </div>
  );
}
export default Admin;
