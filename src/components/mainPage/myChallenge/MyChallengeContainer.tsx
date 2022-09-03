import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ChallengeCard from "../ChallengeCard";

function MyChallengeContainer() {
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(true);
  const listRef = useRef<HTMLDivElement>(null);
  const handleScrolling = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.scrollLeft);
    e.currentTarget.scrollLeft += e.deltaY;
  };
  const handleMouseEntering = () => {
    setIsMouseEnter(false);
    document.body.classList.add("block_scroll");
  };
  const handleMouseOut = () => {
    setIsMouseEnter(true);
    document.body.classList.remove("block_scroll");
  };
  const handleAutoScrolling = (bool: boolean) => {
    if (bool && listRef.current !== null) {
      listRef.current.scrollLeft += 13;
    }
  };
  useEffect(() => {
    let interval = setInterval(() => {
      handleAutoScrolling(isMouseEnter);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [isMouseEnter]);
  return (
    <StContentsWrapper>
      <h2>참여한 챌린지</h2>
      <StCardList
        onWheel={handleScrolling}
        onMouseEnter={handleMouseEntering}
        onMouseLeave={handleMouseOut}
        ref={listRef}
      >
        <ChallengeCard status="running" />
        <ChallengeCard status="recruit" />
        <ChallengeCard status="recruit" />
        <ChallengeCard status="recruit" />
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
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
  column-gap: 4rem;
  row-gap: 4rem;
`;

export default MyChallengeContainer;
