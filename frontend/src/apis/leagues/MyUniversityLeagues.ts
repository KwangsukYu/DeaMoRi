import axios from "axios";
import { useSelector } from "react-redux";
import { infoType } from "Slices/userInfo";

function MyUniversityLeagues() {
  const userInfo = useSelector((state: infoType) => state.userInfo.userInfo);
  axios({
    url: `http://j7c208.p.ssafy.io:8080/api/univers/league/${userInfo.universityPk}`,
    method: "get",
    headers: { Authorization: `Bearer ${localStorage.token}` }
  })
    .then(res => {
      console.log(res.data, "내 대학 리그");
      // console.log(res);
      const data = res.data.getLeagues;
    })
    .catch(err => {
      console.error(err);
    });
}
export default MyUniversityLeagues;
