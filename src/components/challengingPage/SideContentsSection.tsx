import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import webstomp from "webstomp-client";
import SockJs from "sockjs-client";
import { useParams } from "react-router";
import ChatSection from "./ChatSection";
import SummeryInfoSection from "./SummeryInfoSection";
interface ChatType {
  nickName: string;
  chat: string;
}
function SideContentsSection() {
  const stompClient = useRef<any>(null);
  const WSURI = process.env.REACT_APP_BASE_URI + "/ws";
  const { challengeId } = useParams();
  const [chats, setChats] = useState<ChatType[]>([
    { nickName: "강강태훈", chat: "이얍이얍이얍이얍!" },
    { nickName: "누구세용", chat: "누구세용누구세용누구세용" },
  ]);
  useEffect(() => {
    console.log(WSURI);
    let sock = new SockJs(WSURI);
    let subscription: any;
    stompClient.current = webstomp.over(sock);
    stompClient.current.connect(
      { Authorization: sessionStorage.getItem("accessToken") },
      function (payload: any) {
        subscription = stompClient.current.subscribe(
          `/sub/chat/challenge/${challengeId}`,
          function name(frame: any) {
            setChats(JSON.parse(frame.body));
          },
          { Authorization: sessionStorage.getItem("accessToken") }
        );
      }
    );
    return () => {
      stompClient.current.disconnect();
    };
  }, []);
  return (
    <StContentsWrapper>
      <SummeryInfoSection />
      <ChatSection
        chats={chats}
        stompClient={stompClient}
        challengeId={Number(challengeId)}
      />
    </StContentsWrapper>
  );
}

const StContentsWrapper = styled.div`
  width: 64rem;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

export default SideContentsSection;
