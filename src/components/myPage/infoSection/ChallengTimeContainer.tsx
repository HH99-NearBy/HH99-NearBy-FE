import React from 'react'
import styled from 'styled-components'

function ChallengTimeContainer() {
  return (
    <TimeContainer>
      <TitleBox>
      습관을 위한시간
      </TitleBox>
      <TimeBox>
        190시간 20분
      </TimeBox>
    </TimeContainer>
  )
}

export default ChallengTimeContainer

const TimeContainer = styled.div`
  border: 1px solid blue;
  width: 35rem;
  height: 15rem;
`

const TitleBox = styled.div`
  border: 1px solid black;
  width: 25rem;
  height: 3rem;
  justify-content: center;
  font-size: large;
  font-weight: bold;
  position: relative;
  top: 2rem;
  left: 10.5rem;
`
const TimeBox = styled.div`
  border: 1px solid black;
  width: 41rem;
  height: 5rem;
  justify-content: center;
    position: relative;
    top: 6rem;
    right: 7rem;
    font-size: xx-large;
    color: #6627F5;
`