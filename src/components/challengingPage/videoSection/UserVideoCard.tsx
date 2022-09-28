import React, { useState } from "react";
import styled from "styled-components";
import OvVideo from "./OvVideo";
import {
  IoVideocamSharp,
  IoVideocamOffSharp,
  IoMicSharp,
  IoMicOffSharp,
} from "react-icons/io5";

function UserVideoCard({
  streamManager,
  videoHandler,
  audioHandler,
}: {
  streamManager: any;
  videoHandler?: any;
  audioHandler?: any;
}) {
  const [resourceActivation, setResourceActibation] = useState({
    video: true,
    audio: true,
  });
  console.log(streamManager.stream.connection.data.split("%")[0] + '"');
  return (
    <StVideoCardContainer>
      <OvVideo streamManager={streamManager} />
      <div className="user_info_section">
        <span>
          {
            JSON.parse(streamManager.stream.connection.data.split("%")[0])
              .clientData.level
          }
          {
            JSON.parse(streamManager.stream.connection.data.split("%")[0])
              .clientData.nickname
          }
        </span>
        <div className="tool_box">
          {resourceActivation.video ? (
            <IoVideocamSharp
              style={{ color: "white" }}
              onClick={() => {
                videoHandler();
                setResourceActibation({
                  ...resourceActivation,
                  video: !resourceActivation.video,
                });
              }}
            />
          ) : (
            <IoVideocamOffSharp
              style={{ color: "red" }}
              onClick={() => {
                videoHandler();
                setResourceActibation({
                  ...resourceActivation,
                  video: !resourceActivation.video,
                });
              }}
            />
          )}
          {resourceActivation.audio ? (
            <IoMicSharp
              style={{ color: "white" }}
              onClick={() => {
                audioHandler();
                setResourceActibation({
                  ...resourceActivation,
                  audio: !resourceActivation.audio,
                });
              }}
            />
          ) : (
            <IoMicOffSharp
              style={{ color: "red" }}
              onClick={() => {
                audioHandler();
                setResourceActibation({
                  ...resourceActivation,
                  audio: !resourceActivation.audio,
                });
              }}
            />
          )}
        </div>
      </div>
    </StVideoCardContainer>
  );
}

const StVideoCardContainer = styled.div`
  /* width: calc(100% / 2); */
  /* flex: 0 24%; */
  margin: 0.25rem;
  position: relative;
  height: calc(100% / 4);
  background-color: red;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */

  .user_info_section {
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 3.5rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      /* min-width: 24rem;
    width: 70%; */
      font-size: 2rem;
      display: flex;
      align-items: center;
      padding: 0.9rem 0;
      color: white;
    }
    .tool_box {
      svg {
        width: 2rem;
        height: 2rem;
        :nth-of-type(1) {
          margin-right: 1rem;
        }
      }
    }
  }
`;

export default UserVideoCard;
