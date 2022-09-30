import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

function PostingBtn() {
  const navigate = useNavigate();
  return (
    <StPostingBtn onClick={() => navigate("/posting")}>
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
  cursor: pointer;
  span {
    display: inline-block;
    margin-left: 1rem;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.3rem;
    color: var(--purple-color);
    background-color: #fff;
    border-radius: 50%;
  }
  :hover {
    opacity: 0.9;
  }
`;

export default PostingBtn;
