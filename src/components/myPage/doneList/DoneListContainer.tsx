import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import DoneCard from "./DoneCard";
import Pagination from "./Pagination";
import apis from "../../../api/api";

interface DoneCardProps {
  title: string;
  endtime: string;
  startTime: string;
  startDay: string;
  tagetTime: number;
}

function DoneListContainer() {
  const [done, setDone] = useState<Array<DoneCardProps>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageNum, setPageNum] = useState<number>(1);
  // const [Limit] = useState<number>(5)

  useEffect(() => {
    const doneList = async () => {
      setLoading(true);
      const res = await apis.getMyInfoDoneChall(pageNum);

      setDone(res.data.mypageFinishLists);
      setPage(res.data.totalPage);
      setLoading(false);
    };
    doneList();
  }, [pageNum]);

  const paginate = (pageNumber: number) => setPageNum(pageNumber);

  const currentDone = done;

  return (
    <>
      <DoneContainer>
        <TitleBox1>완료한 챌린지</TitleBox1>
        <DoneCard done={currentDone} loading={loading} />
        <Pagination done={currentDone} paginate={paginate} page={page} />
      </DoneContainer>
    </>
  );
}

export default DoneListContainer;

const DoneContainer = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
  width: 128rem;
`;
const TitleBox1 = styled.div`
  width: 128rem;
  display: flex;
  justify-content: flex-start;
  font-size: x-large;
  padding: 5rem 0;
  font-weight: bold;
`;
