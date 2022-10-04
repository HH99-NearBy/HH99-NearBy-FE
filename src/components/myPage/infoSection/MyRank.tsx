import React from 'react'
import styled from 'styled-components'

function MyRank(rank:any) {
  return (
    <RankContainer>
      <TitleBox>
      쓱-관왕
      </TitleBox>
      <RankBox>
        {rank.rank}
      </RankBox>
    </RankContainer>
  )
}

export default MyRank

const RankContainer = styled.div`
  width: 45rem;
  height: 15rem;
  position: relative;
  left: 43rem;
  top: 15rem;
  background-color: white;
  border: 2px solid whitesmoke;
    
`

const TitleBox = styled.div`
  width: 25rem;
  height: 3rem;
  justify-content: center;
  font-size: large;
  font-weight: bold;
  position: relative;
  top: 2rem;
  left: 13rem;
  padding-top: 0.5rem;
`
const RankBox = styled.div`
  width: 41rem;
  height: 5rem;
  justify-content: center;
    position: relative;
    top: 6rem;
    right: 9rem;
    font-size: xx-large;
    color: #6627F5;
    padding-top: 0.5rem;
`
