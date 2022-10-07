import axios from "axios";

export function getMyInfo() {
  const res = axios({
    url: "https://j7c208.p.ssafy.io:8080/api/users/me",
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
