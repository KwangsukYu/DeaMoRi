import Web3 from "web3";
import axios from "axios";
import {
  TokenContract,
  NFTContract,
  TokenCA,
  getContractCA
} from "./SmartContract";

const web3 = new Web3(process.env.REACT_APP_GETH_NODE);

export const getAdminAdress = async () => {
  const res = await web3.eth.getCoinbase();
  return res;
};

export const createAccount = async () => {
  const coinBase = await getAdminAdress();
  const createdObj = web3.eth.accounts.create();
  const account = web3.eth.accounts.privateKeyToAccount(createdObj.privateKey);
  const wallet = web3.eth.accounts.wallet.add(account);

  await web3.eth.personal.unlockAccount(
    coinBase,
    process.env.REACT_APP_COINBASE_PASSWORD,
    300
  );

  const Eth = web3.utils.toWei("1", "ether");
  const tx = {
    from: coinBase,
    to: wallet.address,
    value: Eth
  };
  web3.eth.sendTransaction(tx).then(receipt => receipt);

  return [wallet.address, wallet.privateKey];
};

export const getWalletBalance = async address => {
  const res = TokenContract.methods
    .balanceOf(address)
    .call()
    .then(balance => balance);
  return res;
};

export const chargeCoin = async (price, address) => {
  const coinBase = await getAdminAdress();
  web3.eth.personal.unlockAccount(
    coinBase,
    process.env.REACT_APP_COINBASE_PASSWORD,
    300
  );

  const txHash = await TokenContract.methods
    .transfer(address, price)
    .send({ from: coinBase })
    .then(res => res.transactionHash);

  return txHash;
};

export const sendFileToIPFS = async (file, league, team, address) => {
  const coinBase = await getAdminAdress();
  let ImgHash;
  let TrophyUrl;
  try {
    const formData = new FormData();
    formData.append("file", file);
    const resFile = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: formData,
      headers: {
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
        "Content-Type": "multipart/form-data"
      }
    });
    TrophyUrl = resFile.data.IpfsHash;
    ImgHash = `ipfs://${resFile.data.IpfsHash}`;
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

  await NFTContract.methods
    .mintNFT(address, `ipfs://${res.data.IpfsHash}`)
    .send({ from: coinBase })
    .then(response => response);

  return `https://gateway.pinata.cloud/ipfs/${TrophyUrl}`;
};

// 대회 열려있는지 확인
export const isOpened = async address => {
  const newCA = getContractCA(address);
  const resp = await newCA.methods
    .isOpened()
    .call()
    .then(res => res);
  return resp;
};

// 팀 후원
export const cheerWithERC20 = async (
  userAddress,
  teamAddress,
  amount,
  privateKey
) => {
  const coinBase = await web3.eth.getCoinbase();

  const data = await TokenContract.methods
    .approve(coinBase, amount)
    .encodeABI();

  const txData = {
    from: userAddress,
    gasPrice: web3.utils.toWei("42", "gwei"),
    gas: web3.utils.toHex("320000"),
    to: TokenCA,
    value: "0x",
    data
  };

  const tx = await web3.eth.accounts
    .signTransaction(txData, privateKey)
    .then(res => res);

  await web3.eth.sendSignedTransaction(tx.rawTransaction).then(res => res);

  const txHash = await TokenContract.methods
    .transferFrom(userAddress, teamAddress, amount)
    .send({ from: coinBase })
    .then(res => res.transactionHash);

  return txHash;
};

// 대회 후원
export const fundWithERC20 = async (
  userAddress,
  leagueAddress,
  amount,
  privateKey
) => {
  const isOpen = await isOpened(leagueAddress);
  const coinBase = await web3.eth.getCoinbase();

  if (isOpen) {
    const data = await TokenContract.methods
      .approve(coinBase, amount)
      .encodeABI();

    const txData = {
      from: userAddress,
      gasPrice: web3.utils.toWei("42", "gwei"),
      gas: web3.utils.toHex("320000"),
      to: TokenCA,
      value: "0x",
      data
    };

    const tx = await web3.eth.accounts
      .signTransaction(txData, privateKey)
      .then(res => res);

    await web3.eth.sendSignedTransaction(tx.rawTransaction).then(res => res);

    const txHash = await TokenContract.methods
      .transferFrom(userAddress, leagueAddress, amount)
      .send({ from: coinBase })
      .then(res => res.transactionHash);
    return txHash;
  }
  alert("종료된 대회입니다.");
  return 0;
};

// 대회 종료하기
export const closeLeague = async (ca, num, amount) => {
  const newCA = getContractCA(ca);
  const coinBase = await web3.eth.getCoinbase();
  web3.eth.personal.unlockAccount(
    coinBase,
    process.env.REACT_APP_COINBASE_PASSWORD,
    300
  );
  const txHash = await newCA.methods
    .ended(TokenCA, num, amount)
    .send({ from: coinBase })
    .then(function (receipt) {
      return receipt.transactionHash;
    });

  return txHash;
};

export default {};
