import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ChallengeCard from "../ChallengeCard";
import { useQuery } from "react-query";
import apis from "../../../api/api";
import none_notification_icon from "../../../static/none_notification_icon.svg";

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
  Ref,
}: {
  handleToggleModal: () => void;
  Ref: HTMLDivElement | null;
}) {
  const [challengeList, setChallengeList] = useState<ChallengeInfo[]>([]);
  useQuery(["MY_CHALLENGE"], async () => {
    const res = await apis.getMyChallengeList();
    setChallengeList(
      res.filter(
        (post: ChallengeInfo) => Date.now() < Date.parse(`${post.endTime}`)
      )
    );
  });
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement>(null);
  const flag = useRef<boolean>(false);
  const handleScrolling = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      target.scrollLeft += e.deltaY * 1.2;
    },
    [challengeList]
  );

  const handleMouseEntering = () => {
    setIsMouseEnter(true);
    Ref?.classList.add("block_scroll");
  };
  const handleMouseOut = () => {
    setIsMouseEnter(false);
    Ref?.classList.remove("block_scroll");
  };
  const handleAutoScrolling = useCallback(
    (bool: boolean) => {
      if (!bool && listRef.current !== null) {
        listRef.current.scrollLeft += 8;
        if (listRef.current.scrollLeft > 618) {
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
    },
    [challengeList]
  );
  useEffect(() => {
    let interval = setInterval(() => {
      handleAutoScrolling(isMouseEnter);
    }, 60);
    return () => {
      clearInterval(interval);
    };
  }, [isMouseEnter, flag.current, challengeList]);
  useEffect(() => {
    if (listRef.current !== null) {
      if (listRef.current?.childElementCount < 3) {
        listRef.current.id = "is_not_long";
      } else if (listRef.current?.childElementCount >= 3) {
        listRef.current.id = "";
      }
    }

    return () => {
      if (listRef.current !== null) {
        listRef.current.id = "";
      }
    };
  }, [challengeList]);
  return (
    <StContentsWrapper>
      <h2>참여한 챌린지</h2>
      <StCardList
        onWheel={handleScrolling}
        onMouseEnter={handleMouseEntering}
        onMouseLeave={handleMouseOut}
        ref={listRef}
      >
        {challengeList.length === 0 ? (
          <div className="my_challenge_empty_container">
            <img src={none_notification_icon} alt="" />
            <h2 className="empty_my_challenge_notification">
              아직 참여한 챌린지가 없어요!
            </h2>
          </div>
        ) : null}
        {challengeList.map((post, idx) => {
          const now = Date.now();
          const startTime = Date.parse(`${post?.startDay}T${post?.startTime}`);

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
  height: 50rem;
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
  overflow-y: hidden;
  column-gap: 4rem;
  row-gap: 4rem;
  scroll-behavior: smooth;
  .my_challenge_empty_container {
    opacity: 0.5;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5rem;
    .empty_my_challenge_notification {
      color: var(--purple-color);
    }
  }
`;

export default React.memo(MyChallengeContainer);
