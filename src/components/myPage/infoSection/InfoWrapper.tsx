import React from 'react'
import styled from 'styled-components'
import ChallengTimeContainer from './ChallengTimeContainer'
import TierGraphContainer from './TierGraphContainer'
import UserInfoContainer from './UserInfoContainer'
import MyRank from './MyRank'

function InfoWrapper() {
  return (
    <InfoContainer>
      <MyTitle>
      마이페이지
      </MyTitle>
      <div>
      <UserInfoContainer/>
      <InfoBox>
        <MyRank/>
        <ChallengTimeContainer/>
        <TierGraphContainer/>
      </InfoBox>
      </div>
    </InfoContainer>
    
  )
}

export default InfoWrapper

const InfoContainer = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  width: 100rem;
  margin: 0 auto;
  justify-content: center;
  div {
    display: flex;
  }
`

const InfoBox = styled.div`
  flex-direction: column;
`

const MyTitle = styled.div`
  border: 1px solid orange;
  width: 25rem;
  height: 4rem;
  position: relative;
  top: 10rem;
  font-size: x-large;

`


