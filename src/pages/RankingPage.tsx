import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useQuery, useInfiniteQuery, useQueryClient } from "react-query";
import apis from "../api/api";
import MyChart from "../components/Chart";
import { IoTrophy } from "react-icons/io5";
import UserRankingCard from "../components/rankingPage/UserCard";
import RankingList from "../components/rankingPage/RankingList";

interface UserRaking {
  id: number;
  level: string;
  profileImg: string;
  nickname: string;
  rank: string;
  score: number;
  graph: number[];
}

function RankingPage() {
  const queryClient = useQueryClient();
  const [pageNum, setPageNum] = useState<number>(1);
  const [myRanking, setMyRanking] = useState<UserRaking>({
    id: 0,
    profileImg: "",
    nickname: "",
    level: "",
    rank: "",
    score: 0,
    graph: [],
  });
  const [isLastPage, setIsLastPage] = useState(false);
  const [ranking, setRanking] = useState<UserRaking[]>([]);
  const userRanking = async ({ pageParam = 1 }) => {
    const reqRes = await apis.getUserRanking(pageParam);

    if (reqRes.data.length === 0) {
      setIsLastPage(true);
    }
    setRanking([...ranking, ...reqRes.data]);
    setMyRanking({ ...myRanking, ...reqRes.myRank });
    return {
      nextPage: pageParam + 1,
    };
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["USER_RANKING"], userRanking, {
    getNextPageParam: (lastPage: any, pages) => {
      return lastPage.nextPage;
    },
    refetchOnWindowFocus: false,
  });

  const handleAddRanking = () => {
    setPageNum(pageNum + 1);
  };
  useEffect(() => {
    return () => {
      setRanking([]);
      queryClient.resetQueries(["USER_RANKING"], { exact: true });
    };
  }, []);
  return (
    <StContentsContainer
      isLogin={sessionStorage.getItem("accessToken") !== null ? true : false}
    >
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
        {sessionStorage.getItem("accessToken") && (
          <UserRankingCard
            userName={myRanking.nickname}
            userRanking={myRanking.rank}
            userLevel={myRanking.level}
            userScore={myRanking.score}
            userImg={myRanking.profileImg}
            rankingChart={myRanking.graph}
          />
        )}
      </div>
      <RankingList ranking={ranking} />
      {isFetchingNextPage ? "loading,,," : null}
      {!isLastPage ? (
        <StPluBtn
          onClick={() => {
            fetchNextPage();
          }}
        >
          +
        </StPluBtn>
      ) : null}
    </StContentsContainer>
  );
}

const StContentsContainer = styled.div<{ isLogin: boolean }>`
  width: 128rem;
  margin: 0 auto;
  margin-top: 7rem;
  margin-bottom: 10rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  h1 {
    display: flex;
    align-items: center;
    span {
      font-size: 3rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
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
    margin-bottom: ${(props) => (props.isLogin === true ? "4rem" : "0")};
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
const StPluBtn = styled.button`
  width: 5rem;
  height: 5rem;
  border: 0.4rem solid var(--purple-color);
  border-radius: 50%;
  font-size: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: var(--purple-color);
  align-self: center;
  margin-top: 3rem;
  margin-bottom: 6rem;
  cursor: pointer;
  :hover {
    background-color: #f5f5f5;
  }
`;

export default RankingPage;
