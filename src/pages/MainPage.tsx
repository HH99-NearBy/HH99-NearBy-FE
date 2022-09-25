import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import MyChallengeContainer from "../components/mainPage/myChallenge/MyChallengeContainer";
import RecruitContainer from "../components/mainPage/recruit/RecruitContainer";
import ModalPortal from "../components/mainPage/detailModal/ModalPortal";
import { AppContext } from "../api/context";
import { useQuery } from "react-query";
import apis from "../api/api";

function MainPage() {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const { state, dispatch } = useContext(AppContext);
  const handleToggleModal = () => {
    setModalShow(!modalShow);
  };
  console.log(modalShow);
  useEffect(() => {
    const userName = sessionStorage.getItem("userName");
    if (userName !== null) {
      dispatch({ type: "SYNC_USER_DATA", payload: -1, userName });
    }
  }, []);
  const handleVerticalScrolling = (e: React.MouseEvent<HTMLDivElement>) => {
    // console.log(e.currentTarget);
  };
  return (
    <StMainContents onScroll={handleVerticalScrolling} ref={mainContainerRef}>
      <StContentsWrapper>
        {state.userName ? (
          <MyChallengeContainer
            handleToggleModal={handleToggleModal}
            Ref={mainContainerRef.current}
          />
        ) : null}

        <RecruitContainer handleToggleModal={handleToggleModal} />
      </StContentsWrapper>
      {modalShow && (
        <ModalPortal handleToggleModal={handleToggleModal} postId={1} />
      )}
    </StMainContents>
  );
}

const StMainContents = styled.div`
  position: relative;
  background-color: #f5f5f5;
  padding-bottom: 6rem;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 10rem);
`;

const StContentsWrapper = styled.div`
  width: 128rem;
  margin: 0 auto;
`;

export default MainPage;
