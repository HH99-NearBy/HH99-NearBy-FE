import React from "react";
import styled from "styled-components";
import OvVideo from "./OvVideo";

function UserVideoCard({ streamManager }: { streamManager: any }) {
  return (
    <StVideoCardContainer>
      <OvVideo streamManager={streamManager} />
    </StVideoCardContainer>
  );
}

const StVideoCardContainer = styled.div`
  /* width: calc(100% / 2); */

  background-color: purple;
`;

export default UserVideoCard;
