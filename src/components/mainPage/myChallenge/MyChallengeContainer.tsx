import React from "react";
import styled from "styled-components";

function MyChallengeContainer() {
  return (
    <StContentsWrapper>
      <h2>참여한 챌린지</h2>
    </StContentsWrapper>
  );
}

const StContentsWrapper = styled.div`
  width: 100%;
  padding-top: 10rem;
  h2 {
    padding-bottom: 5rem;
    font-size: 3.5rem;
  }
`;

export default MyChallengeContainer;
