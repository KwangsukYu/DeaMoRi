// import React from "react";
import axios from "axios";

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
  contractAddress: string;
  team1University: string;
  team1Name: string;
  team1Wallet: string;
  team2University: string;
  team2Name: string;
  team2Wallet: string;
  team1Color: string;
  team2Color: string;
};

function CreateLeague(files: any, data: createLeague) {
  // // function CreateLeague(data) {
  // // data.poster = data.poster[0];
  // console.log(data.poster);
  // console.log("잘 되나?");
  const formData = new FormData();
  formData.append("file", files[0]);
  // formData.append(
  //   "registerInfo ",
  //   new Blob([JSON.stringify(data)], { type: "application/json" })
  // );
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  formData.append("registerInfo", blob);

  axios({
    url: "http://j7c208.p.ssafy.io:8080/api/league",
    method: "post",
    data: formData,
    headers: {
      Authorization: `Bearer ${localStorage.token}`
      // "Content-Type": "multipart/form-data"
    }
  })
    .then(response => {
      alert("대회 등록이 완료되었습니다.");
      console.log(response.status);
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
      console.log(files);
      console.log(blob);
      formData.forEach((value, key) => {
        console.log(`key: ${key}//value: ${value}`);
      });
      formData.forEach(value => {
        console.log(value);
      });
      console.log(data);
    });
}

export default CreateLeague;
