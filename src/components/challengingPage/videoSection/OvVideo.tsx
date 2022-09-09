import React, { useEffect, useRef } from "react";

function OvVideo({ streamManager }: { streamManager: any }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    streamManager.addVideoElement(videoRef.current);
  }, [streamManager]);
  return <video ref={videoRef} autoPlay={true} />;
}

export default OvVideo;
