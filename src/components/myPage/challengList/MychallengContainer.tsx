import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios';
import MychallengCard from './MychallengCard'
import CardPagination from './CardPagination'
import apis from '../../../api/api'

interface CardProps {
  title:string;
  challengeImg:string;
  endTime:string;
  limitPeople:string;
  startDay:string;
  startTime:string;
  tagetTime:number;

}


function MychallengContainer() {

  const [challeng, setChalleng] = useState<Array<CardProps>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const[page, setPage] = useState<number>(1)
  const [pageNum, setPageNum] = useState<number>(1)
  // const [Limit] = useState<number>(4)

  useEffect(() => {
    const CardList = async () => {
      setLoading(true)
      const res = await apis.getMyInfoChall(pageNum)
      setChalleng(res.mypageJoinList)
      setPage(res.totalPage)
      setLoading(false)
    }
    CardList();
  },[pageNum])

  const paginate = (pageNumber:number) => setPageNum(pageNumber)

  // const indexOfLastCard = page * Limit;
  // const indexOfFirstCard = indexOfLastCard - Limit;
  // console.log(challeng)
  // const currentCard = challeng?.slice(indexOfFirstCard,indexOfLastCard)
  const currentCard = challeng


  return (
    <>
    <CardContainer>
      <TitleBox>
        도전중인 챌린지
      </TitleBox>
      <CardContents>
      <MychallengCard challeng={currentCard} loading={loading}/>
      </CardContents>
      <CardPagination totalCard={challeng} paginate={paginate} page={page}/>
    </CardContainer>
    </>
  )
}

export default MychallengContainer

const CardContainer = styled.div`
  margin: 5rem auto;
  width: 130rem;
  justify-content: center;
  margin: 3rem auto;
  border: 2px solid whitesmoke;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`
const CardContents = styled.div`
  margin: 5rem auto;
  width: 130rem;
  justify-content: center;
  margin: 3rem auto;
  display: flex;
  flex-wrap: wrap;
`

const TitleBox = styled.div`
  width: 25rem;
  font-size: x-large;
  margin: 2rem 0;
`
