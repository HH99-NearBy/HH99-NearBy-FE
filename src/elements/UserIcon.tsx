import React from "react";
import styled, { css } from "styled-components";

function UserIcon({ size }: { size: string }) {
  return <StIcon size={size} />;
}

const StIcon = styled.div<{ size: string }>`
  width: ${(props) =>
    props.size === "medium"
      ? "7.5rem"
      : props.size === "large"
      ? "10rem"
      : "5rem"};
  height: ${(props) =>
    props.size === "medium"
      ? "7.5rem"
      : props.size === "large"
      ? "10rem"
      : "5rem"};
  border-radius: 50%;
  background: url("https://publy.imgix.net/images/2018/02/28/1519811155_f99450b74bbc61046cf55389501cd124.jpeg?fm=pjpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;
export default UserIcon;

