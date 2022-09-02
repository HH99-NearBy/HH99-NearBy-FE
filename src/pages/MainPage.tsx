import React from "react";
import styled from "styled-components";
import MyChallengeContainer from "../components/mainPage/myChallenge/MyChallengeContainer";
import RecruitContainer from "../components/mainPage/recruit/RecruitContainer";

function MainPage() {
  const handleScrollPage = (e: React.WheelEvent<HTMLDivElement>) => {
    console.log(e);
  };
  return (
    <StMainContents onScroll={handleScrollPage}>
      <StContentsWrapper>
        <MyChallengeContainer />
        <RecruitContainer />
      </StContentsWrapper>
      ;
    </StMainContents>
  );
}

const StMainContents = styled.div`
  background-color: #f5f5f5;
  overflow-y: scroll;
`;

const StContentsWrapper = styled.div`
  width: 128rem;
  margin: 0 auto;
`;

export default MainPage;
