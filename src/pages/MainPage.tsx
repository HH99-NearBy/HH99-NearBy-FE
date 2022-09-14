import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import MyChallengeContainer from "../components/mainPage/myChallenge/MyChallengeContainer";
import RecruitContainer from "../components/mainPage/recruit/RecruitContainer";
import ModalPortal from "../components/mainPage/detailModal/ModalPortal";
import { AppContext } from "../api/context";
import { useQuery } from "react-query";
import apis from "../api/api";

function MainPage() {
  const [modalShow, setModalShow] = useState<boolean>(false);
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
  return (
    <StMainContents>
      <StContentsWrapper>
        {state.userName ? (
          <MyChallengeContainer handleToggleModal={handleToggleModal} />
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
  background-color: #f5f5f5;
  overflow-y: scroll;
  overflow-x: hidden;
  min-height: 100vh;
`;

const StContentsWrapper = styled.div`
  width: 128rem;
  margin: 0 auto;
`;

export default MainPage;
