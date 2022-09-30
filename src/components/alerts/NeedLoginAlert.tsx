import React from "react";
import styled from "styled-components";

function AlertBody({ payload }: { payload: string }) {
  return <div>{payload}</div>;
}

const StBody = styled.div``;

export default AlertBody;
