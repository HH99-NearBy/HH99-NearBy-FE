import React from 'react';
import styled from 'styled-components';

function TierGraphContainer() {
  return (
    <TierContainer>
      <TitleBox>
      습관을 위한 시간
      </TitleBox>
      <GraphBox>
        여기에 그래프가 들어갑니다
      </GraphBox>
    </TierContainer>
  );
}

export default TierGraphContainer;

const TierContainer = styled.div`
  border: 1px solid green;
  width: 70rem;
  height: 15rem;
`
const TitleBox = styled.div`
  border: 1px solid black;
  width: 16rem;
  height: 3rem;
  justify-content: center;
  font-size: large;
  font-weight: bold;
  position: relative;
  top: 6rem;
`

const GraphBox = styled.div`
  border: 1px solid black;
  width: 54rem;
`


