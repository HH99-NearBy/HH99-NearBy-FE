import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import ChallengTimeContainer from './ChallengTimeContainer'
import TierGraphContainer from './TierGraphContainer'
import UserInfoContainer from './UserInfoContainer'
import MyRank from './MyRank'
import axios from 'axios'
import apis from '../../../api/api'

interface infoData {
  nickname : undefined;
  email : undefined;
  profileImg:undefined;
  level:undefined;
  remainingTime:undefined;
  totalTime:any;
  rank:any;
  graph:any;
}



function InfoWrapper() {
 const [info , setInfo] = useState<infoData>()

 const getData = async () => {
  const data = await apis.getMyInfo();
  
  setInfo(data)
 }
 

 useEffect(() => {
  getData();
 },[])



  return (
    <InfoContainer>
      <MyTitle>
      마이페이지
      </MyTitle>
      <div>
      <UserInfoContainer nickname={info?.nickname} email={info?.email} profileImg={info?.profileImg} level={info?.level}  remainingTime={info?.remainingTime}/>
      <InfoBox>
        <MyRank rank={info?.rank}/>
        <ChallengTimeContainer totalTime={info?.totalTime}/>
        <TierGraphContainer graph={info?.graph}/>
      </InfoBox>
      </div>
    </InfoContainer>
    
  )
}

export default InfoWrapper

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  width: 128rem;

  div {
    display: flex;
  }
`

const InfoBox = styled.div`
  flex-direction: column;
`

const MyTitle = styled.div`
  width: 25rem;
  height: 4rem;
  position: relative;
  top: 10rem;
  font-size: x-large;
  font-weight: bold;

`


