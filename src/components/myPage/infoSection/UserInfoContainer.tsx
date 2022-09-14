import React from 'react';
import styled from 'styled-components';

function UserInfoContainer() {
  return (
    <UserContainer>
      <UserBox>
      <Nickname>
      닉네임 들어갈곳
      </Nickname>
      <Email>
          dydwns9310@gmail.com
      </Email>
      <UserImage>
        <img src = "https://ifh.cc/g/RCtOo7.png"/>
      </UserImage>
      <LevelBox>
        <div className="level">
          Lv20
        </div>
        <div className='minute'>
          70/100 분
        </div>
      </LevelBox>
      <ProgressBox>
        <progress value="70"  max = "100"></progress>
      </ProgressBox>
      </UserBox>
    </UserContainer>
  );
}

export default UserInfoContainer;

const UserContainer = styled.div`
  border: 1px solid red;
  width: 30rem;
  height: 30rem;
  position: relative;
  top: 15rem;
  justify-content: center
`
const UserBox = styled.div`
  border: 1px solid gray;
  width: 28rem;
  height: 30rem;
  flex-direction: column;
`

const Nickname = styled.div`
  border: 1px solid blue;
  width: 20rem;
  height: 3rem;
  position: relative;
  left: 4rem;
  justify-content: center;
  font-size: large;
  font-weight: bold;
`

const Email =styled.div`
  border: 1px solid blue;
  width: 20rem;
  height: 2rem;
  font-size: larger;
    position: relative;
    right: -4rem;
  justify-content: center;
  
`
const UserImage = styled.div`
  border: 1px solid green;
  width: 21rem;
  height: 17rem;
  position: relative;
    top: 1rem;
    left: 3rem;
    justify-content: center;
  img {
    width: 19rem;
    height: 16rem;
    border-radius: 50%;
  }
  
`
const LevelBox = styled.div`
  border: 1px solid red;
  position: relative;
  top: 2.5rem;
  .level{
    border: 1px solid black;
    padding-top: 2px;
  }
  .minute{
    border: 1px solid black;
    position: relative;
    left: 20rem;
  }
`

const ProgressBox = styled.div`
  /* border: 1px solid red; */
  position: relative;
  top: 3rem;
  progress {
    appearance: none;
    ::-webkit-progress-value{
      border-radius: 1rem;
      width: 28rem;
      background: -webkit-linear-gradient(to right, #DDA0DD, #6627F5);
      background: linear-gradient(to right,#DDA0DD,#6627F5 );
    }
    ::-webkit-progress-bar{
      background-color: #D9D9D9;
      width: 28rem;
      border-radius: 1rem;
      box-shadow: inset 3px 3px 10px #ccc;
    }
  }
`

