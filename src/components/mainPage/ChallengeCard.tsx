import React, { useReducer, useContext } from "react";
import styled, { css } from "styled-components";
import { BsFillPersonFill } from "react-icons/bs";
import { BiCalendarCheck } from "react-icons/bi";
import { IoMdAlarm } from "react-icons/io";
import { MdOutlineTimer } from "react-icons/md";
import { AppContext } from "../../api/context/index";

interface StyleProps {
  status: string;
  thumbnailImg?: string;
  challengeTitle?: string;
  limitPeople?: number;
  participatePeople?: number;
  startDay?: string;
  startTime?: string;
  targetTime?: number;
  endTime?: string;
  Ref?: React.MutableRefObject<HTMLDivElement | null>;
  challengeId?: number;
  handleToggleModal?: () => void;
}

function ChallengeCard(props: StyleProps) {
  const { state, dispatch } = useContext(AppContext);
  const handleReadChallengeId = (id: number) => {
    dispatch({
      type: "READ_CHALLENGE_ID",
      payload: id,
      challengeStatus: props.status,
    });
  };
  return (
    <StCardContainer status={props.status} ref={props.Ref}>
      <img src={props.thumbnailImg} alt="쓱-챌린지 썸네일 이미지" />
      <StCardContents>
        <div className="card_body">
          <div className="header_info">
            {props.status === "running" && (
              <>
                <div className="running_nav_dot"></div> 진행중!
              </>
            )}
            {props.status !== "running" && (
              <>
                <BsFillPersonFill /> `모집중 {props.participatePeople}/
                {props.limitPeople}`
              </>
            )}
          </div>
          <div className="body_info">{props.challengeTitle}</div>
          <div className="footer_info">
            <span className="start_date">
              <BiCalendarCheck />
              {props.startDay}
            </span>
            <span className="start_time">
              <IoMdAlarm />
              {props.startTime}
            </span>
            <span className="running_time">
              <MdOutlineTimer />
              {props.targetTime}분
            </span>
          </div>
        </div>
        {props.status === "doing" ? (
          <button
            className="modal_open_btn"
            onClick={() => {
              if (typeof props.challengeId !== "undefined") {
                handleReadChallengeId(props.challengeId);
              }

              if (typeof props.handleToggleModal !== "undefined")
                props.handleToggleModal();
            }}
          >
            도전하기
          </button>
        ) : props.status === "done" ? (
          <button className="modal_open_btn">완료된 챌린지입니다.</button>
        ) : (
          <button
            className="modal_open_btn"
            onClick={() => {
              if (typeof props.challengeId !== "undefined")
                handleReadChallengeId(props.challengeId);
              if (typeof props.handleToggleModal !== "undefined")
                props.handleToggleModal();
            }}
          >
            입장하기
          </button>
        )}
      </StCardContents>
    </StCardContainer>
  );
}

const StCardContainer = styled.div`
  width: 40rem;
  height: 42.2rem;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  ${(props: StyleProps) => {
    switch (props.status) {
      case "doing":
        return css`
          img {
            width: 100%;
            height: 21.1rem;
            background-color: #e1e1e1;
          }
        `;
      case "done":
        return css`
          img {
            width: 100%;
            height: 21.1rem;
            background-color: #e1e1e1;
          }
          .modal_open_btn {
            background-color: #e1e1e1;
            color: #323232;
          }
        `;
      case "recruit":
        return css`
          width: 57.1rem;
          height: 21.1rem;
          flex-direction: row;
          img {
            width: 21.1rem;
            height: 21.1rem;
            background-color: #e1e1e1;
          }
          .modal_open_btn {
            background-color: #ffa115;
          }
        `;
      case "running":
        return css`
          width: 57.1rem;
          height: 21.1rem;
          flex-direction: row;
          img {
            width: 21.1rem;
            height: 21.1rem;
            background-color: #e1e1e1;
          }
          .modal_open_btn {
            background-color: #ffa115;
          }
        `;
    }
  }}
`;

const StCardContents = styled.div`
  width: 100%;
  height: 21.1rem;
  background-color: #fff;
  .card_body {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 16.1rem;
    padding: 0 1rem;
    .header_info {
      display: flex;
      align-items: center;
      font-size: 1.6rem;
      height: 3.5rem;
      color: #323232;
      svg {
        margin-right: 0.5rem;
      }
      @keyframes runner {
        0% {
          opacity: 1;
        }

        50% {
          opacity: 0;
        }

        100% {
          opacity: 1;
        }
      }
      .running_nav_dot {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: red;
        animation-name: runner;
        animation-duration: 1.6s;
        animation-iteration-count: infinite;
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
      color: #323232;
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
    width: 100%;
    height: 5rem;
    background-color: var(--purple-color);
    color: #fff;
    border: none;
    font-size: 2rem;
    letter-spacing: 0.1rem;
    cursor: pointer;
  }
`;

export default React.memo(ChallengeCard);
