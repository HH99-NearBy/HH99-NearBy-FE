import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "react-query";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { GetModalDetail } from "../api/challengeDetail/types";
import { BsFillPersonFill } from "react-icons/bs";
import VideoSection from "../components/challengingPage/VideoSection";
import SideContentsSection from "../components/challengingPage/SideContentsSection";
import { RoomContextProvider } from "../api/context/roomContext";
import { getChallengeDetail } from "../api/challengeDetail/api";

function ChallengingPage() {
  const fullScreenHandler = useFullScreenHandle();
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState<GetModalDetail | null>(null);

  useQuery(
    ["CHALLENGE_DETAIL"],
    async () => {
      const res = await getChallengeDetail(Number(challengeId));
      console.log(res);
      setInfo(res);
    },
    {
      retry: 2,
    }
  );
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      if (info?.detailModal.endTime !== undefined) {
        const end = Date.parse(info.detailModal.endTime);
        if (now > end) {
          navigate("/");
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });
  useEffect(() => {
    fullScreenHandler.enter();
    return () => {
      fullScreenHandler.exit();
    };
  }, []);
  //웹소켓 연결 여기서
  //채팅은 ChatSection에서 subscribe하고
  //인원수는 어떡해야하나?
  const handleFullScreen = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e);
  };
  console.log(info);
  return (
    <FullScreen handle={fullScreenHandler}>
      <StPageLayout onKeyDown={handleFullScreen}>
        <VideoSection />
        <RoomContextProvider>
          <SideContentsSection />
        </RoomContextProvider>
      </StPageLayout>
    </FullScreen>
  );
}

const StPageLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  min-width: 160rem;
  height: 100vh;
  display: flex;
  align-items: flex-start;
`;

export default ChallengingPage;
