import React, { useState, Component } from "react";

export default function OpenViduVideoComponent(props) {
  const [videoRef, setVideoRef] = useState(React.createRef());

  const componentDidMount = () => {
    const { streamManager } = props;
    if (props && !!videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  };

  const componentDidUpdate = p => {
    const { streamManager } = props;
    if (p && !!videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  };

  const openFullscreen = () => {
    const { streamManager } = props;
    const elem = document.getElementById("myvideo");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };
  componentDidMount();
  componentDidUpdate(props);
  openFullscreen();

  return (
    <div className="openviduTag">
      <video
        muted
        className="videosize"
        id="myvideo"
        autoPlay
        ref={videoRef}
        playsInline
        controls
      />
      {/* <FontAwesomeIcon className='iconsize fullscreenbutton fullscreenbutton_margin' onClick={openFullscreen} icon={faExpand} size="1x" /> */}
    </div>
  );
}
