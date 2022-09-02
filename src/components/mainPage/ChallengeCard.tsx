import React from "react";
import styled, { css } from "styled-components";
import { BsFillPersonFill } from "react-icons/bs";
import { BiCalendarCheck } from "react-icons/bi";
import { IoMdAlarm } from "react-icons/io";
import { MdOutlineTimer } from "react-icons/md";

interface StyleProps {
  status: string;
  thumbnailImg?: string;
}

function ChallengeCard(props: StyleProps) {
  return (
    <StCardContainer status={props.status}>
      <img src={props.thumbnailImg} alt="쓱-챌린지 썸네일 이미지" />
      <StCardContents>
        <div className="card_body">
          <div className="header_info">
            <BsFillPersonFill />
            모집중 19/30
          </div>
          <div className="body_info">모집중인 챌릭지 제목입니다.</div>
          <div className="footer_info">
            <span className="start_date">
              <BiCalendarCheck />
              2022 - 10 - 01
            </span>
            <span className="start_time">
              <IoMdAlarm />
              오전 09:20
            </span>
            <span className="running_time">
              <MdOutlineTimer />
              240분
            </span>
          </div>
        </div>
        <button className="modal_open_btn">
          {props.status === "doing"
            ? "도전하기"
            : props.status === "done"
            ? "완료된 챌린지입니다."
            : "입장하기"}
        </button>
      </StCardContents>
    </StCardContainer>
  );
}

const StCardContainer = styled.div`
  width: 40rem;
  height: 42.2rem;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  ${(props: StyleProps) => {
    switch (props.status) {
      case "doing":
        return css`
          img {
            width: 100%;
            height: 21.1rem;
            background-color: purple;
          }
        `;
      case "done":
        return css`
          img {
            width: 100%;
            height: 21.1rem;
            background-color: purple;
          }
        `;
      case "recruit":
        return css`
          width: 61.1rem;
          height: 21.1rem;
          flex-direction: row;
          img {
            width: 21.1rem;
            height: 21.1rem;
            background-color: red;
          }
          .modal_open_btn {
            background-color: #ffa115;
          }
        `;
      case "running":
        return css``;
    }
  }}
`;

const StCardContents = styled.div`
  width: 40rem;
  height: 21.1rem;
  background-color: #fff;
  .card_body {
    display: flex;
    flex-direction: column;
    width: 40rem;
    height: 16.1rem;
    padding: 0 1rem;
    .header_info {
      display: flex;
      align-items: center;
      font-size: 1.6rem;
      height: 3.5rem;
      svg {
        margin-right: 0.5rem;
      }
    }
    .body_info {
      flex-grow: 1;
      font-size: 2rem;
      font-weight: 600;
      letter-spacing: 0.2rem;
    }
    .footer_info {
      display: flex;
      font-size: 1.6rem;
      height: 3rem;
      span {
        display: flex;
        align-items: center;
        padding-right: 1.5rem;
        svg {
          margin-right: 0.5rem;
        }
      }
    }
  }
  button {
    width: 40rem;
    height: 5rem;
    background-color: var(--purple-color);
    color: #fff;
    border: none;
    font-size: 2rem;
    letter-spacing: 0.1rem;
  }
`;

export default ChallengeCard;
