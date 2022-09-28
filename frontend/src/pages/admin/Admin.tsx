import "./Admin.scss";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import axios from "axios";
import CheckUniModal from "./CheckUniModal";

interface usersType {
  userPk: number;
  userId: string;
  userName: string;
  address: string | undefined;
  role: string;
  nickName: string;
  badge: string;
  fileUrl: string | undefined;
}

function Admin() {
  const [users, setUsers] = useState<usersType[]>();
  const [dummy, setDummy] = useState("");

  useEffect(() => {
    axios({
      url: "http://j7c208.p.ssafy.io:8080/api/admin",
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.token}` }
    })
      .then(res => {
        setUsers(res.data.userAdmins);
      })
      .catch(err => {
        console.log(err);
      });
  }, [dummy]);

  function updateRole(
    e: React.FormEvent<HTMLFormElement>,
    userRole: string,
    pk: number
  ) {
    let userRoleNum = -1;
    if (userRole === "일반") {
      userRoleNum = 0;
    } else if (userRole === "인증") {
      userRoleNum = 1;
    } else if (userRole === "정지") {
      userRoleNum = 2;
    }
    e.preventDefault();
    axios({
      url: `http://j7c208.p.ssafy.io:8080/api/admin`,
      method: "patch",
      headers: { Authorization: `Bearer ${localStorage.token}` },
      params: { role: userRoleNum, userPk: pk }
    })
      .then(res => {
        console.log(res.data.message);
        setDummy(res.data.message);
      })
      .catch(err => {
        console.log(userRole, userRoleNum, pk);
        console.log(err);
      });
  }

  const [modal, setModal] = useState(false);
  // const [userRoleNum, setUserRoleNum] = useState(-1);

  console.log(users);

  const mainList = users?.map(user => {
    let userRole: string;
    let updateUserRole = user.role;
    if (user.role === "ROLE_ADMIN") {
      userRole = "관리자";
    } else if (user.role === "ROLE_USER") {
      userRole = "일반";
    } else if (user.role === "ROLE_AUTH") {
      userRole = "인증";
    } else {
      userRole = "정지";
    }

    return (
      <div className="admin-main-list" key={v4()}>
        <p>
          {user.userName}
          {` (${userRole})`}
        </p>
        <div className="admin-main-list-desc">
          {user.fileUrl === null ? null : (
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
              updateRole(e, updateUserRole, user.userPk);
            }}
          >
            <select
              name="job"
              className="select-box"
              onChange={e => {
                updateUserRole = e.target.value;
                console.log(updateUserRole);
              }}
            >
              <option value="회원관리">회원관리</option>
              {/* <option value="관리자">관리자</option> */}
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
        <p className="admin-title">회원 관리</p>
        <div className="admin-main">{mainList}</div>
      </div>
      {modal && <CheckUniModal signal={() => setModal(!modal)} />}
    </div>
  );
}
export default Admin;
