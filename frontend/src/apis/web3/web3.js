import Web3 from "web3";

const web3 = new Web3("http://localhost:8545");
const coinBase = await web3.eth.getCoinbase();

// 공개키, 개인키 생성
const createAccount = () => {
  const createdObj = web3.eth.accounts.create();
  const account = web3.eth.accounts.privateKeyToAccount(createdObj.privateKey);
  const wallet = web3.eth.accounts.wallet.add(account);
  return [wallet, account.privateKey];
};

// 지갑 잔액 조회, 이더
export const getWalletBalance = () => {
  const res = web3.eth
    .getBalance(coinBase)
    .then(balance => web3.utils.fromWei(balance, "ether"));
  console.log(res);
};

// 이더 충전
const chargeEth = (price, address) => {
  web3.eth.personal.unlockAccount(coinBase, "123", 300);
  const Eth = web3.utils.toWei(String(price), "ether");
  const tx = {
    from: coinBase,
    to: address,
    value: Eth
  };
  web3.eth.sendTransaction(tx).then(receipt => {
    console.log(receipt);
    web3.eth.personal.lockAccount(coinBase);
  });
};

export default {};
