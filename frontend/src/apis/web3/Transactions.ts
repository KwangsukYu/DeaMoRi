import axios from "axios";

const BASE_URL = "http://j7c208.p.ssafy.io:8080/api/";

export interface addSupportType {
  leaguePk: number;
  sendUniversity: any;
  supportName: string;
  transactionHash: string;
}

export const addSupport = async (data: addSupportType) => {
  const res = await axios({
    method: "post",
    url: `${BASE_URL}/transaction/support`,
    data,
    headers: { Authorization: `Bearer ${localStorage.token}` }
  });
  console.log(res);
  return res;
};

export interface addCheerType {
  content: string;
  leaguePk: number;
  sendTeam: number;
  supportName: string;
  transactionHash: string;
}

export const addCheer = async (data: addCheerType) => {
  const res = await axios({
    method: "post",
    url: `${BASE_URL}/transaction/cheer`,
    data,
    headers: { Authorization: `Bearer ${localStorage.token}` }
  });
  console.log(res);
  return res;
};

export default {};
