import React, { useState } from "react";
import "./CreateWallet.scss";

function CreateWallet() {
  const [isCreate, setIsCreate] = useState(false);

  return (
    <div id="create-wallet">
      {isCreate ? (
        <div className="confirm-form">
          <p>지갑 주소 : </p>
          <p>비밀 번호 : </p>
          <button type="button">확인</button>
        </div>
      ) : (
        <div className="create-form">
          <p>지갑을 생성해 주세요</p>
          <button type="button">지갑 생성</button>
        </div>
      )}
    </div>
  );
}

export default CreateWallet;
