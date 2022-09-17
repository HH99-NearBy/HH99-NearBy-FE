import React from 'react';
import styled from 'styled-components';
import MyChart from '../../Chart';

function TierGraphContainer() {
  return (
    <TierContainer>
      <TitleBox>
      습관을 위한 시간
      </TitleBox>
      <GraphBox>
        <MyChart/>
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
  justify-content: center;
  padding-top: 2rem;
`


