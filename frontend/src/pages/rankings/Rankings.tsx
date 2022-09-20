import { useState } from "react";
import "./Rankings.scss";
import UniRankings from "./UniRankings";
import SponRankings from "./SponRankings";

function Rankings() {
  const [bar, setBar] = useState("uni");
  return (
    <div id="rankings">
      <div className="background">
        <div className="button-list">
          <h3
            className="tab-title"
            onClick={() => {
              setBar("uni");
            }}
          >
            대학
          </h3>
          <h3
            className="tab-title"
            onClick={() => {
              setBar("spon");
            }}
          >
            후원
          </h3>
        </div>
        <div className="bar">
          {bar === "uni" ? (
            <div className="bar-state-uni"></div>
          ) : (
            <div className="bar-state-spon"></div>
          )}
        </div>
        <div className="tab-main">
          {bar === "uni" ? (
            <UniRankings></UniRankings>
          ) : (
            <SponRankings></SponRankings>
          )}
        </div>
      </div>
    </div>
  );
}
export default Rankings;
