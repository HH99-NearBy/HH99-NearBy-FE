import React,{useState,useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import DoneCard from "./DoneCard";
import Pagination from "./Pagination";
import apis from '../../../api/api'

interface DoneCardProps {
  title : undefined;
  endtime : undefined;
  startTime : undefined;
  tagetTime : undefined;
}



function DoneListContainer() {
  const [done, setDone] = useState<Array<DoneCardProps>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [pageNum, setPageNum] = useState<number>(1)
  // const [Limit] = useState<number>(5)

  

  useEffect(() => {

    const doneList = async () => {
      setLoading(true)
      const res = await apis.getMyInfoDoneChall(pageNum)
      setDone(res.mypageFinishLists)
      setPage(res.totalPage)
      setLoading(false)
    }
   
    // fetch('/data/done.json')
    // .then(res => res.json())
    // .then(res => {
    //   setDone(res)
    // })
    doneList();
  },[pageNum])
  

  const paginate = (pageNumber:number) => setPageNum(pageNumber)

  // const indexOfLastDone = page * Limit;
  // const indexOfFirstDone = indexOfLastDone - Limit;
  // const currentDone = done?.slice(indexOfFirstDone,indexOfLastDone);
  const currentDone = done

  // console.log(Limit)

 
  return (
    <>
    <DoneContainer>
      <TitleBox1>
      완료한 챌린지
      </TitleBox1>
      <DoneCard done={currentDone} loading={loading}/>
      <Pagination  done={currentDone} paginate={paginate} page={page}/>
    </DoneContainer>
    
    </>
  );
}

export default DoneListContainer;

const DoneContainer = styled.div`
  width: 100rem;
  display: flex;
  margin: 10rem auto;
  justify-content: center;
  flex-direction: column;
  box-shadow: grey 1px 1px 10px;
`
const TitleBox1 = styled.div`
  width: 12rem;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  font-size: large;
`
