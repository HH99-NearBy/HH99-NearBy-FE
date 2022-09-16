import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import webstomp from "webstomp-client";
import SockJs from "sockjs-client";
import { useParams } from "react-router";
import ChatSection from "./ChatSection";
import SummeryInfoSection from "./SummeryInfoSection";
import { RoomContext } from "../../api/context/roomContext";

interface ChatType {
  nickName: string;
  chat: string;
}
function SideContentsSection() {
  const stompClient = useRef<any>(null);
  const WSURI = process.env.REACT_APP_BASE_URI + "/ws";
  const { challengeId } = useParams();
  const { state, dispatch } = useContext(RoomContext);
  console.log(state);
  useEffect(() => {
    console.log(WSURI);
    let sock = new SockJs(WSURI);
    let subscription: any;
    stompClient.current = webstomp.over(sock);
    stompClient.current.connect(
      { Authorization: sessionStorage.getItem("accessToken") },
      function (payload: any) {
        stompClient.current.send(
          `/pub/chat/message`,
          JSON.stringify({
            type: "ENTER",
            roomId: challengeId,
            sender: sessionStorage.getItem("userName"),
            sessionId: stompClient.current.ws._transport.url.split("/").at(-2),
          }),
          {
            Authorization: sessionStorage.getItem("accessToken"),
          }
        );

        subscription = stompClient.current.subscribe(
          `/sub/chat/room/${challengeId}`,
          function name(frame: any) {
            console.log("sub sucessfully");
            console.log(frame);
            const res = JSON.parse(frame.body);
            dispatch({
              type: "ADD_CHAT",
              newChat: { nickName: res.sender, chat: res.message },
            });
          },
          { Authorization: sessionStorage.getItem("accessToken") }
        );
      }
    );
    return () => {
      stompClient.current.send(
        `/pub/chat/message`,
        JSON.stringify({
          type: "QUIT",
          roomId: challengeId,
          sender: sessionStorage.getItem("userName"),
        }),
        {
          Authorization: sessionStorage.getItem("accessToken"),
        }
      );
      subscription.unsubscribe();
      stompClient.current.disconnect();
    };
  }, []);
  return (
    <StContentsWrapper>
      <SummeryInfoSection />
      <ChatSection
        chats={state.chat}
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
