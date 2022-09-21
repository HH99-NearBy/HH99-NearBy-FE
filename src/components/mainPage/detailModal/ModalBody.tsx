import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getChallengeDetail } from "../../../api/challengeDetail/api";
import { BsFillPersonFill } from "react-icons/bs";
import { BiCalendarCheck } from "react-icons/bi";
import { IoMdAlarm } from "react-icons/io";
import { MdOutlineTimer } from "react-icons/md";
import { GetModalDetail } from "../../../api/challengeDetail/types";
import { AppContext } from "../../../api/context/index";
import { useNavigate } from "react-router";
import apis from "../../../api/api";
import Button from "../../../elements/Button";

function ModalBody({
  handleToggleModal,
  postId,
}: {
  handleToggleModal: () => void;
  postId: number;
}) {
  const [body, setBody] = useState<GetModalDetail | null>(null);
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const req = useQuery(
    "CHALLENGE_DETAIL",
    async () => {
      const res = await getChallengeDetail(state.challengeId);
      console.log(res);
      setBody(res);
    },
    {
      retry: 2,
    }
  );
  const deleteChallengeMutation = useMutation(apis.deleteChallenge, {
    onMutate: (payload) => {
      console.log("onmutate", payload);
    },
    onError(error, variables, context) {
      throw error;
    },
    onSuccess: (res, variables, context) => {
      navigate("/");
    },
    onSettled: () => {
      console.log("end");
    },
  });
  console.log(body);
  console.log(state.challengeStatus);
  const hour = body?.detailModal.startTime.slice(0, 2);
  const minute = body?.detailModal.startTime.slice(3, 5);
  const handleEnterRoom = () => {
    navigate(`/challenging/${state.challengeId}`);
  };
  const handleRecruitChallenge = () => {
    apis.recruitChallenge(state.challengeId);
    handleToggleModal();
  };
  const handleCancleChallenge = () => {
    apis.cancelRecruit(state.challengeId);
  };
  const handleModifyChallenge = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/modify/${state.challengeId}`);
  };
  const handleDeleteChallenge = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deleteChallengeMutation.mutate(state.challengeId);
    handleToggleModal();
  };
  const now = new Date();
  const createdAt = new Date(
    `${body?.detailModal.startDay}T${body?.detailModal.startTime}`
  );
  const endTime = Date.parse(`${body?.detailModal.endTime}`);
  console.log(body?.detailModal.endTime);
  console.log(endTime);
  console.log(Date.now());

  return (
    <StModalContainer>
      <StModalBody>
        <StModalHeader>
          <button onClick={handleToggleModal}>X</button>
          <div>
            <span>{body?.detailModal.level}</span>
            <span>{body?.detailModal.writer}</span>
            <span>
              {body?.detailModal.writer ===
                sessionStorage.getItem("userName") && `⭐`}
            </span>
            {body?.detailModal.writer ===
              sessionStorage.getItem("userName") && (
              <div className="challenge_btn_container">
                <button onClick={handleModifyChallenge}>수정</button>
              </div>
            )}
          </div>
          <h1>{body?.detailModal.title}</h1>
        </StModalHeader>
        <StModalContentsContainer>
          <StSummeryContainer>
            <img
              src={body?.detailModal.challengeImg}
              alt="챌린지 썸네일이미지입니다"
              className="challenge_detail_thumbnail"
            />
            <StSummeryInfoContainer>
              <li>
                {<BiCalendarCheck />}
                {body?.detailModal.startDay}
              </li>
              <li>
                {<IoMdAlarm />}
                {typeof hour === "string" && parseInt(hour) < 12
                  ? `오전 ${hour}:${minute}`
                  : typeof hour === "string" &&
                    `오후 ${parseInt(hour) - 12}:${minute}`}
              </li>
              <li>
                {<MdOutlineTimer />}
                {`${body?.detailModal.targetTime}분`}
              </li>
              <li>
                {<BsFillPersonFill />}
                {`모집 ${body?.detailModal.participatePeople}/${body?.detailModal.limitPeople}`}
              </li>
            </StSummeryInfoContainer>
            <StButtonGroup className="footer_button_group">
              {state.challengeStatus === "doing" ? (
                <button
                  className="challenge_recruit_button"
                  onClick={handleRecruitChallenge}
                >
                  참가하기
                </button>
              ) : now < createdAt ? (
                <button className="not_yet_button">시작 전</button>
              ) : (
                <button
                  className="challenge_enter_button"
                  onClick={handleEnterRoom}
                >
                  입장하기
                </button>
              )}
              {/* //status => doing:모집중, recruit: 신청했으나 시작하지 않음, running: 신청했고 시작한 챌린지 */}
              {/* {state.challengeStatus === "doing" ? null : (
                <button onClick={handleCancleChallenge}>취소하기</button>
              )} */}
              {state.challengeStatus === "doing" ? null : body?.detailModal
                  .writer === sessionStorage.getItem("userName") ? (
                <button onClick={handleDeleteChallenge}>챌린지 삭제</button>
              ) : (
                <button onClick={handleCancleChallenge}>취소하기</button>
              )}
            </StButtonGroup>
          </StSummeryContainer>
          <StChallengeInfoContainer>
            <div className="detail_description">
              <h2>내용</h2>
              <span>{body?.detailModal.content}</span>
            </div>
            <div className="detail_notification">
              <h2>공지사항</h2>
              <span> {body?.detailModal.notice}</span>
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
  position: relative;
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
  div {
    display: flex;
    align-items: center;
    font-size: 2rem;
    height: 3rem;
    span {
      height: 3rem;
      display: flex;
      align-items: center;
    }
    .challenge_btn_container {
      button {
        width: 4rem;
        height: 3rem;
        border: none;
        letter-spacing: 0.1rem;
        :nth-of-type(1) {
          background-color: var(--purple-color);
          margin-left: 1.5rem;
        }
        :nth-of-type(2) {
          background-color: red;
          margin-left: 0.5rem;
        }
        cursor: pointer;
        color: white;
        font-size: 1.5rem;
      }
    }
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
    display: flex;
    button {
      width: 50%;
      border: none;
      border-radius: 0;
      height: 100%;
      font-size: 2rem;
      color: #fff;
      cursor: pointer;
      :nth-of-type(1) {
        flex-grow: 1;
      }

      :nth-of-type(2) {
        color: var(--purple-color);
        :hover {
          color: white;
          background-color: var(--purple-color);
        }
      }
    }
    .challenge_enter_button {
      background-color: #ffa115;
    }
    .challenge_recruit_button {
      background-color: #ffffff;
      color: #ffa115;
      border: 0.4rem solid #ffa115;
      :hover {
        background-color: #ffa115;
        color: #ffffff;
      }
    }
    .not_yet_button {
      background-color: #e3e3e3;
      color: black;
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
    span {
      font-size: 1.7rem;
    }
  }
  .detail_tag {
    width: 100%;
    height: 4rem;
  }
`;

export default ModalBody;
