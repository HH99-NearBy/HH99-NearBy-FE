import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import { useQuery, useQueryClient } from "react-query";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { toast } from "react-toastify";
import { GetModalDetail } from "../api/challengeDetail/types";
import { BsFillPersonFill } from "react-icons/bs";
import VideoSection from "../components/challengingPage/VideoSection";
import SideContentsSection from "../components/challengingPage/SideContentsSection";
import { RoomContextProvider } from "../api/context/roomContext";
import { getChallengeDetail } from "../api/challengeDetail/api";

function ChallengingPage() {
  const queryClient = useQueryClient();
  const fullScreenHandler = useFullScreenHandle();
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState<GetModalDetail | null>(null);

  useQuery(
    ["CHALLENGING_DETAIL"],
    async () => {
      const res = await getChallengeDetail(Number(challengeId));

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
      queryClient.clear();
    };
  }, []);
  return (
    <FullScreen handle={fullScreenHandler}>
      <StPageLayout>
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
