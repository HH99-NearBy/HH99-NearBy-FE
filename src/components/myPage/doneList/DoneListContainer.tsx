import React from "react";
import styled from "styled-components";
import DoneCard from "./DoneCard";

function DoneListContainer() {
  return (
    <>
    <DoneContainer>
      <TitleBox>
      완료한 챌린지
      </TitleBox>
      <DoneCard/>
    </DoneContainer>
    </>
  );
}

export default DoneListContainer;

const DoneContainer = styled.div`
  /* border: 1px solid blue; */
  width: 100rem;
  display: flex;
  margin: 10rem auto;
  justify-content: center;
  flex-direction: column;
  box-shadow: grey 1px 1px 10px;
`
const TitleBox = styled.div`
  border: 1px solid purple;
  width: 12rem;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  font-size: large;
`
