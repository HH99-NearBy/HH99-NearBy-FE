import React, { useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UserIcon from "../../elements/UserIcon";
import { IoCaretDownOutline } from "react-icons/io5";

function UserInfoCard() {
  const navigate = useNavigate();
  const navModal = useRef<HTMLDivElement | null>(null);
  const handleNaveModalShow = () => {
    if (navModal.current !== null) navModal.current.classList.toggle("hidden");
  };
  const handleUserLogout = () => {
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  return (
    <StCardContainer onClick={handleNaveModalShow}>
      <UserIcon size="medium" imgUrl={sessionStorage.getItem("userProfile")} />
      <div className="toggle_navigate">
        <IoCaretDownOutline className="selected_icon" />
      </div>
      {/* <StInfoSection>
        <StInfoFooter>
          <span className="user_tier">
            {sessionStorage.getItem("userLevel")}
          </span>
          
        </StInfoFooter>
        <span className="user_nickname">
          {sessionStorage.getItem("userName")}
        </span>
      </StInfoSection> */}
      <StNavModalBody ref={navModal}>
        <h2>{sessionStorage.getItem("userName")}</h2>
        <div className="challenge_time_container">
          <div className="level_text_container">
            <span>{sessionStorage.getItem("userLevel")}</span>
            <span>{sessionStorage.getItem("remainTime")}/70</span>
          </div>

          <progress value={30} max={70}></progress>
        </div>
        <button className="move_to_mypage" onClick={() => navigate("/mypage")}>
          마이페이지
        </button>
        <button className="user_logout" onClick={handleUserLogout}>
          로그아웃
        </button>
      </StNavModalBody>
    </StCardContainer>
  );
}

const StCardContainer = styled.div`
  position: relative;
  width: 9rem;
  height: 9rem;
  margin-left: 2.5rem;
  border-radius: 0.8rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0.5rem;
  cursor: pointer;
  .toggle_navigate {
    position: absolute;
    right: 0.5rem;
    bottom: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: baseline;
    font-size: 2rem;
    border: 0.33rem solid var(--purple-color);
    border-radius: 50%;
    background-color: white;
  }
  :hover > div:nth-of-type(1) {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }
`;

const StNavModalBody = styled.div`
  position: absolute;
  z-index: 100;
  right: 0;
  top: 9.5rem;
  width: 30rem;
  height: 17rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  h2 {
    height: 3rem;
    font-size: 2rem;
    margin-top: 1rem;
    margin-bottom: 0.6rem;
    align-self: flex-start;
    margin-left: 1.5rem;
  }
  button {
    width: 100%;
    flex-grow: 1;
    border: none;
    border-top: 0.1rem solid gray;
    background-color: #f5f5f5;
  }
  :hover div:nth-of-type(1) {
    box-shadow: none;
  }
  .challenge_time_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 4rem;
    width: 90%;
    height: 8rem;
    margin-bottom: 0.5rem;
    color: var(--purple-color);
    .level_text_container {
      width: 100%;
      font-size: 1.5rem;
      display: flex;
      color: black;
      justify-content: space-between;
      align-items: flex-end;
      padding-bottom: 0.5rem;
    }
    progress[value] {
      font-size: 2rem;
      width: 100%;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      height: 1rem;
      ::-webkit-progress-value {
        background-color: var(--purple-color);
      }
      ::-moz-progress-bar {
        background-color: var(--purple-color);
      }
    }
    /* ::-webkit-progress-bar {
      background-color: gray;
    }
    ::-webkit-progress-value {
      background-color: var(--purple-color);
    } */
  }

  .move_to_mypage {
    height: 3rem;
    :hover {
      background-color: #ffa115;
      color: white;
    }
  }
  .user_logout {
    position: absolute;
    width: 8rem;
    height: 2.5rem;
    top: 1rem;
    right: 1.5rem;
    border: none;
    font-size: 1.5rem;
    :hover {
      background-color: var(--purple-color);
      color: white;
    }
  }
`;

export default UserInfoCard;
