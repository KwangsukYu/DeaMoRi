import React, { useState } from "react";
import "./CoinCharge.scss";
import { numberWithCommas } from "utils/numberComma";
import { chargeCoin } from "apis/web3/web3";
import { CircularProgress } from "@mui/material";

interface CoinChargeProps {
  signal: () => void;
  userAddress: string;
}

function CoinCharge({ signal, userAddress }: CoinChargeProps) {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  const addAmount = (num: number) => {
    setAmount(cur => cur + num);
  };

  const charge = async (num: number) => {
    setLoading(true);
    await chargeCoin(num, userAddress);
    signal();
    setLoading(false);
  };

  return (
    <div className="wrapper">
      <div id="charge">
        <div className="charge">
          <p>코인 충전</p>
          <div className="charge-amount">
            <p>
              충전 금액 <br /> {numberWithCommas(amount)}
            </p>
            <button type="button" onClick={() => addAmount(10000)}>
              {numberWithCommas(10000)}
            </button>
            <button type="button" onClick={() => addAmount(100000)}>
              {numberWithCommas(100000)}
            </button>
            <button type="button" onClick={() => addAmount(1000000)}>
              {numberWithCommas(1000000)}
            </button>
            <button type="button" onClick={() => addAmount(10000000)}>
              {numberWithCommas(10000000)}
            </button>
          </div>
          {loading ? (
            <div className="charge-button">
              <CircularProgress />
            </div>
          ) : (
            <div className="charge-button">
              <button
                type="button"
                className="blue"
                onClick={() => charge(amount)}
              >
                충전
              </button>
              <button type="button" onClick={signal}>
                취소
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoinCharge;
