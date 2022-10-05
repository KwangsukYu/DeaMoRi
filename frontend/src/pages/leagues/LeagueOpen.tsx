import React, { useState, useEffect } from "react";
import "./LeagueOpen.scss";
import LeagueStart from "../../apis/leagues/LeagueStart";
import Poster from "./Poster";

interface keywordPorps {
  keyword: string;
}

function LeagueOpen({ keyword }: keywordPorps) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await LeagueStart();
      console.log(res);
      setItems(res);
    })();
  }, []);

  return (
    <div id="LeagueOpen">
      <div className="LeagueOpen">
        {items
          .filter((item: any) => item.status < 2)
          .map(item => {
            return <Poster key={item.leagueId} item={item} />;
          })}
        {/* {items
      .filter((item: any) => item.status < 2)
      .map(item => {
        return <Poster key={item.id} item={item} />;
      })} */}
      </div>
    </div>
  );
}

export default LeagueOpen;
