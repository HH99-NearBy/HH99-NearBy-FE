import React from 'react'
import styled from 'styled-components'

function MyRank() {
  return (
    <RankContainer>
      <TitleBox>
      쓱-관왕
      </TitleBox>
      <RankBox>
        210990등
      </RankBox>
    </RankContainer>
  )
}

export default MyRank

const RankContainer = styled.div`
  width: 35rem;
  height: 15rem;
  position: relative;
  left: 35rem;
  top: 15rem;
  border: 2px solid whitesmoke;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
`

const TitleBox = styled.div`
  width: 25rem;
  height: 3rem;
  justify-content: center;
  font-size: large;
  font-weight: bold;
  position: relative;
  top: 2rem;
  left: 10.5rem;
  padding-top: 0.5rem;
`
const RankBox = styled.div`
  width: 41rem;
  height: 5rem;
  justify-content: center;
    position: relative;
    top: 6rem;
    right: 7rem;
    font-size: xx-large;
    color: #6627F5;
    padding-top: 0.5rem;
`
