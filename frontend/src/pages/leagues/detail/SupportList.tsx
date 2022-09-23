import React from "react";
import { v4 } from "uuid";

import SupportItem from "./SupportItem";

function SupportList() {
  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div id="supportlist">
      <div className="supportlist">
        {dummy.map((e, i) => {
          return <SupportItem key={v4()} rank={i + 1} />;
        })}
      </div>
    </div>
  );
}

export default SupportList;
