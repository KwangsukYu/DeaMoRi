import React, { useEffect, useState } from "react";
import Badge from "assets/images/RewardBadge.svg";
import "./Trophy.scss";
import { v4 } from "uuid";
import { useParams } from "react-router-dom";
import axios from "axios";

interface myUniType {
  donation: number;
  homepage: string;
  id: number;
  logoUrl: string;
  ranking: number;
  trophyList: [];
  universityAddress: string;
  universityName: string;
  userList: [];
}

function Trophy() {
  const badgeDummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [myUni, setMyUni] = useState<myUniType>({
    donation: 0,
    homepage: "",
    id: 0,
    logoUrl: "",
    ranking: 0,
    trophyList: [],
    universityAddress: "",
    universityName: "",
    userList: []
  });
  const uniId = useParams().id;

  useEffect(() => {
    axios({
      url: `https://j7c208.p.ssafy.io:8080/api/univers`,
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.token}` },
      params: { id: uniId }
    })
      .then(res => {
        setMyUni(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="trophy">
      <p className="trophy-title">트로피</p>
      <div className="trophy-box">
        <div className="trophy-box-container">
          {myUni.trophyList.map(img => (
            <img
              src={img}
              alt="badge"
              title="후원1등"
              key={v4()}
              className="trophy-item"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Trophy;
