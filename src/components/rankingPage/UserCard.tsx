import React from "react";
import styled from "styled-components";
import { RiMedal2Fill } from "react-icons/ri";
import MyChart from "../Chart";
interface UserCardProps {
  userName: string;
  userRanking: string;
  userLevel: string;
  userScore: number;
  userImg: string;
  rankingChart: number[];
}
function UserRankingCard({
  userName,
  userRanking,
  userLevel,
  userScore,
  rankingChart,
  userImg,
}: UserCardProps) {
  return (
    <StCardContainer>
      <div className="rp_user_ranking_wrapper">
        <RiMedal2Fill /> <span>{userRanking}</span>
      </div>
      <div className="rp_user_nickname_wrapper">
        <img src={userImg} alt="프로필" />
        <span className="rp_user_level">{userLevel}</span>
        <span className="rp_user_nickname">{userName}</span>
      </div>
      <div className="rp_user_score_wrapper">{userScore}점</div>
      <div className="rp_user_graph_wrapper">
        <MyChart locate="rankingPage" scores={rankingChart} />
      </div>
    </StCardContainer>
  );
}

const StCardContainer = styled.div`
  width: 100%;
  height: 8rem;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  font-size: 1.8rem;
  .rp_user_ranking_wrapper {
    width: 22.5rem;
    display: flex;
    align-items: center;
    span {
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: baseline;
    }
    svg {
      display: flex;
      align-items: flex-start;
      width: 2rem;
      height: 2rem;
      margin-right: 0.8rem;
    }
  }
  .rp_user_nickname_wrapper {
    width: 37rem;
    display: flex;
    align-items: center;
    img {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      font-size: 1.5rem;
      background-color: red;
    }
    span {
      margin-left: 1rem;
    }
    .rp_user_nickname {
      font-size: 2.1rem;
      letter-spacing: 0.1rem;
    }
  }
  .rp_user_score_wrapper {
    display: flex;
    align-items: center;
    width: 23rem;
  }
`;

export default React.memo(UserRankingCard);
