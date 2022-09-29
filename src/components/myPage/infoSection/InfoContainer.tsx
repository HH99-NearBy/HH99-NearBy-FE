import React from 'react'
import styled from 'styled-components';
import USEINFO from "../../../static/Group 1051.png";

function InfoContainer() {

  return (
   <MainImg  src ={USEINFO}/>
  )
}


const MainImg = styled.img`
    width: 128rem;
    margin:10rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default InfoContainer
