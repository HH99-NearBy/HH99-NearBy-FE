import React from "react";
import styled from "styled-components";
import CategoryList from "../components/header/CategoryList";
import UserInfoCard from "../components/header/UserInfoCard";
import PostingBtn from "../components/header/PostingBtn";

function Header() {
  return (
    <StHeaderContainer>
      <StcontentsWrapper>
        <div className="navigate_section">
          <img src="" placeholder="로고" />
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
    height: 8rem;
  }
`;

export default Header;
