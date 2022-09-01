import React from "react";
import styled from "styled-components";

function CategoryList() {
  return (
    <StListContainer>
      <li className="selected">홈</li>
      <li>랭킹</li>
      <li>이용방법</li>
    </StListContainer>
  );
}

const StListContainer = styled.ul`
  width: 40rem;
  height: 10rem;
  /* background-color: green; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 0.2rem;
  margin-left: 5rem;
  li {
    height: 100%;
    margin: 0 0.7rem;
    flex-grow: 1;
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 1rem;
    border-bottom: 0.5rem solid #fff;
    :hover {
      color: red;
    }
  }
`;

export default CategoryList;
