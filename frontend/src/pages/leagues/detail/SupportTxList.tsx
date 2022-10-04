import React, { useEffect, useState } from "react";
import { getTransactions } from "apis/myPage/myPage";
import { v4 } from "uuid";
import "./SupportTxList.scss";
import SupportAmount from "pages/user/mypage/SupportAmount";
import { array } from "prop-types";

interface SupportTxListProps {
  state: number;
}

interface txType {
  blockHash: string;
  blockNumber: string;
  fromAddress: string;
  isRemit: string;
  toAddress: string;
  transactionHash: string;
  value: string;
}

function SupportTxList({ state }: SupportTxListProps) {
  const [txList, setTxList] = useState<txType[]>();
  const [recentlyTxList, setRecentlyTxList] = useState<txType[]>();
  const [allTx, setAllTx] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getTransactions(state);
      console.log(res);
      if (res) {
        setRecentlyTxList(res.splice(0, 10));
        setTxList(res);
      } else {
        setRecentlyTxList(undefined);
        setTxList(undefined);
      }
    })();
  }, [state]);

  return (
    <div className="support-tx">
      {!!recentlyTxList && !!txList ? (
        recentlyTxList.map((item: txType) => {
          return <SupportAmount key={v4()} item={item} state={state} />;
        })
      ) : (
        <p>거래 내역이 없습니다.</p>
      )}
      {!!recentlyTxList && !!txList && !allTx && txList.length >= 1 && (
        <button
          className="support-tx-add"
          type="button"
          onClick={() => setAllTx(true)}
        >
          + 더보기
        </button>
      )}
      {recentlyTxList &&
        txList &&
        allTx &&
        txList.map((item: txType) => {
          return <SupportAmount key={v4()} item={item} state={state} />;
        })}
      {!!recentlyTxList && allTx && (
        <button
          className="support-tx-add"
          type="button"
          onClick={() => setAllTx(false)}
        >
          닫기
        </button>
      )}
    </div>
  );
}

export default SupportTxList;
