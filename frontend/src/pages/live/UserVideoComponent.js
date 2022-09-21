import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";

export default class UserVideoComponent extends React.PureComponent {
  //   getNicknameTag() {
  //     // Gets the nickName of the user
  //     return JSON.parse(this.props.streamManager.stream.connection.data)
  //       .clientData;
  //   }

  render() {
    const { streamManager } = this.props;
    return (
      <div>
        {streamManager !== undefined ? (
          <OpenViduVideoComponent streamManager={streamManager} />
        ) : null}
      </div>
    );
  }
}
