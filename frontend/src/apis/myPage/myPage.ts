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

export const setProfile = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  axios({
    url: "http://j7c208.p.ssafy.io:8080/api/users/profile",
    method: "patch",
    data: formData,
    headers: {
      Authorization: `Bearer ${localStorage.token}`
      // "Content-Type": "multipart/form-data"
    }
  })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const getTransactions = (state: number) => {
  const re = axios({
    url: "http://j7c208.p.ssafy.io:8080/api/wallet/transaction",
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    },
    params: {
      isRemit: state
    }
  })
    .then(res => res.data)
    .catch(err => {
      console.log(err);
    });
  return re;
};

export default {};
