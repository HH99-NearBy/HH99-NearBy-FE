import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import apis from "../../api/api";
import UserRankingCard from "./UserCard";

interface UserRaking {
  id: number;
  level: string;
  profileImg: string;
  nickname: string;
  rank: string;
  score: number;
  graph: number[];
}

function RankingList({ ranking }: { ranking: UserRaking[] }) {
  return (
    <StListContainer>
      {ranking.map((rank, idx) => {
        return (
          <UserRankingCard
            userName={rank.nickname}
            userRanking={`${idx + 1}등`}
            userLevel={rank.level}
            userScore={rank.score}
            userImg={rank.profileImg}
            rankingChart={rank.graph}
          />
        );
      })}
    </StListContainer>
  );
}

const StListContainer = styled.div`
  width: 100%;
  overflow-y: hidden;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0.6rem 1rem;
  background-color: #e1e1e1;
  div {
    margin-top: 0.1rem;
    :nth-of-type(1) {
      margin-top: 0;
    }
  }
`;

export default RankingList;
