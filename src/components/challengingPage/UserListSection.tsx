import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import UserCard from "./userList/UserCard";
import { RoomContext } from "../../api/context/roomContext";
import apis from "../../api/api";

function UserListSection() {
  const { challengeId } = useParams();
  const { state, dispatch } = useContext(RoomContext);
  useQuery("CHALLENGING_PEOPLE", async () => {
    const res = await apis.getParticipantList(Number(challengeId));
    dispatch({ type: "INIT_PEOPLE", userList: res });
  });

  return (
    <StUserListSection>
      {state.people.map((person) => {
        return <UserCard userName={person.nickname} userLevel={person.level} />;
      })}
    </StUserListSection>
  );
}

const StUserListSection = styled.div`
  width: 100%;
  height: 30rem;
`;

export default UserListSection;
