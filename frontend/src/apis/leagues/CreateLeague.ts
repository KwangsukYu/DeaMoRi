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
  sponStart: string;
  leagueStart: string;
  leagueEnd: string;
  place: string;
  poster: File;
  broadcast: number;

  team1University: string;
  team1Name: string;
  team1Wallet: string;
  team2University: string;
  team2Name: string;
  team2Wallet: string;
  team1Color: string;
  team2Color: string;
};

function CreateLeague(data: createLeague) {
  // // function CreateLeague(data) {
  // // data.poster = data.poster[0];
  // console.log(data.poster);
  // console.log("잘 되나?");
  const {
    leagueTitle,
    sponStart,
    leagueStart,
    leagueEnd,
    place,
    broadcast,
    team1University,
    team1Name,
    team1Wallet,
    team2University,
    team2Name,
    team2Wallet,
    team1Color,
    team2Color
  } = data;

  axios({
    url: "http://j7c208.p.ssafy.io:8080/api/league",
    method: "post",
    data: {
      leagueTitle,
      sponStart,
      leagueStart,
      leagueEnd,
      place,
      broadcast,
      team1University,
      team1Name,
      team1Wallet,
      team2University,
      team2Name,
      team2Wallet,
      team1Color,
      team2Color
    },
    headers: {
      Authorization: `Bearer ${localStorage.token}`
      // "Content-Type": "multipart/form-data"
    }
    // params: {file: , registerInfo:data}
    // config: {"Content-Type": 'application/json'}
  })
    .then(response => {
      alert("대회 등록이 완료되었습니다.");
      console.log(response.status);
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
      console.log(data);
    });
}

export default CreateLeague;
