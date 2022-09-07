import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CategoryList from "../components/header/CategoryList";
import UserInfoCard from "../components/header/UserInfoCard";
import PostingBtn from "../components/header/PostingBtn";
import MAINLOGO from "../static/main_logo.png";

function Header() {
  return (
    <StHeaderContainer>
      <StcontentsWrapper>
        <div className="navigate_section">
          <Link to="/">
            <img src={MAINLOGO} alt="로고" />
          </Link>

          <CategoryList />
        </div>
        <div className="interface_section">
          <PostingBtn />
          <UserInfoCard />
        </div>
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

export default Header;
