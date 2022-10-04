import React from "react";
import "./SupportAmount.scss";

interface txType {
  blockHash: string;
  blockNumber: string;
  fromAddress: string;
  isRemit: string;
  toAddress: string;
  transactionHash: string;
  value: string;
}

interface SupportAmountProps {
  item: txType;
  state: number;
}

function SupportAmount({ item, state }: SupportAmountProps) {
  return (
    <div id="support-amount">
      <div className="support-amount">
        <p>{state === 0 ? item.fromAddress : item.toAddress}</p>
        <p>{item.value} MOK</p>
      </div>
    </div>
  );
}

export default SupportAmount;
