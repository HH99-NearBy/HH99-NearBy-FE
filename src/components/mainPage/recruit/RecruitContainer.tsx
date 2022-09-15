import React, { useState, useContext } from "react";
import styled from "styled-components";
import ChallengeCard from "../ChallengeCard";
import { AppContext } from "../../../api/context";
import { useQuery } from "react-query";
import apis from "../../../api/api";

interface ChallengeInfo {
  challengeImg: string;
  endTime: string;
  limitPeople: number;
  startDay: string;
  startTime: string;
  targetTime: number;
  title: string;
}

function RecruitContainer({
  handleToggleModal,
}: {
  handleToggleModal: () => void;
}) {
  const [challengeList, setChallengeList] = useState<ChallengeInfo[]>([]);
  const req = useQuery("ALL_CHALLENGE", async () => {
    const res = await apis.getFUllChallengeList(1, 11);
    setChallengeList(res);
  });
  console.log(challengeList);

  return (
    <StContentsWrapper>
      <h2>쓱-하는 챌린지</h2>
      <StCardList>
        {challengeList.length !== 0
          ? challengeList.map((post) => {
              const now = new Date();
              const createdAt = new Date(`${post.startDay}T${post.startTime}`);
              return (
                <ChallengeCard
                  status={now < createdAt ? "doing" : "done"}
                  handleToggleModal={handleToggleModal}
                  challengeTitle={post.title}
                  limitPeople={post.limitPeople}
                  startDay={post.startDay}
                  startTime={post.startTime}
                  targetTime={post.targetTime}
                  thumbnailImg={post.challengeImg}
                  endTime={post.endTime}
                />
              );
            })
          : null}
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
