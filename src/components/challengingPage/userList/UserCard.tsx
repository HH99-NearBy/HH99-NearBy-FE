import React, { useState } from "react";
import styled from "styled-components";
import { GoStar } from "react-icons/go";
import { IoMdMicOff } from "react-icons/io";
import { IoVideocamSharp } from "react-icons/io5";

function UserCard({
  userName,
  userLevel,
}: {
  userName: string;
  userLevel: string;
}) {
  const [isHead, setIsHead] = useState<boolean>(false);
  return (
    <StCardBody>
      <div className="user_info">
        <span className="user_level">{userLevel}</span>
        <span className="user_name">{userName}</span>

        {isHead && <GoStar />}
      </div>
      <div className="control_group">
        <IoVideocamSharp />
        <IoMdMicOff />
      </div>
    </StCardBody>
  );
}

const StCardBody = styled.div`
  width: 64rem;
  height: 6rem;
  border-top: 0.1rem solid #e1e1e1;
  box-sizing: border-box;
  padding: 1rem 2rem;
  font-size: 1.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .user_info {
    display: flex;
    align-items: center;
    .user_level {
      padding-right: 0.5rem;
    }
    .user_name {
      padding-right: 0.5rem;
    }
  }

  .control_group {
    display: flex;
    align-items: center;
    font-size: 2.3rem;
    svg {
      margin-left: 1rem;
    }
  }
`;

export default UserCard;
