import axios from "axios";

export const sendUniAuth = (file: File, uniName: string) => {
  const formData = new FormData();
  formData.append("file", file);

  formData.append("univesityName", uniName);

  axios({
    url: "http://j7c208.p.ssafy.io:8080/api/users/auth",
    method: "post",
    data: formData,
    headers: { Authorization: `Bearer ${localStorage.token}` }
  })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export default {};
