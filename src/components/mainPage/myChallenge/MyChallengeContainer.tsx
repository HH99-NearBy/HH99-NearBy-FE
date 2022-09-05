import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ChallengeCard from "../ChallengeCard";

function MyChallengeContainer({
  handleToggleModal,
}: {
  handleToggleModal: () => void;
}) {
  const [testArr, setTestArr] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(true);
  const listRef = useRef<HTMLDivElement>(null);
  const flag = useRef<boolean>(false);
  const handleScrolling = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.scrollLeft);
    e.currentTarget.scrollLeft += e.deltaY * 2;
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
      listRef.current.scrollLeft += 10;
      if (listRef.current.scrollLeft > 650) {
        if (!flag.current) {
          flag.current = true;
          setTestArr([...testArr.filter((el, idx) => idx !== 0), testArr[0]]);
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
  }, [isMouseEnter, testArr, flag.current]);

  return (
    <StContentsWrapper>
      <h2>참여한 챌린지</h2>
      <StCardList
        onWheel={handleScrolling}
        onMouseEnter={handleMouseEntering}
        onMouseLeave={handleMouseOut}
        ref={listRef}
      >
        {testArr.map((el, idx) => {
          return (
            <ChallengeCard
              key={`${el} + ${idx}`}
              status="recruit"
              challengeTitle={String(el)}
              handleToggleModal={handleToggleModal}
            />
          );
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

export default MyChallengeContainer;
