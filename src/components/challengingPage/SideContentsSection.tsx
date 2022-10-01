import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import webstomp from "webstomp-client";
import SockJs from "sockjs-client";
import { useQuery } from "react-query";
import { getChallengeDetail } from "../../api/challengeDetail/api";
import { useParams } from "react-router";
import ChatSection from "./ChatSection";
import SummeryInfoSection from "./SummeryInfoSection";
import { GetModalDetail } from "../../api/challengeDetail/types";
import { RoomContext } from "../../api/context/roomContext";
import apis from "../../api/api";

interface ChatType {
  nickName: string;
  chat: string;
}
function SideContentsSection() {
  const stompClient = useRef<any>(null);
  const WSURI = process.env.REACT_APP_BASE_URI + "/ws";
  const { challengeId } = useParams();
  const { state, dispatch } = useContext(RoomContext);
  const [body, setBody] = useState<GetModalDetail>({
    detailModal: {
      title: "",
      challengeImg: "",
      startDay: "",
      startTime: "",
      targetTime: 0,
      endTime: "",
      limitPeople: 0,
      participatePeople: 0,
      content: "",
      notice: "",
      writer: "",
      level: "",
      challengeTag: [],
      isJoin: true,
    },
    msg: "",
  });
  const req = useQuery(
    "CHALLENGE_DETAIL",
    async () => {
      const res = await getChallengeDetail(Number(challengeId));
      setBody(res);
    },
    {
      retry: 2,
    }
  );
  const getInitUserList = async () => {
    const res = await apis.getParticipantList(Number(challengeId));
    dispatch({ type: "INIT_PEOPLE", userList: res.data });
  };
  console.log(state);
  useEffect(() => {
    getInitUserList();
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
        //if로 받는 message의 type별로 동작을 나눠야함.
        //enter할때 유저 level도 받아와야 사람 추가가 가능함.
        subscription = stompClient.current.subscribe(
          `/sub/chat/room/${challengeId}`,
          function name(frame: any) {
            const res = JSON.parse(frame.body);
            switch (res.type) {
              case "ENTER": {
                dispatch({
                  type: "ADD_PEOPLE",
                  targetPerson: {
                    nickname: res.sender,
                    level: res.level,
                    entryTime: Date.now(),
                  },
                });
                return;
              }
              case "QUIT": {
                dispatch({
                  type: "REMOVE_PEOPLE",
                  targetPerson: {
                    nickname: res.sender,
                    level: "",
                    entryTime: 0,
                  },
                });
                return;
              }
              case "TALK": {
                dispatch({
                  type: "ADD_CHAT",
                  newChat: { nickName: res.sender, chat: res.message },
                });
                return;
              }
            }
          },
          { Authorization: sessionStorage.getItem("accessToken") }
        );
      }
    );
    return () => {
      const nickname = sessionStorage.getItem("userName");
      stompClient.current.send(
        `/pub/chat/message`,
        JSON.stringify({
          type: "QUIT",
          roomId: challengeId,
          sender: nickname,
        }),
        {
          Authorization: sessionStorage.getItem("accessToken"),
        }
      );
      subscription.unsubscribe();
      stompClient.current.disconnect();
    };
  }, []);
  window.onbeforeunload = function () {
    const nickname = sessionStorage.getItem("userName");
    stompClient.current.send(
      `/pub/chat/message`,
      JSON.stringify({
        type: "QUIT",
        roomId: challengeId,
        sender: nickname,
      }),
      {
        Authorization: sessionStorage.getItem("accessToken"),
      }
    );
    stompClient.current.disconnect();
  };
  return (
    <StContentsWrapper>
      <SummeryInfoSection body={body !== null ? body : null} />
      <ChatSection
        chats={state.chat}
        stompClient={stompClient}
        challengeId={Number(challengeId)}
      />
    </StContentsWrapper>
  );
}

const StContentsWrapper = styled.div`
  flex-shrink: 1;
  height: 100%;
  min-height: 101.35rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

export default SideContentsSection;
