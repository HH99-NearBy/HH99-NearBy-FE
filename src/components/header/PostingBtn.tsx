import React from "react";
import styled from "styled-components";

function PostingBtn() {
  return <StPostingBtn>챌린지 만들기</StPostingBtn>;
}

const StPostingBtn = styled.button`
  width: 16rem;
  height: 6rem;
  font-size: 2rem;
  border-radius: 20px;
`;

export default PostingBtn;
