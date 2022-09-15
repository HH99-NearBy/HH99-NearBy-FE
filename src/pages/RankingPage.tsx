import React from "react";
import styled from "styled-components";
import MyChart from "../components/Chart";
import { IoTrophy } from "react-icons/io5";
import UserRankingCard from "../components/rankingPage/UserCard";
import RankingList from "../components/rankingPage/RankingList";

function RankingPage() {
  return (
    <StContentsContainer>
      <h1>
        <span>쓱-관왕</span>
        <IoTrophy />
      </h1>
      <div className="top_ranking_content">
        <StContentsHeader>
          <span>순위</span>
          <span>닉네임</span>
          <span>스코어</span>
          <span>주간 챌린지 그래프</span>
        </StContentsHeader>
        <UserRankingCard
          userName="강무시깽이"
          userRanking="42"
          userLevel="Lv.42"
          userScore="42"
          userImg="https://publy.imgix.net/images/2018/02/28/1519811155_f99450b74bbc61046cf55389501cd124.jpeg?fm=pjpg"
          rankingChart={[10, 30, 45, 38, 44, 50, 60]}
        />
      </div>
      <RankingList />
    </StContentsContainer>
  );
}

const StContentsContainer = styled.div`
  width: 128rem;
  margin: 0 auto;
  margin-top: 7rem;
  min-height: 100%;

  h1 {
    display: flex;
    align-items: center;
    span {
      font-size: 3rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: baseline;
    }

    svg {
      display: flex;
      align-items: flex-start;
      width: 3.44rem;
      height: 3.44rem;
    }
  }

  .top_ranking_content {
    margin-top: 2rem;
    margin-bottom: 4rem;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0.6rem 1rem;
  }
`;
const StContentsHeader = styled.div`
  width: 100%;
  height: 5rem;
  background-color: var(--purple-color);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  span {
    font-size: 1.8rem;
    letter-spacing: 0.1rem;
    :nth-of-type(1) {
      width: 22.5rem;
    }
    :nth-of-type(2) {
      width: 37rem;
    }
    :nth-of-type(3) {
      width: 23rem;
    }
  }
`;

export default RankingPage;
