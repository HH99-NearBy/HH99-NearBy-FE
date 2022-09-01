import React from "react";
import styled from "styled-components";

function UserIcon() {
  return <StIcon />;
}

const StIcon = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 50%;
  background: url("https://publy.imgix.net/images/2018/02/28/1519811155_f99450b74bbc61046cf55389501cd124.jpeg?fm=pjpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;
export default UserIcon;
