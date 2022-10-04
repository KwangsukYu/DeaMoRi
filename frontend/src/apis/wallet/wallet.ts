import axios from "axios";

const BASE_URL = "https://j7c208.p.ssafy.io:8080/api/";

export const addWallet = async (address: string) => {
  const res = await axios({
    method: "post",
    url: `${BASE_URL}/wallet`,
    params: { address },
    headers: { Authorization: `Bearer ${localStorage.token}` }
  });
  console.log(res);
  return res;
};

export const getWalletTransactions = async (state: number) => {
  const res = await axios({
    method: "get",
    url: `${BASE_URL}/wallet`,
    headers: { Authorization: `Bearer ${localStorage.token}` },
    params: state
  });
  console.log(res);
  return res;
};

export default {};
