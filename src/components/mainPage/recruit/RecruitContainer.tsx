import React, { useState, useContext } from "react";
import styled from "styled-components";
import ChallengeCard from "../ChallengeCard";
import { AppContext } from "../../../api/context";
import { useQuery } from "react-query";
import apis from "../../../api/api";

function RecruitContainer({
  handleToggleModal,
}: {
  handleToggleModal: () => void;
}) {
  const [challengeList, setChallengeList] = useState([]);
  const req = useQuery("ALL_CHALLENGE", async () => {
    const res = await apis.getFUllChallengeList(1, 11);
    setChallengeList(res);
  });
  return (
    <StContentsWrapper>
      <h2>쓱-하는 챌린지</h2>
      <StCardList>
        {challengeList.map((post) => {
          return (
            <ChallengeCard
              status="done"
              handleToggleModal={handleToggleModal}
            />
          );
        })}
        {/* <ChallengeCard status="doing" handleToggleModal={handleToggleModal} />
        <ChallengeCard status="done" handleToggleModal={handleToggleModal} />
        <ChallengeCard status="doing" handleToggleModal={handleToggleModal} />
        <ChallengeCard status="done" handleToggleModal={handleToggleModal} />
        <ChallengeCard status="done" handleToggleModal={handleToggleModal} /> */}
      </StCardList>
    </StContentsWrapper>
  );
}

const StContentsWrapper = styled.div`
  width: 100%;
  padding-top: 10rem;
  h2 {
    padding-bottom: 5rem;
    font-size: 3.5rem;
  }
`;

const StCardList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 4rem;
  row-gap: 4rem;
`;

export default RecruitContainer;
