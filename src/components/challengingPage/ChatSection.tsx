import React from "react";
import styled from "styled-components";
import ChatList from "./chatSection/ChatList";
import ChatForm from "./chatSection/ChatForm";

function ChatSection() {
  return (
    <StChatSection>
      <ChatList />
      <ChatForm />
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
