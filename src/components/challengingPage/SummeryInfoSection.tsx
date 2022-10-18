import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { BsFillPersonFill } from "react-icons/bs";
import { IoMdAlarm } from "react-icons/io";
import UserListSection from "./UserListSection";
import { BsDoorOpen } from "react-icons/bs";

function SummeryInfoSection({ body }: { body: any }) {
  const navigate = useNavigate();
  const handleLeaveRoom = () => {
    navigate("/");
  };
  return (
    <>
      <StSummeyHeader>
        <h1>{body.detailModal.title}</h1>
        <div className="summery_footer">
          <div className="people_info">
            <BsFillPersonFill />
            인원 {body.detailModal.participatePeople}/
            {body.detailModal.limitPeople}
          </div>
          <div className="rest_time_info">
            {body.detailModal.targetTime}
            <IoMdAlarm />
          </div>
        </div>
      </StSummeyHeader>
      <UserListSection />
      <StNavigateBar>
        <button className="leave_btn" onClick={handleLeaveRoom}>
          <BsDoorOpen />
          나가기
        </button>
      </StNavigateBar>
    </>
  );
}

const StSummeyHeader = styled.div`
  width: 100%;
  height: 8.5rem;
  background-color: #f5f5f5;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h1 {
    font-size: 2rem;
  }
  .summery_footer {
    font-size: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .people_info {
      display: flex;
      align-items: center;
    }
    .rest_time_info {
      font-size: 1.7rem;
      display: flex;
      align-items: center;
    }
  }
`;

const StNavigateBar = styled.div`
  width: 100%;
  height: 4rem;
  background-color: var(--purple-color);
  display: flex;
  padding: 0 2rem;
  justify-content: flex-end;
  align-items: center;
  .switch_btn_group {
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      svg {
        width: 2rem;
        height: 2rem;
      }
    }
  }
  .leave_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    svg {
      width: 2.32rem;
      height: 2.32rem;
    }
    border: none;
    background: none;
    color: #fff;
    cursor: pointer;
  }
`;

export default SummeryInfoSection;
