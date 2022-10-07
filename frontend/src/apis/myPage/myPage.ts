import axios from "axios";

export const sendTx = async (tx: string) => {
  const re = await axios({
    url: "https://j7c208.p.ssafy.io:8080/api/transaction/charge",
    method: "post",
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    },
    params: {
      transactionHash: tx
    }
  })
    .then(res => res.data)
    .catch(err => {
      console.log(err);
    });
  return re;
};

export const sendUniAuth = async (file: File, uniName: string) => {
  const formData = new FormData();
  formData.append("file", file);

  formData.append("univesityName", uniName);

  await axios({
    url: "https://j7c208.p.ssafy.io:8080/api/users/auth",
    method: "post",
    data: formData,
    headers: { Authorization: `Bearer ${localStorage.token}` }
  })
    .then(res => res.data)
    .catch(err => {
      alert("대학이름을 제대로 입력해주세요 OO대학교");
    });
};

export const setProfile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  await axios({
    url: "https://j7c208.p.ssafy.io:8080/api/users/profile",
    method: "patch",
    data: formData,
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      "Content-Type": "multipart/form-data"
    }
  })
    .then(res => res)
    .catch(err => {
      console.log(err);
    });
};

export const getTransactions = async (state: number) => {
  const re = await axios({
    url: "https://j7c208.p.ssafy.io:8080/api/wallet/transaction",
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
