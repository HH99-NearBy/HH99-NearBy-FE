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
    dispatch({ type: "TOGGLE_MODAL" });
  };

  const handleToScrollTop = () => {
    mainContainerRef.current?.scrollTo(0, 0);
  };
  useEffect(() => {
    const userName = sessionStorage.getItem("userName");
    if (userName !== null) {
      dispatch({ type: "SYNC_USER_DATA", payload: -1, userName });
    }
  }, []);
  return (
    <StMainContents ref={mainContainerRef}>
      <StContentsWrapper>
        {state.userName ? (
          <MyChallengeContainer
            handleToggleModal={handleToggleModal}
            Ref={mainContainerRef.current}
          />
        ) : null}

        <RecruitContainer handleToggleModal={handleToggleModal} />
      </StContentsWrapper>
      {state.modalOpen && (
        <ModalPortal handleToggleModal={handleToggleModal} postId={1} />
      )}

      <StTopBtn onClick={handleToScrollTop}>↑</StTopBtn>
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

const StTopBtn = styled.button`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 5rem;
  bottom: 5rem;
  width: 5rem;
  height: 5rem;
  border: 0.2rem solid var(--purple-color);
  color: var(--purple-color);
  background-color: white;
  border-radius: 50%;
  font-size: 3.5rem;
  :hover {
    background-color: var(--purple-color);
    color: white;
  }
`;

export default MainPage;
