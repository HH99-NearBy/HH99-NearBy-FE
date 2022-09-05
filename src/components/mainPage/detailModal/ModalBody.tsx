import React from "react";
import styled from "styled-components";
import { BsFillPersonFill } from "react-icons/bs";
import { BiCalendarCheck } from "react-icons/bi";
import { IoMdAlarm } from "react-icons/io";
import { MdOutlineTimer } from "react-icons/md";

function ModalBody({ handleToggleModal }: { handleToggleModal: () => void }) {
  return (
    <StModalContainer>
      <StModalBody>
        <StModalHeader>
          <button onClick={handleToggleModal}>X</button>
          <span>LV.20 방장이름</span>
          <h1>챌린지제목입니드아아아아이게되네ㅔㅔ</h1>
        </StModalHeader>
        <StModalContentsContainer>
          <StSummeryContainer>
            <img
              src=""
              alt="챌린지 썸네일이미지입니다"
              className="challenge_detail_thumbnail"
            />
            <StSummeryInfoContainer>
              <li>{<BiCalendarCheck />}2022-10-01</li>
              <li>{<IoMdAlarm />}오전 09:20</li>
              <li>{<MdOutlineTimer />}240분</li>
              <li>{<BsFillPersonFill />}모집 19/30</li>
            </StSummeryInfoContainer>
            <StButtonGroup className="footer_button_group">
              <button>입장하기</button>
              <button>취소하기</button>
            </StButtonGroup>
          </StSummeryContainer>
          <StChallengeInfoContainer>
            <div className="detail_description">
              <h2>내용</h2>
              <span>
                사용자가 입력하는 챌린지 내용입니다 사용자가 입력하는 챌린지
                내용입니다 사용자가 입력하는 챌린지 내용입니다 사용자가 입력하는
                챌린지 내용입니다 사용자가 입력하는 챌린지 내용입니다 사용자가
                입력하는 챌린지 내용입니다 사용자가 입력하는 챌린지 내용입니다
                사용자가 입력하는 챌린지 내용입니다 사용자가 입력하는 챌린지
                내용입니다 사용자가 입력하는 챌린지 내용입니다 사용자가 입력하는
                챌린지 내용입니다 사용자가 입력하는 챌린지 내용입니다 사용자가
                입력하는 챌린지 내용입니다 사용자가 입력하는 챌린지 내용입니다
                사용자가 입력하는 챌린지 내용입니다 사용자가 입력하는 챌린지
                내용입니다사용자가 입력하는 챌린지 내용입니다 사용자가 입력하는
                챌린지 내용입니다 사용자가 입력하는 챌린지 내용입니다사용자가
                입력하는 챌린지 내용입니다 사용자가 입력하는 챌린지
                내용입니다사용자가 입력하는 챌린지 내용입니다사용자가 입력하는
                챌린지 내용입니다 사용자가 입력하는 챌린지 내용입니다
              </span>
            </div>
            <div className="detail_notification">
              <h2>공지사항</h2>
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
              </ul>
            </div>
            <ul className="detail_tag"></ul>
          </StChallengeInfoContainer>
        </StModalContentsContainer>
      </StModalBody>
    </StModalContainer>
  );
}

const StModalContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99;
`;

const StModalBody = styled.div`
  width: 128rem;
  height: 80rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 1.9rem;
`;

const StModalHeader = styled.div`
  width: 100%;
  height: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding-left: 4.6rem;
  button {
    width: 3.2rem;
    height: 3.2rem;
    align-self: flex-end;
    text-align: center;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
  }
  span {
    font-size: 2rem;
  }
  h1 {
    font-size: 4rem;
  }
`;

const StModalContentsContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  padding: 4rem 0 0 4.6rem;
  display: flex;
  justify-content: flex-start;
`;

const StSummeryContainer = styled.div`
  width: 35.4rem;
  height: 51rem;
  display: flex;
  flex-direction: column;
  background-color: blue;
  .challenge_detail_thumbnail {
    width: 100%;
    height: 24rem;
  }

  .footer_button_group {
    button {
      width: 50%;
      border: none;
      border-radius: 0;
      height: 100%;
      font-size: 2rem;
      color: #fff;

      :nth-of-type(1) {
        background-color: #ffa115;
      }
      :nth-of-type(2) {
        background-color: var(--purple-color);
      }
    }
  }
`;

const StSummeryInfoContainer = styled.ul`
  width: 100%;
  height: 22rem;
  background-color: #f5f5f5;
  li {
    width: 100%;
    height: 25%;
    padding-left: 3rem;
    font-size: 2rem;
    display: flex;
    align-items: center;
    svg {
      font-size: 2.5rem;
      margin-right: 1.5rem;
    }
  }
`;

const StButtonGroup = styled.div`
  width: 100%;
  height: 5rem;
`;

const StChallengeInfoContainer = styled.div`
  width: 80.1rem;
  height: 51rem;
  padding-left: 4rem;

  display: flex;
  flex-direction: column;
  .detail_description {
    flex-grow: 1;
    h2 {
      font-size: 2.7rem;
      padding-bottom: 2rem;
    }
    span {
      font-size: 1.7rem;
    }
  }
  .detail_notification {
    width: 100%;
    height: 18rem;

    margin-top: 2rem;
    h2 {
      font-size: 2.7rem;
      padding-bottom: 2rem;
    }
    ul {
      font-size: 1.7rem;
      li {
        list-style: inside;
      }
    }
  }
  .detail_tag {
    width: 100%;
    height: 4rem;
  }
`;

export default ModalBody;
