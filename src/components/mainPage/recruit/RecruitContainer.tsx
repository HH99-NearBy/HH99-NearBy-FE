import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useInfiniteQuery, QueryFunctionContext } from "react-query";
import styled from "styled-components";
import ChallengeCard from "../ChallengeCard";
import { AppContext } from "../../../api/context";
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

interface IntersectionObserver {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}

type IntersectHandler = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver
) => void;

const useIntersect = (
  onIntersect: IntersectHandler,
  options?: IntersectionObserverInit
) => {
  const ref = useRef<HTMLDivElement>(null);
  const callbackFunc = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect]
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callbackFunc, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options, callbackFunc]);

  return ref;
};

//

function RecruitContainer({
  handleToggleModal,
}: {
  handleToggleModal: () => void;
}) {
  const [challengeList, setChallengeList] = useState<ChallengeInfo[]>([]);
  const [pageNum, setPageNum] = useState<number>(0);
  const getChallengeList = useCallback(async () => {
    const reqRes = await apis.getFUllChallengeList(pageNum, 10);
    console.log(reqRes);
    setChallengeList([...challengeList, ...reqRes.data]);
    setPageNum(reqRes.data.at(-1).id);
  }, [pageNum, challengeList]);
  // const { canFetchMore, isLoading, error, data, fetchMore } = useInfiniteQuery<
  //   { items: any; page: number },
  //   [string, { page: number }],
  //   number | boolean,
  //   Error
  // >(
  //   ["ALL_CHALLENGE", { pageNum: 1 }],
  //   async () => {
  //     return await apis.getFUllChallengeList(pageNum, pageNum === 1 ? 11 : 10);
  //   },
  //   {
  //     getFetchMore: (lastPage, allPages) => {
  //       let morePagesExist = true;
  //       if (lastPage && lastPage.items.result) {
  //         morePagesExist = lastPage.items.result !== null;
  //       }
  //     },
  //   }
  // );
  // const [challengeList, setChallengeList] = useState<ChallengeInfo[]>([]);
  const observeTarget = useRef<HTMLDivElement | null>(null);
  const req = useQuery(["ALL_CHALLENGE"], async () => {
    const res = await apis.getFUllChallengeList(0, 11);
    console.log(res);
    setChallengeList(res.data);
    setPageNum(res.data.at(-1).id);
  });
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      console.log(entries[0]);
      if (entries[0].isIntersecting && pageNum !== 0) {
        getChallengeList();
      }
    });
    if (observeTarget.current !== null) {
      observer.observe(observeTarget.current);
    }
    return () => {
      if (observeTarget.current !== null) {
        observer.unobserve(observeTarget.current);
      }
    };
  }, [observeTarget, challengeList.length]);
  console.log(pageNum);
  return (
    <StContentsWrapper>
      <h2>쓱-하는 챌린지</h2>
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
      <StObserveTarget ref={observeTarget} />
    </StContentsWrapper>
  );
}

const StContentsWrapper = styled.div`
  width: 100%;
  padding-top: 10rem;
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

const StObserveTarget = styled.div`
  height: 1px;
`;

export default RecruitContainer;
