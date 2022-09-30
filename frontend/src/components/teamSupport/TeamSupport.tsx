import React from "react";
import "./TeamSupport.scss";

interface TeamSupport {
  signal: () => void;
}

function TeamSupport({ signal }: TeamSupport) {
  return (
    <div className="teamsupport-wrapper">
      <div id="teamsupport">
        <div className="teamssuport">블록체인이 아파요 :(</div>
        <button type="button" onClick={signal}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default TeamSupport;
