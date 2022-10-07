import React, { useEffect, useRef } from "react";
/* eslint-disable jsx-a11y/media-has-caption */

export default function OpenViduVideoComponent({ streamManager }) {
  const videoRef = useRef();
  useEffect(() => {
    if (videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <video ref={videoRef} autoPlay />;
}
