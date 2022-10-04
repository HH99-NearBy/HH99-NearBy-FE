import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Pagination from './Pagination'
import DoneListContainer from './DoneListContainer'

interface DoneCardProps {
  title : undefined;
  endtime : undefined;
  startTime : undefined;
  tagetTime : undefined;
}


function DoneCard({done,loading}:{done:Array<DoneCardProps>;loading:boolean}) {

  if (loading) {
    return <h2>Loading...</h2>
  }
// const time:Date = new Date(done.tagetTime)


  return (
    <>
       {done && done.map((done:any,i:any) => {
      return(
      <DoneBox key={i}>
          <TitleBox2 >
          {done.title}
          </TitleBox2>
          <Date>
          <img src = "https://ifh.cc/g/Ylpc4J.png"/>{done.endtime}
          <img src = "https://ifh.cc/g/6md8RO.png"/>{done.startTime}
          <img src = "https://ifh.cc/g/bFlJmL.png"/>{done.tagetTime}분
          </Date>  
      </DoneBox>
      )
    } 
      
    )}
    </>
  )
}

export default DoneCard

const DoneBox = styled.div`
  border: 1px solid Gainsboro;
  width: 128rem;
  height: 5rem;
  padding: 3rem 0;
  
`
const TitleBox2 = styled.div`
  margin: 1.5rem 0;
  width: 60rem;
  float: left;
  font-size: medium;
  font-weight: bold;
  position: relative;
    bottom: 3rem;
    padding: 0 2rem;
`

const Date = styled.div`
  width: 30rem;
  float: right;
  margin: 1.5rem 0;
  position: relative;
  bottom: 3rem;

  img {
    width: 2rem;
    position: relative;
    top: 0.5rem;
    margin: 0 1rem;
  }
`

