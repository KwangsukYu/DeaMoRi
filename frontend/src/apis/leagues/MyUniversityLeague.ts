import axios from "axios";

async function MyUniversityLeague(universityPk: number) {
  const response = await axios({
    url: `https://j7c208.p.ssafy.io:8080/api/univers/league/${universityPk}`,
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

export default MyUniversityLeague;
