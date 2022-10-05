// import React from "react";
import axios from "axios";
import { deployCloneLeagueContract } from "apis/web3/SmartContract";

// type createLeague = {
//   leagueId: string;
//   sponStartDatetime: string;
//   leagueStartDatetime: string;
//   leagueEndDatetime: string;
//   location: string;
//   contractAddress: string;

//   team1Id: string;
//   team1University: string;
//   team1Wallet: string;
//   team1Color: string;

//   team2Id: string;
//   team2University: string;
//   team2Wallet: string;
//   team2Color: string;
//   // broadcast: number;
// };

type createLeague = {
  leagueTitle: string;
  prizeMoney: number;
  leagueStart: string;
  leagueEnd: string;
  place: string;
  // poster: File;
  broadcast: string;
  team1University: string;
  team1Name: string;
  team1Wallet: string;
  team2University: string;
  team2Name: string;
  team2Wallet: string;
  team1Color: string;
  team2Color: string;
  ownerPk: string;
};

async function CreateLeague(files: any, data: createLeague) {
  const CA = await deployCloneLeagueContract(
    data.team1Wallet,
    data.team2Wallet
  );
  console.log(CA);
  const newData = { ...data, contractAddress: CA };

  const formData = new FormData();
  formData.append("file", files[0]);
  // formData.append(
  //   "registerInfo ",
  //   new Blob([JSON.stringify(data)], { type: "application/json" })
  // );
  const blob = new Blob([JSON.stringify(newData)], {
    type: "application/json"
  });
  formData.append("registerInfo", blob);

  const Re = await axios({
    url: "https://j7c208.p.ssafy.io:8080/api/league",
    method: "post",
    data: formData,
    headers: {
      Authorization: `Bearer ${localStorage.token}`
      // "Content-Type": "multipart/form-data"
    }
  })
    .then(response => {
      console.log(response.data.message);
      // alert("대회 등록이 완료되었습니다.");
      return response.data.message;
      // useNavigate(`/${}`)
    })
    .catch(err => {
      console.log(err);
    });
  return Re;
}

export default CreateLeague;
