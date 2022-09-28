import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Pagination from './Pagination'
import DoneListContainer from './DoneListContainer'

interface DoneCardProps {
  title : string;
  endtime : string;
  startTime : string;
  tagetTime : string;
}


function DoneCard({done,loading}:{done:Array<DoneCardProps>;loading:boolean}) {

  if (loading) {
    return <h2>Loading...</h2>
  }


  return (
    <>
       {done && done.map((done:any) => {
      return(
      <DoneBox key={done.id}>
          <TitleBox2 >
          {done.title}
          </TitleBox2>
          <Date>
          <img src = "https://ifh.cc/g/Ylpc4J.png"/>{done.endtime}
          <img src = "https://ifh.cc/g/6md8RO.png"/>{done.startTime}
          <img src = "https://ifh.cc/g/bFlJmL.png"/>{done.tagetTime}
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
  width: 100rem;
  height: 5rem;
  
`
const TitleBox2 = styled.div`
  margin: 1.5rem 0;
  width: 60rem;
  float: left;
  font-size: medium;
`

const Date = styled.div`
  width: 21rem;
  float: right;
  margin: 1.5rem 0;
  img {
    width: 2rem;
    position: relative;
    top: 0.5rem;
  }
`

