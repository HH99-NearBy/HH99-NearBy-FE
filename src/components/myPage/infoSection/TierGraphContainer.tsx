import React from "react";
import styled from "styled-components";
import MyChart from "../../Chart";

function TierGraphContainer(graph:any) {
  return (
    <TierContainer>
      <TitleBox>습관을 위한 시간</TitleBox>
      <GraphBox>
        <MyChart locate={"myPage"} scores={graph.graph} />
      </GraphBox>
    </TierContainer>
  );
}

export default TierGraphContainer;

const TierContainer = styled.div`
  width: 70rem;
  height: 15rem;
  border: 2px solid whitesmoke;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
`;
const TitleBox = styled.div`
  width: 16rem;
  height: 3rem;
  justify-content: center;
  font-size: large;
  font-weight: bold;
  position: relative;
  top: 6rem;
`;

const GraphBox = styled.div`
  width: 54rem;
  justify-content: center;
  padding-top: 2rem;
`;
