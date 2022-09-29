import React from 'react';
import styled from 'styled-components';
import {FaUserEdit} from "react-icons/fa"
import {useNavigate} from 'react-router-dom'


interface infoData {
  nickname : undefined;
  email : undefined;
  profileImg:undefined;
  level:undefined;
  remainingTime:undefined;
}


function UserInfoContainer({nickname,email,profileImg,level,remainingTime}:{nickname:undefined;email:undefined,profileImg:undefined;level:undefined;remainingTime:undefined}) {
  const navigate = useNavigate();

  const EditBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
      navigate('/edit')
  }

  return (
    <UserContainer>
      <UserBox>
      <Nickname>
      {nickname}
      </Nickname>
      <Email>
          {email}
      </Email>
      <UserImage>
        <img src = {profileImg}/>
      </UserImage>
      <LevelBox>
        <div className="level">
          {level}
        </div>
        <div className='minute'>
          {remainingTime}/70 분
        </div>
      </LevelBox>
      <ProgressBox>
        <progress value={remainingTime}  max = "70"></progress>
      </ProgressBox>
      </UserBox>
        <Editbutton onClick={EditBtn}>
          <FaUserEdit/>
        </Editbutton>
    </UserContainer>
  );
}

export default UserInfoContainer;

const UserContainer = styled.div`
  width: 30rem;
  height: 30rem;
  position: relative;
  top: 15rem;
  justify-content: center;
  border: 2px solid whitesmoke;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
`
const UserBox = styled.div`
  width: 28rem;
  height: 30rem;
  flex-direction: column;
`

const Nickname = styled.div`
  width: 20rem;
  height: 3rem;
  position: relative;
  left: 5rem;
  justify-content: center;
  font-size: large;
  font-weight: bold;
`

const Email =styled.div`
  width: 20rem;
  height: 2rem;
  font-size: larger;
    position: relative;
    right: -5rem;
  justify-content: center;
  
`
const UserImage = styled.div`
  width: 21rem;
  height: 17rem;
  position: relative;
    top: 1rem;
    left: 4rem;
    justify-content: center;
  img {
    width: 19rem;
    height: 16rem;
    border-radius: 50%;
  }
`
const LevelBox = styled.div`
  position: relative;
  top: 2.5rem;
  .level{
    padding-top: 2px;
    position: relative;
    left: 1rem;
  }
  .minute{
    position: relative;
    left: 21rem;
  }
`

const ProgressBox = styled.div`
  position: relative;
  top: 3rem;
  left: 1rem;
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

const Editbutton = styled.button`
  border: 1px solid white;
  width: 5rem;
    height: 4rem;
    background-color: white;
    background-color: transparent;
    position: relative;
    top: 19rem;
    right: 3rem;
    cursor: pointer;
    svg {
      width: 3rem;
      height: 3rem;
    }
`

