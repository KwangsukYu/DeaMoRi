import axios from "axios";
import { deployCloneLeagueContract } from "apis/web3/SmartContract";

type createLeague = {
  leagueTitle: string;
  prizeMoney: number;
  leagueStart: string;
  leagueEnd: string;
  place: string;
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
  const Axios = axios.create();
  const CA = await deployCloneLeagueContract(data.team1Wallet, data.team2Wallet)
    .then(res => res)
    .catch(err => "err");
  console.log(CA);
  if (CA === "err") {
    return "지갑오류";
  }
  const newData = { ...data, contractAddress: CA };

  const formData = new FormData();
  formData.append("file", files[0]);
  const blob = new Blob([JSON.stringify(newData)], {
    type: "application/json"
  });
  formData.append("registerInfo", blob);

  const Re = await Axios({
    url: "https://j7c208.p.ssafy.io:8080/api/league",
    method: "post",
    data: formData,
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    }
  })
    .then(response => {
      console.log(response.data.message, "대회 생성 객체");
      return response.data.message;
    })
    .catch(err => "지갑오류");
  return Re;
}

export default CreateLeague;
