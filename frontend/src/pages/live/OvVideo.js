import React, { Component } from "react";
// import '../routers.css'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faExpand } from '@fortawesome/free-solid-svg-icons'

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.openFullscreen = this.openFullscreen.bind(this);
  }

  componentDidMount() {
    const { streamManager } = this.props;
    if (this.props && !!this.videoRef) {
      streamManager.addVideoElement(this.videoRef.current);
    }
  }

  componentDidUpdate(props) {
    const { streamManager } = this.props;
    if (props && !!this.videoRef) {
      streamManager.addVideoElement(this.videoRef.current);
    }
  }

  openFullscreen() {
    const { streamManager } = this.props;
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
  }

  render() {
    return (
      <div className="openviduTag">
        <video
          muted
          className="videosize"
          id="myvideo"
          autoPlay
          ref={this.videoRef}
          playsInline
          controls
        />
        {/* <FontAwesomeIcon className='iconsize fullscreenbutton fullscreenbutton_margin' onClick={this.openFullscreen} icon={faExpand} size="1x" /> */}
      </div>
    );
  }
}
