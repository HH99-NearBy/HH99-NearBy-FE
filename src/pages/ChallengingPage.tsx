import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import { BsFillPersonFill } from "react-icons/bs";
import VideoSection from "../components/challengingPage/VideoSection";
import SideContentsSection from "../components/challengingPage/SideContentsSection";
import { RoomContextProvider } from "../api/context/roomContext";

function ChallengingPage() {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const handleLeaveRoom = () => {
    navigate("/");
  };
  useEffect(() => {
    document.querySelector("header")?.classList.add("hidden");
    return () => {
      document.querySelector("header")?.classList.remove("hidden");
    };
  });
  //웹소켓 연결 여기서
  //채팅은 ChatSection에서 subscribe하고
  //인원수는 어떡해야하나?
  return (
    <StPageLayout>
      <VideoSection />
      <RoomContextProvider>
        <SideContentsSection />
      </RoomContextProvider>
    </StPageLayout>
  );
}

const StPageLayout = styled.div`
  width: 100vw;
  min-width: 160rem;
  height: 100vh;
  display: flex;
  align-items: flex-start;
`;

const StSideSection = styled.div`
  width: 64rem;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;
export default ChallengingPage;
