import Web3 from "web3";
import axios from "axios";
import { TokenContarct, NFTContract } from "./SmartContract";

const web3 = new Web3("http://localhost:8545");

const getCoinBase = async () => {
  const res = await web3.eth.getCoinbase();
  return res;
};

// 공개키, 개인키 생성
export const createAccount = async () => {
  const coinBase = await getCoinBase();
  const createdObj = web3.eth.accounts.create();
  const account = web3.eth.accounts.privateKeyToAccount(createdObj.privateKey);
  const wallet = web3.eth.accounts.wallet.add(account);

  // 임시 1이더 송금
  web3.eth.personal.unlockAccount(coinBase, "123", 300);
  const Eth = web3.utils.toWei("1", "ether");
  const tx = {
    from: coinBase,
    to: wallet.address,
    value: Eth
  };
  web3.eth.sendTransaction(tx).then(receipt => {
    console.log(receipt);
  });

  return [wallet.address, wallet.privateKey];
};

// 지갑 잔액 조회, 이더
export const getWalletBalance = async () => {
  // const coinBase = await getCoinBase();
  const coinBase = "0x88606631413A02b1CD0820Db7d0ed209a6fF7689";
  const res = TokenContarct.methods
    .balanceOf(coinBase)
    .call()
    .then(balance => balance);
  return res;
};

// 이더 충전
export const chargeCoin = async (price, address) => {
  const coinBase = await getCoinBase();

  await TokenContarct.methods
    .approve(coinBase, price)
    .send({ from: coinBase })
    .then(res => console.log(res));

  await TokenContarct.methods
    .transferFrom(coinBase, address, price)
    .send({ from: coinBase })
    .then(res => console.log(res));
};

// IPFS 서버 업로드

export const sendFileToIPFS = async (file, league, team, address) => {
  const coinBase = await getCoinBase();
  let ImgHash;
  try {
    const formData = new FormData();
    formData.append("file", file);
    const resFile = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: formData,
      headers: {
        pinata_api_key: "6bf132913c976501782c",
        pinata_secret_api_key:
          "598761323c0a9bf7d37afb0fff220c1ada290f178323ed9f2260ccb60d2d61d9",
        "Content-Type": "multipart/form-data"
      }
    });

    ImgHash = `ipfs://${resFile.data.IpfsHash}`;
    console.log(ImgHash);
  } catch (error) {
    console.log("Error sending File to IPFS: ");
    console.log(error);
  }

  const data = JSON.stringify({
    description: { league },
    image: ImgHash,
    name: { team }
  });

  const config = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    headers: {
      "Content-Type": "application/json",
      pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
      pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY
    },
    data
  };

  const res = await axios(config);

  console.log(res.data);

  await NFTContract.methods
    .mintNFT(coinBase, `ipfs://${res.data.IpfsHash}`)
    .send({ from: coinBase })
    .then(response => console.log(response));
};

export default {};
