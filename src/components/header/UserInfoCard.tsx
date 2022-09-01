import React from "react";
import styled from "styled-components";
import UserIcon from "../../elements/UserIcon";

function UserInfoCard() {
  return (
    <StCardContainer>
      <UserIcon size="medium" />
      <StInfoSection>
        <span className="user_nickname">강태훈강태훈강태훈</span>
        <StInfoFooter>
          <span className="user_tier">🐣플레티넘5</span>
          <div className="toggle_navigate">{">"}</div>
        </StInfoFooter>
      </StInfoSection>
    </StCardContainer>
  );
}

const StCardContainer = styled.div`
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
    transform: rotate(90deg);
    background-color: #eee;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.7rem;
    border-radius: 0.5rem;
    border: 0.1rem solid black;
  }
`;

const StInfoFooter = styled.div`
  display: flex;
  padding-right: 0.5rem;
  justify-content: space-between;
  align-items: center;
`;

export default UserInfoCard;
