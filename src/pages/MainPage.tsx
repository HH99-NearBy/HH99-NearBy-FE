import React from "react";
import styled from "styled-components";
import MyChallengeContainer from "../components/mainPage/myChallenge/MyChallengeContainer";
import RecruitContainer from "../components/mainPage/recruit/RecruitContainer";

function MainPage() {
  return (
    <StMainContents>
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
