import React from 'react'
import styled from 'styled-components'

function DoneCard() {

  return (
    <>
    <DoneBox>
      <TitleBox>
      진행중인 잴린지 제목입니다.
      </TitleBox>
      <Date>
      <img src = "https://ifh.cc/g/Ylpc4J.png"/>2022-10-1
      <img src = "https://ifh.cc/g/6md8RO.png"/>오전 09:20
      <img src = "https://ifh.cc/g/bFlJmL.png"/>240 분
      </Date>
    </DoneBox>
    </>
  )
}

export default DoneCard

const DoneBox = styled.div`
  border: 1px solid Gainsboro;
  width: 100rem;
  height: 5rem;
  
`
const TitleBox = styled.div`
  border: 1px solid red;
  margin: 1.5rem 0;
  width: 60rem;
  float: left;
  font-size: medium;
`

const Date = styled.div`
  border:  1px solid red;
  width: 21rem;
  float: right;
  margin: 1.5rem 0;
  img {
    width: 2rem;
    position: relative;
    top: 0.5rem;
  }
`

