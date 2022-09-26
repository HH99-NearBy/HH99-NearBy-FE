import React, { useEffect, useRef } from "react";
import styled from "styled-components";

function OvVideo({ streamManager }: { streamManager: any }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (streamManager !== null && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  console.log(streamManager);
  return (
    <>
      {/* {streamManager.stream.videoActive ? (
        <video ref={videoRef} autoPlay={true} className="video_container" />
      ) : (
        <StDefaultUser>영상이 꺼져있습니다</StDefaultUser>
      )} */}
      <StUserVideo ref={videoRef} autoPlay={true} className="video_container" />
    </>
  );
}

const StDefaultUser = styled.div``;
const StUserVideo = styled.video`
  width: 315px;
  height: 236px;
  overflow: hidden;
`;

export default OvVideo;
// {streamManager.stream.videoActive ? < video ref = { videoRef } autoPlay = { true} className = "video_container" /> :}
