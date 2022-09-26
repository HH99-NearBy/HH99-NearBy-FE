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
    window.location.reload();
  };
  return (
    <StCardContainer onClick={handleNaveModalShow}>
      <UserIcon size="medium" imgUrl={sessionStorage.getItem("userProfile")} />
      <StInfoSection>
        <StInfoFooter>
          <span className="user_tier">
            {sessionStorage.getItem("userLevel")}
          </span>
          <div className="toggle_navigate">
            <IoCaretDownOutline className="selected_icon" />
          </div>
        </StInfoFooter>
        <span className="user_nickname">
          {sessionStorage.getItem("userName")}
        </span>
      </StInfoSection>
      <StNavModalBody ref={navModal} className="hidden">
        <h2>앞으로 나아간 시간</h2>
        <div className="challenge_time_container">1122분</div>
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
  width: 30rem;
  height: 9rem;
  border: 0.2rem solid #99999988;
  margin-left: 3rem;
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  cursor: pointer;
`;

const StInfoSection = styled.div`
  width: 20rem;
  margin-left: 1.5rem;
  font-size: 1.9rem;
  .user_nickname {
    letter-spacing: 0.15rem;
  }
  .toggle_navigate {
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: baseline;
    font-size: 1.7rem;
    border: 0.2rem solid var(--purple-color);
  }
`;

const StInfoFooter = styled.div`
  display: flex;
  padding-right: 0.5rem;
  justify-content: space-between;
  align-items: center;
`;

const StNavModalBody = styled.div`
  position: absolute;
  z-index: 100;
  left: 0;
  top: 10rem;
  width: 30rem;
  height: 20rem;
  border: 0.2rem solid gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  h2 {
    height: 3rem;
    font-size: 2rem;
    margin-top: 1rem;
    margin-bottom: 0.6rem;
  }
  button {
    width: 100%;
    flex-grow: 1;
    border: none;
    border-top: 0.1rem solid gray;
    background-color: #f5f5f5;
  }
  .challenge_time_container {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4rem;
    width: 90%;
    height: 8rem;
    border: 0.2rem solid gray;
    border-radius: 1rem;
    margin-bottom: 0.5rem;
    color: var(--purple-color);
  }

  .move_to_mypage {
    :hover {
      background-color: #ffa115;
      color: white;
    }
  }
  .user_logout {
    :hover {
      background-color: var(--purple-color);
      color: white;
    }
  }
`;

export default UserInfoCard;
