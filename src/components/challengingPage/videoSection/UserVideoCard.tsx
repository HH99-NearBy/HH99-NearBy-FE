import React from "react";
import styled from "styled-components";
import OvVideo from "./OvVideo";

function UserVideoCard({ streamManager }: { streamManager: any }) {
  return (
    <StVideoCardContainer>
      <OvVideo streamManager={streamManager} />
      <span>username</span>
    </StVideoCardContainer>
  );
}

const StVideoCardContainer = styled.div`
  /* width: calc(100% / 2); */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  span {
    display: block;
    min-width: 24rem;
    width: 80%;
    font-size: 2rem;
    display: flex;
    align-items: center;
    padding: 0.9rem 0;
    color: white;
  }
`;

export default UserVideoCard;
