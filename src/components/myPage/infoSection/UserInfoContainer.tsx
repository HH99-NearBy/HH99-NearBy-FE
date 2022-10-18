import React from "react";
import styled from "styled-components";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface infoData {
  nickname: undefined;
  email: undefined;
  profileImg: undefined;
  level: undefined;
  remainingTime: undefined;
}

function UserInfoContainer({
  nickname,
  email,
  profileImg,
  level,
  remainingTime,
}: {
  nickname: undefined;
  email: undefined;
  profileImg: undefined;
  level: undefined;
  remainingTime: undefined;
}) {
  const navigate = useNavigate();

  const EditBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/edit");
  };

  return (
    <UserContainer>
      <UserBox>
        <Nickname>{nickname}</Nickname>
        <Email>{email}</Email>
        <UserImage>
          <img src={profileImg} />
        </UserImage>
        <LevelBox>
          <div className="level">{level}</div>
          <div className="minute">{remainingTime}/70 분</div>
        </LevelBox>
        <ProgressBox>
          {remainingTime !== undefined && (
            <progress value={Number(remainingTime)} max={70}></progress>
          )}
        </ProgressBox>
      </UserBox>
      <Editbutton onClick={EditBtn}>
        <FaUserEdit />
      </Editbutton>
    </UserContainer>
  );
}

export default UserInfoContainer;

const UserContainer = styled.div`
  width: 40rem;
  height: 30rem;
  position: relative;
  top: 15rem;
  justify-content: center;
  border: 2px solid whitesmoke;
  background-color: white;
`;
const UserBox = styled.div`
  width: 28rem;
  height: 30rem;
  flex-direction: column;
`;

const Nickname = styled.div`
  width: 20rem;
  height: 3rem;
  position: relative;
  left: 7rem;
  justify-content: center;
  font-size: large;
  font-weight: bold;
`;

const Email = styled.div`
  width: 20rem;
  height: 2rem;
  font-size: larger;
  position: relative;
  right: -7rem;
  justify-content: center;
`;
const UserImage = styled.div`
  width: 21rem;
  height: 17rem;
  position: relative;
  top: 1rem;
  left: 7rem;
  justify-content: center;
  img {
    width: 19rem;
    height: 16rem;
    border-radius: 50%;
  }
`;
const LevelBox = styled.div`
  position: relative;
  top: 2.5rem;
  .level {
    padding-top: 2px;
    position: relative;
    left: 3rem;
  }
  .minute {
    position: relative;
    left: 25rem;
  }
`;

const ProgressBox = styled.div`
  position: relative;
  top: 3rem;
  left: 3rem;
  progress[value] {
    width: 28rem;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    ::-webkit-progress-value {
      border-radius: 1rem;
      background: -webkit-linear-gradient(to right, #dda0dd, #6627f5);
      background: linear-gradient(to right, #dda0dd, #6627f5);
    }
    ::-webkit-progress-bar {
      background-color: #d9d9d9;
      border-radius: 1rem;
      box-shadow: inset 3px 3px 10px #ccc;
    }
    border-radius: 1rem;
    background-color: #d9d9d9;
    ::-moz-progress-bar {
      background: -webkit-linear-gradient(to right, #dda0dd, #6627f5);
      background: linear-gradient(to right, #dda0dd, #6627f5);
      border-radius: 1rem;
    }
  }
`;

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
`;
