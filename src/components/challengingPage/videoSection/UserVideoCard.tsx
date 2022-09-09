import React from "react";
import styled from "styled-components";
import OvVideo from "./OvVideo";

function UserVideoCard({ streamManager }: { streamManager: any }) {
  return (
    <StVideoCardContainer className="video_container">
      <OvVideo streamManager={streamManager} />
    </StVideoCardContainer>
  );
}

const StVideoCardContainer = styled.div`
  background-color: purple;
`;

export default UserVideoCard;
