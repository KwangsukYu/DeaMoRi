// import React from "react";
import axios from "axios";

type createLeague = {
  leagueTitle: string;
  sponStart: string;
  leagueStart: string;
  leagueEnd: string;
  place: string;
  poster: File;

  team1University: string;
  team1Name: string;
  team1Wallet: string;
  team2University: string;
  team2Name: string;
  team2Wallet: string;
  team1Color: string;
  team2Color: string;
  broadcast: number;
};

function CreateLeague(data: createLeague) {
  axios({
    url: "http://j7c208.p.ssafy.io:8080/api/league",
    method: "post",
    data,
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    }
  })
    .then(response => {
      alert("대회 등록이 완료되었습니다.");
      console.log(response.status);
      console.log(response.data);
    })
    .catch(e => console.log("something went wrong :(", e));
}

export default CreateLeague;
