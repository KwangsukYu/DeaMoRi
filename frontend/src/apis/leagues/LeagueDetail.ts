import axios from "axios";

export interface commentType {
  cheerBalance: number;
  cheerContent: string;
  cheerId: number;
  cheerName: string;
  selectTeam: string;
  sendId: string;
}

export interface supporterType {
  selectUniversity: string;
  sendId: number;
  supportBalance: number;
  supportId: number;
  supportName: string;
}

export interface teamType {
  teamId: number;
  teamName: string;
  teamColor: string;
  teamWalletAddress: string;
  teamDonation: number;
  teamUniversityIdv: string;
  teamUniversityName: string;
  teamUniversitylogoUrl: string;
  getCheers: commentType[];
  getSupports: supporterType[];
}

export interface leagueDetailType {
  message: string;
  statusCode: number;
  leaguePk: number;
  ownerPk: string;
  ownerAddress: string;
  leagueId: string;
  leagueContractAddress: string;
  leagueStartDate: string;
  leagueEndDate: string;
  location: string;
  isBroadcast: string;
  status: string;
  posterURL: string;
  allDonation: number;
  team1: teamType;
  team2: teamType;
}

export function getLeagueDetail(leagueId: number) {
  const res = axios({
    url: `http://j7c208.p.ssafy.io:8080/api/league/${leagueId}`,
    method: "get",
    headers: { Authorization: `Bearer ${localStorage.token}` }
  })
    .then(re => re.data)
    .catch(err => {
      console.error(err);
    });
  return res;
}

export function changeToPlaying(leaguePk: number) {
  const res = axios({
    url: "http://j7c208.p.ssafy.io:8080/api/league/start",
    method: "get",
    headers: { Authorization: `Bearer ${localStorage.token}` },
    params: { leaguePk }
  })
    .then(re => re.data)
    .catch(err => {
      console.error(err);
    });
  return res;
}

export function changeToEnd(
  leaguePk: number,
  transactionHash: string,
  trophyUrl: string,
  winner: string
) {
  const data = {
    leaguePk,
    transactionHash:
      "0x28078d1de93df68f76d924b581e4135120f49f92a14a46eeb5bf181b742e5eff",
    trophyUrl,
    winner
  };
  console.log(data);

  const res = axios({
    url: "http://j7c208.p.ssafy.io:8080/api/league/end",
    method: "petch",
    headers: { Authorization: `Bearer ${localStorage.token}` },
    data
  })
    .then(re => re.data)
    .catch(err => {
      console.error(err);
    });
  return res;
}

export default {};
