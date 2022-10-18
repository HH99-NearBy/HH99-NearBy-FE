import React from "react";
import styled from "styled-components";
import ChatList from "./chatSection/ChatList";
import ChatForm from "./chatSection/ChatForm";
interface ChatType {
  nickName: string;
  chat: string;
}
function ChatSection({
  chats,
  stompClient,
  challengeId,
  Ref,
}: {
  chats: ChatType[];
  stompClient: React.MutableRefObject<any>;
  challengeId: number;
  Ref: React.MutableRefObject<HTMLDivElement | null>;
}) {
  return (
    <StChatSection>
      <ChatList chats={chats} Ref={Ref} />
      <ChatForm stompClient={stompClient} challengeId={challengeId} />
    </StChatSection>
  );
}

const StChatSection = styled.div`
  width: 100%;
  min-height: 60.5rem;
  flex-grow: 1;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
`;

export default ChatSection;
