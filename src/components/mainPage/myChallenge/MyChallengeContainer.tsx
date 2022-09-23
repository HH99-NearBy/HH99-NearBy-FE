import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ChallengeCard from "../ChallengeCard";
import { useQuery } from "react-query";
import apis from "../../../api/api";

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

function MyChallengeContainer({
  handleToggleModal,
}: {
  handleToggleModal: () => void;
}) {
  const [challengeList, setChallengeList] = useState<ChallengeInfo[]>([]);
  useQuery(["MY_CHALLENGE"], async () => {
    const res = await apis.getMyChallengeList();
    setChallengeList(res);
    console.log(res);
  });
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement>(null);
  const flag = useRef<boolean>(false);

  const handleScrolling = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    // console.log(e.currentTarget.clientWidth);
    // console.log(e.currentTarget.scrollWidth);
    // console.log(Math.ceil(target.scrollLeft));

    document.body.classList.add("block_scroll");
    // if (
    //   (target.scrollLeft === 0 && e.deltaY < 0) ||
    //   (target.clientWidth + Math.ceil(target.scrollLeft) ===
    //     target.scrollWidth &&
    //     e.deltaY > 0)
    // ) {
    //   document.body.classList.remove("block_scroll");
    // }

    target.scrollLeft += e.deltaY * 2;
  };
  const handleMouseEntering = () => {
    setIsMouseEnter(true);
    document.body.classList.add("block_scroll");
  };
  const handleMouseOut = () => {
    setIsMouseEnter(false);
    document.body.classList.remove("block_scroll");
  };
  const handleAutoScrolling = (bool: boolean) => {
    if (!bool && listRef.current !== null) {
      listRef.current.scrollLeft += 10;
      if (listRef.current.scrollLeft > 650) {
        if (!flag.current) {
          flag.current = true;
          setChallengeList([
            ...challengeList.filter((el, idx) => idx !== 0),
            challengeList[0],
          ]);
          if (listRef.current !== null) {
            listRef.current.classList.add("static_scroll");
            listRef.current.scrollLeft = 0;
            listRef.current.classList.remove("static_scroll");
          }
          setTimeout(function () {
            flag.current = false;
          }, 300);
        }
      }
    }
  };
  useEffect(() => {
    let interval = setInterval(() => {
      handleAutoScrolling(isMouseEnter);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, [isMouseEnter, flag.current]);
  console.log(challengeList);
  return (
    <StContentsWrapper>
      <h2>참여한 챌린지</h2>
      <StCardList
        onWheel={handleScrolling}
        onMouseEnter={handleMouseEntering}
        onMouseLeave={handleMouseOut}
        ref={listRef}
      >
        {challengeList.map((post, idx) => {
          const now = Date.now();
          const startTime = Date.parse(`${post.startDay}T${post.startTime}`);
          const endTime = Date.parse(`${post.endTime}`);
          if (now < endTime) {
            return (
              <ChallengeCard
                key={post.id}
                status={now < startTime ? "recruit" : "running"}
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
          }
        })}
        {/* <ChallengeCard status="running" />
        <ChallengeCard status="recruit" />
        <ChallengeCard status="recruit" />
        <ChallengeCard status="recruit" /> */}
      </StCardList>
    </StContentsWrapper>
  );
}

const StContentsWrapper = styled.div`
  width: 100vw;
  height: 40.7rem;
  padding-top: 10rem;
  h2 {
    padding-bottom: 5rem;
    font-size: 3.5rem;
  }
`;

const StCardList = styled.div`
  z-index: 1;
  position: absolute;
  left: 0;
  width: 100vw;
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
  column-gap: 4rem;
  row-gap: 4rem;
  scroll-behavior: smooth;
`;

export default React.memo(MyChallengeContainer);
