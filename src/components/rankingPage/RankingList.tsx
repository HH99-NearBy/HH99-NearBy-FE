import React from "react";
import styled from "styled-components";
import UserRankingCard from "./UserCard";

function RankingList() {
  return (
    <StListContainer>
      <UserRankingCard
        userName="강무시깽이"
        userRanking="42"
        userLevel="Lv.42"
        userScore="42"
        userImg="https://publy.imgix.net/images/2018/02/28/1519811155_f99450b74bbc61046cf55389501cd124.jpeg?fm=pjpg"
        rankingChart={[10, 30, 45, 38, 44, 50, 60]}
      />
      <UserRankingCard
        userName="강무시깽이"
        userRanking="42"
        userLevel="Lv.42"
        userScore="42"
        userImg="https://publy.imgix.net/images/2018/02/28/1519811155_f99450b74bbc61046cf55389501cd124.jpeg?fm=pjpg"
        rankingChart={[10, 30, 45, 38, 44, 50, 60]}
      />
      <UserRankingCard
        userName="강무시깽이"
        userRanking="42"
        userLevel="Lv.42"
        userScore="42"
        userImg="https://publy.imgix.net/images/2018/02/28/1519811155_f99450b74bbc61046cf55389501cd124.jpeg?fm=pjpg"
        rankingChart={[10, 30, 45, 38, 44, 50, 60]}
      />
      <UserRankingCard
        userName="강무시깽이"
        userRanking="42"
        userLevel="Lv.42"
        userScore="42"
        userImg="https://publy.imgix.net/images/2018/02/28/1519811155_f99450b74bbc61046cf55389501cd124.jpeg?fm=pjpg"
        rankingChart={[10, 30, 45, 38, 44, 50, 60]}
      />
      <UserRankingCard
        userName="강무시깽이"
        userRanking="42"
        userLevel="Lv.42"
        userScore="42"
        userImg="https://publy.imgix.net/images/2018/02/28/1519811155_f99450b74bbc61046cf55389501cd124.jpeg?fm=pjpg"
        rankingChart={[10, 30, 45, 38, 44, 50, 60]}
      />
      <UserRankingCard
        userName="강무시깽이"
        userRanking="42"
        userLevel="Lv.42"
        userScore="42"
        userImg="https://publy.imgix.net/images/2018/02/28/1519811155_f99450b74bbc61046cf55389501cd124.jpeg?fm=pjpg"
        rankingChart={[10, 30, 45, 38, 44, 50, 60]}
      />
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
