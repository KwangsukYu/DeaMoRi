import React, { useState, useEffect } from "react";
import "./LeagueList.scss";
import LeagueStart from "../../apis/leagues/LeagueStart";
import LeagueEnd from "../../apis/leagues/LeagueEnd";
import Poster from "./Poster";

interface keywordPorps {
  keyword: string;
  status: boolean;
}

function LeagueList({ keyword, status }: keywordPorps) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // 진행중 대회 LeagueStart() 요청
    if (status) {
      (async () => {
        const res = await LeagueStart(keyword);
        setItems(res);
      })();
    } else {
      // 종료된 대회 LeagueEnd() 요청
      (async () => {
        const res = await LeagueEnd(keyword);
        setItems(res);
      })();
    }
  }, [keyword, status]);

  return (
    <div id="leagueopen">
      <div className="leagueopen">
        {items.length === 0 && (
          <div className="leagueopen-empty">검색 결과가 없습니다.</div>
        )}
        {items.length !== 0 &&
          items.map(item => {
            return <Poster key={item.leagueId} item={item} />;
          })}
      </div>
    </div>
  );
}

export default LeagueList;
