import React from 'react'
import styled from 'styled-components'

function ChallengTimeContainer(totalTime:any) {
  return (
    <TimeContainer>
      <TitleBox>
      습관을 위한시간
      </TitleBox>
      <TimeBox>
        {totalTime.totalTime}
      </TimeBox>
    </TimeContainer>
  )
}

export default ChallengTimeContainer

const TimeContainer = styled.div`
  width: 43rem;
  height: 15rem;
  border: 2px solid whitesmoke;
  background-color: white;
`

const TitleBox = styled.div`
  width: 25rem;
  height: 3rem;
  justify-content: center;
  font-size: large;
  font-weight: bold;
  position: relative;
  top: 2rem;
  left: 14rem;
`
const TimeBox = styled.div`
  width: 41rem;
  height: 5rem;
  justify-content: center;
    position: relative;
    top: 6rem;
    right: 7rem;
    font-size: xx-large;
    color: #6627F5;
`