import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { useQuery, useQueryClient } from "react-query";
import { AppContext } from "../api/context";
import apis from "../api/api";
import ChallengeCard from "../components/mainPage/ChallengeCard";
import ModalPortal from "../components/mainPage/detailModal/ModalPortal";
import { query } from "express";

interface ChallengeInfo {
  challengeImg: string;
  endTime: string;
  limitPeople: number;
  participatePeople: number;
  startDay: string;
  startTime: string;
  tagetTime: number;
  title: string;
  id: number;
}

function SearchPage() {
  const { searchParam } = useParams();
  const queryClient = useQueryClient();
  const [challengeList, setChallengeList] = useState<ChallengeInfo[]>([]);
  const { state, dispatch } = useContext(AppContext);
  const handleToggleModal = () => {
    dispatch({ type: "TOGGLE_MODAL" });
  };

  useQuery(
    ["SEARCH_CHALLENGE"],
    async () => {
      const res = await apis.searchChallengeList(searchParam, 1);

      setChallengeList([...res.data]);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    return () => {
      setChallengeList([]);

      queryClient.clear();
    };
  }, [searchParam]);

  return (
    <StContentsWrapper>
      <h2>찾으신 챌린지 목록이에요!</h2>
      <StCardList>
        {challengeList.length !== 0
          ? challengeList.map((post, idx) => {
              const now = new Date();
              const createdAt = new Date(`${post.startDay}T${post.startTime}`);
              return (
                <ChallengeCard
                  key={post.id}
                  status={now < createdAt ? "doing" : "done"}
                  handleToggleModal={handleToggleModal}
                  challengeTitle={post.title}
                  limitPeople={post.limitPeople}
                  participatePeople={post.participatePeople}
                  startDay={post.startDay}
                  startTime={post.startTime}
                  targetTime={post.tagetTime}
                  thumbnailImg={post.challengeImg}
                  endTime={post.endTime}
                  challengeId={post.id}
                />
              );
            })
          : null}
      </StCardList>
      {state.modalOpen && (
        <ModalPortal handleToggleModal={handleToggleModal} postId={1} />
      )}
    </StContentsWrapper>
  );
}

const StContentsWrapper = styled.div`
  width: 128rem;
  margin: 0 auto;
  padding-top: 10rem;
  padding-bottom: 10rem;
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

export default SearchPage;
