import React from "react";
import OpenViduVideoComponent from "./OvVideo";

export default function UserVideoComponent({ streamManager }) {
  return (
    <div>
      {streamManager !== undefined ? (
        <OpenViduVideoComponent streamManager={streamManager} />
      ) : null}
    </div>
  );
}
