import React from "react";
import styled from "styled-components";

function PostingBtn() {
  return (
    <StPostingBtn>
      챌린지 만들기 <span>+</span>
    </StPostingBtn>
  );
}

const StPostingBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 6rem;
  font-size: 2rem;
  border-radius: 4rem;
  color: #fff;
  background-color: var(--purple-color);
  span {
    display: inline-block;
    margin-left: 1rem;
    width: 2rem;
    height: 2rem;
    text-align: center;
    color: var(--purple-color);
    background-color: #fff;
    border-radius: 50%;
  }
`;

export default PostingBtn;
