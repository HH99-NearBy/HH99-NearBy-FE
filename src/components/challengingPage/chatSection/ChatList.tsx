import React from "react";
import styled from "styled-components";
import ChatCard from "./ChatCard";

interface ChatType {
  nickName: string;
  chat: string;
}

function ChatList({ chats }: { chats: ChatType[] }) {
  return (
    <StChatListContainer>
      {chats.map((chat) => {
        return (
          <ChatCard
            key={`${chat.nickName}${chat.chat}`}
            author={
              chat.nickName === sessionStorage.getItem("userName")
                ? "me"
                : "friend"
            }
            nickName={chat.nickName}
            chat={chat.chat}
          />
        );
      })}
    </StChatListContainer>
  );
}

const StChatListContainer = styled.div`
  width: 100%;
  height: 56.5rem;
  flex-grow: 1;
  background-color: #f5f5f5;
  display: flex;
  padding: 1rem 2rem;
  flex-direction: column;
  overflow-y: auto;
`;

export default ChatList;
