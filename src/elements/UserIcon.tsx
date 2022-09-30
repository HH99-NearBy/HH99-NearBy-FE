import React from "react";
import styled, { css } from "styled-components";

function UserIcon({ size, imgUrl }: { size: string; imgUrl: string | null }) {
 
  return <StIcon size={size} imgUrl={imgUrl} />;
}

const StIcon = styled.div<{ size: string; imgUrl: string | null }>`
  width: ${(props) =>
    props.size === "medium"
      ? "6.5rem"
      : props.size === "large"
      ? "10rem"
      : "5rem"};
  height: ${(props) =>
    props.size === "medium"
      ? "6.5rem"
      : props.size === "large"
      ? "10rem"
      : "5rem"};
  border-radius: 50%;
  background: url(${(props) => props.imgUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;
export default UserIcon;
