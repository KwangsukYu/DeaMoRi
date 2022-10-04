import axios from "axios";

export interface TotalType {
  nowLeague: number;
  totalLeague: number;
  totalDonation: number;
}

export function getTotal() {
  const res = axios({
    url: "https://j7c208.p.ssafy.io:8080/api/league/summary",
    method: "patch"
  })
    .then(re => re.data)
    .catch(err => {
      console.error(err);
    });
  return res;
}

export default {};
