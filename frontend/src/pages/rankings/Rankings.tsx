import React, { useState } from "react";
import "./Rankings.scss";
import UniRankings from "./UniRankings";
import SponRankings from "./SponRankings";

function Rankings() {
  const [bar, setBar] = useState("uni");
  return (
    <div id="rankings">
      <div className="background">
        <div className="button-list">
          <button
            className="tab-button"
            type="button"
            onClick={() => {
              setBar("uni");
            }}
          >
            <p
              className={
                bar === "uni" ? "tab-button-title-active" : "tab-button-title"
              }
            >
              대학
            </p>
          </button>
          <button
            className="tab-button"
            type="button"
            onClick={() => {
              setBar("spon");
            }}
          >
            <p
              className={
                bar === "spon" ? "tab-button-title-active" : "tab-button-title"
              }
            >
              후원
            </p>
          </button>
        </div>
        <div className="bar">
          {bar === "uni" ? (
            <div className="bar-state-uni" />
          ) : (
            <div className="bar-state-spon" />
          )}
        </div>
        <div className="tab-main">
          {bar === "uni" ? <UniRankings /> : <SponRankings />}
        </div>
      </div>
    </div>
  );
}
export default Rankings;
