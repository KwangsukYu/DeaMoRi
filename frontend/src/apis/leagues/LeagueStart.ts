import axios from "axios";

async function LeagueStart(keyword: string) {
  const response = await axios({
    url: `https://j7c208.p.ssafy.io:8080/api/league?field=id&keyword=${keyword}&page=0&size=10000`,
    method: "get",
    headers: {}
  })
    .then(res => {
      if (res.status === 200) {
        return res.data.getLeagues;
      }
      return [];
    })
    .catch(err => {
      console.log(err);
    });
  return response;
}

export default LeagueStart;
