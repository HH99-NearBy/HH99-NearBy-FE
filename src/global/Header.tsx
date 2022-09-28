import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import CategoryList from "../components/header/CategoryList";
import SearchBar from "../components/header/SearchBar";
import UserInfoCard from "../components/header/UserInfoCard";
import PostingBtn from "../components/header/PostingBtn";
import MAINLOGO from "../static/main_logo.svg";

function Header() {
  const navigate = useNavigate();
  const handleToLogin = () => {
    navigate("/login");
  };
  return (
    <StHeaderContainer>
      <StcontentsWrapper>
        <div className="navigate_section">
          <Link to="/">
            <img src={MAINLOGO} alt="로고" />
          </Link>
          <SearchBar />
          <CategoryList />
        </div>

        {sessionStorage.getItem("userName") ? (
          <div className="interface_section">
            <PostingBtn />
            <UserInfoCard />
          </div>
        ) : (
          <StLoginButton onClick={handleToLogin}>로그인 하기</StLoginButton>
        )}
      </StcontentsWrapper>
    </StHeaderContainer>
  );
}

const StHeaderContainer = styled.header`
  width: 100vw;
  height: 10rem;
  border-bottom: 0.2rem solid #99999988;
`;

const StcontentsWrapper = styled.div`
  width: 128rem;
  height: 10rem;
  margin: 0 auto;
  /* background-color: blue; */
  display: flex;
  justify-content: space-between;
  .navigate_section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
  }
  .interface_section {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  img {
    width: 12rem;
    height: 6rem;
  }
`;

const StLoginButton = styled.button`
  width: 20rem;
  height: 6rem;
  margin-top: 2rem;
  font-size: 2rem;
  border-radius: 4rem;
  color: #fff;
  background-color: var(--purple-color);
  cursor: pointer;
`;

export default Header;
