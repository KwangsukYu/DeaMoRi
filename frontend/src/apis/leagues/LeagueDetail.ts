import axios from "axios";

export interface teamType {
  teamId: number;
  teamName: string;
  teamColor: string;
  teamWalletAddress: string;
  teamDonation: number;
  teamUniversityIdv: string;
  teamUniversityName: string;
  teamUniversitylogoUrl: string;
  getCheers: any;
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

export default {};
