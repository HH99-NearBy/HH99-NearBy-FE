import React from "react";
import styled from "styled-components";
import MyChallengeContainer from "../components/mainPage/myChallenge/MyChallengeContainer";

function MainPage() {
  const handleScrollPage = (e: React.WheelEvent<HTMLDivElement>) => {
    console.log(e);
  };
  return (
    <StMainContents onScroll={handleScrollPage}>
      <StContentsWrapper>
        <MyChallengeContainer />
      </StContentsWrapper>
      ;
    </StMainContents>
  );
}

const StMainContents = styled.div`
  height: calc(100vh - 10rem);

  background-color: green;
  overflow-y: scroll;
`;

const StContentsWrapper = styled.div`
  width: 128rem;
  height: 100vh;
  margin: 0 auto;
  background-color: skyblue;
`;

export default MainPage;
