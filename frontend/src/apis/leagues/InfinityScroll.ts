import axios from "axios";

interface leaguesType {
  donation: number;
  leagueEndDate: string;
  leagueId: number;
  leagueName: string;
  leagueStartDate: string;
  posterURL: string;
  prizeMoney: number;
  status: string;
  uniName1: string;
  uniName2: string;
}

export const getLeagues = async (keyword: string, page: number) => {
  const re = await axios({
    url: "http://j7c208.p.ssafy.io:8080/api/league/",
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    },
    params: {
      field: "id",
      keyword,
      page,
      size: 8
    }
  })
    .then(res => res.data)
    .catch(err => {
      console.log(err);
    });
  console.log(re.getLeagues);
  return re.getLeagues;
};

export default {};
