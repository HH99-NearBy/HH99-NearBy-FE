import React, { useState } from "react";
import styled from "styled-components";
import MyChallengeContainer from "../components/mainPage/myChallenge/MyChallengeContainer";
import RecruitContainer from "../components/mainPage/recruit/RecruitContainer";
import ModalPortal from "../components/mainPage/detailModal/ModalPortal";

function MainPage() {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const handleToggleModal = () => {
    setModalShow(!modalShow);
  };
  console.log(modalShow);
  return (
    <StMainContents>
      <StContentsWrapper>
        <MyChallengeContainer handleToggleModal={handleToggleModal} />
        <RecruitContainer handleToggleModal={handleToggleModal} />
      </StContentsWrapper>
      {modalShow && (
        <ModalPortal handleToggleModal={handleToggleModal} postId={1} />
      )}
    </StMainContents>
  );
}

const StMainContents = styled.div`
  background-color: #f5f5f5;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const StContentsWrapper = styled.div`
  width: 128rem;
  margin: 0 auto;
`;

export default MainPage;
