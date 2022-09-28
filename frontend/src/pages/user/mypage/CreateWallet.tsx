import React, { useState } from "react";
import { createAccount } from "apis/web3/web3";
import { addWallet } from "apis/wallet";
import "./CreateWallet.scss";

interface CreateWalletProps {
  signal: () => void;
}

function CreateWallet({ signal }: CreateWalletProps) {
  const [isCreate, setIsCreate] = useState(false);
  const [walletInfo, setWalletInfo] = useState(["", ""]);

  const createWallet = async () => {
    const res = (await createAccount()) as string[];
    setWalletInfo(res);
    await addWallet(res[0]);
    setIsCreate(true);
  };

  const createConfirm = () => {
    const chk = window.confirm(
      "비밀번호는 잃어버리면 복구가 힘듭니다. 꼭 잃어버리지 않도록 해주세요!"
    );
    if (chk) {
      signal();
    }
  };

  return (
    <div id="create-wallet">
      {isCreate ? (
        <div className="confirm-form">
          <p className="confirm-form-text">
            지갑주소 <br />{" "}
            <span className="confirm-form-text wallet-address">
              {walletInfo[0]}
            </span>
          </p>
          <p className="confirm-form-text ">
            비밀번호 <br />{" "}
            <span className="confirm-form-text wallet-password">
              {walletInfo[1]}
            </span>
          </p>
          <button type="button" onClick={createConfirm}>
            확인
          </button>
        </div>
      ) : (
        <div className="create-form">
          <p>지갑을 생성해 주세요</p>
          <button type="button" onClick={() => createWallet()}>
            지갑 생성
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateWallet;
