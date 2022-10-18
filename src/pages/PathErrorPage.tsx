import React from "react";
import styled from "styled-components";
import inline_logo from "../static/inline_logo.svg";

function PathErrorPage() {
  return (
    <StErrorLayOut>
      <img src={inline_logo}></img>
      <h1>잘못된 주소로 접근하셨어요, 좌측 상단 로고를 눌러주세요!</h1>
    </StErrorLayOut>
  );
}

const StErrorLayOut = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20rem;
  opacity: 0.7;
  img {
    width: 15rem;
  }
  h1 {
    margin-top: 2rem;
    font-size: 4rem;
    color: var(--purple-color);
  }
`;

export default PathErrorPage;
