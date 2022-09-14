import React, { useEffect, useRef } from "react";

function OvVideo({ streamManager }: { streamManager: any }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (streamManager !== null && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  console.log(streamManager);
  return <video ref={videoRef} autoPlay={true} className="video_container" />;
}

export default OvVideo;
