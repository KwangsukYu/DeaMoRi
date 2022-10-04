import React, { useEffect, useRef } from "react";

export default function OpenViduVideoComponent({ streamManager }) {
  const videoRef = useRef();
  useEffect(() => {
    if (videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <video ref={videoRef} autoPlay muted />;
}
