import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { GoStar } from "react-icons/go";
import { IoMdMicOff } from "react-icons/io";
import { IoVideocamSharp } from "react-icons/io5";

function UserCard({
  userName,
  userLevel,
  joinAt,
}: {
  userName: string;
  userLevel: string;
  joinAt: number;
}) {
  const [isHead, setIsHead] = useState<boolean>(false);
  const timerRef = useRef<HTMLDivElement | null>(null);
  const runTimer = () => {
    const currDate = Date.now();
    const diff = currDate - joinAt;
    console.log(diff);
    const mill = Math.floor((diff % 1000) / 100);
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
    if (timerRef.current !== null) {
      timerRef.current.innerHTML = `${hoursStr}:${minutesStr}:${secondsStr}`;
    }
  };
  useEffect(() => {
    const timerInterval = setInterval(() => {
      runTimer();
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  }, []);
  console.log(joinAt);
  return (
    <StCardBody>
      <div className="user_info">
        <span className="user_level">{userLevel}</span>
        <span className="user_name">{userName}</span>

        {isHead && <GoStar />}
      </div>
      <STTimer ref={timerRef} />
    </StCardBody>
  );
}

const StCardBody = styled.div`
  width: 100%;
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
  }
`;

const STTimer = styled.div`
  display: flex;
  align-items: center;
  font-size: 2.3rem;
  font-family: "Times New Roman", Times, serif;
  color: var(--purple-color);
`;

export default UserCard;
