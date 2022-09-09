import React from "react";
import styled from "styled-components";
import UserCard from "./userList/UserCard";

function UserListSection() {
  return (
    <StUserListSection>
      <UserCard userName="강태훈" userLevel="Lv.23" />
      <UserCard userName="강태훈" userLevel="Lv.23" />
      <UserCard userName="강태훈" userLevel="Lv.23" />
      <UserCard userName="강태훈" userLevel="Lv.23" />
      <UserCard userName="강태훈" userLevel="Lv.23" />
    </StUserListSection>
  );
}

const StUserListSection = styled.div`
  width: 100%;
  height: 30rem;
`;

export default UserListSection;
