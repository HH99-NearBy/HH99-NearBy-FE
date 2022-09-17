import React,{useState,useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import DoneCard from "./DoneCard";
import Pagination from "./Pagination";

interface DoneCardProps {
  id : string;
  title : string;
  day : string;
  date : string;
  time : string;
}



function DoneListContainer() {
  const [done, setDone] = useState<Array<DoneCardProps>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [Limit] = useState<number>(3)

  

  useEffect(() => {

    const doneList = async () => {
      setLoading(true)
      const res = await axios.get('/data/done.json')
      setDone(res.data)
      setLoading(false)
      console.log(res)
    }
   
    // fetch('/data/done.json')
    // .then(res => res.json())
    // .then(res => {
    //   setDone(res)
    // })
    doneList();
  },[])
  console.log(done)

  const paginate = (pageNumber:number) => setPage(pageNumber)

  const indexOfLastDone = page * Limit;
  const indexOfFirstDone = indexOfLastDone - Limit;
  const currentDone = done.slice(indexOfFirstDone,indexOfLastDone);
  console.log(currentDone)
  console.log(Limit)
  console.log(done.length)
  console.log(page)
 
  return (
    <>
    <DoneContainer>
      <TitleBox1>
      완료한 챌린지
      </TitleBox1>
      <DoneCard done={currentDone} loading={loading}/>
      <Pagination Limit={Limit} totalDone={done.length} paginate={paginate}/>
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
