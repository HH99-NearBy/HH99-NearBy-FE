import axios from "axios";
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function KakaoForm({
  kakaoId,
  profileImg,
}: {
  kakaoId: number;
  profileImg: string;
}) {
  const navigate = useNavigate();
  // 닉네임 검사

  const [nickname, setNickname] = useState<string>("");

  //오류메세지 상태저장
  const [NicknameMessage, setNicknameMessage] = useState<string>("");

  //유효성 검사
  const [isNickname, setIsNick] = useState<boolean>(false);

  //중복확인
  const [nickCheck, setNickCheck] = useState<boolean>(false);

  const onChangeNick = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNickname(e.target.value);

    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNicknameMessage("2글자 이상 5글자 미만으로 입력해주세요.");
      setIsNick(false);
    } else {
      setNicknameMessage("올바른 닉네임 형식입니다.");
      setIsNick(true);
    }
  }, []);

  //닉네임 중복체크
  const NicknameCheck = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "https://ssggwan.site/api/nicknamecheck",
          {
            nickname: nickname,
          }
        );
        setNickCheck(true);
        alert("가입 가능한 닉네임입니다.");
      } catch (err) {
        setNickCheck(false);
        alert("중복된 닉네임 입니다.");
      }
    },
    [nickname]
  );

  const KakaoSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "https://ssggwan.site/api/kakaosign",
          {
            kakaoId: kakaoId,
            profileImg: profileImg,
            nickname: nickname,
          }
        );
        const { data, headers } = response;
        sessionStorage.setItem("accessToken", headers.authorization);
        sessionStorage.setItem("userName", data.data.nickname);
        sessionStorage.setItem("userLevel", data.data.level);
        sessionStorage.setItem("userProfile", data.data.profileImg);
        sessionStorage?.setItem("userTime", data.data.totalTime);
        sessionStorage?.setItem("remainTime", data.data.remainingTime);
        alert("로그인 완료");
        navigate("/");
      } catch (err) {
        alert("로그인 실패");
      }
    },
    [nickname]
  );

  return (
    <>
      <form onSubmit={KakaoSubmit}>
        <SubmitBox>
          <InputSt
            type="text"
            placeholder="닉네임을 입력해 주세요."
            value={nickname}
            onChange={onChangeNick}
          />
          <div>
            <CheckBtn onClick={NicknameCheck}>중복확인</CheckBtn>
          </div>
        </SubmitBox>
        <CheckBox>
          {nickname.length > 0 && (
            <ChcekP className={`message ${isNickname ? "success" : "error"}`}>
              {NicknameMessage}
            </ChcekP>
          )}
          <input
            type="submit"
            value="확인"
            disabled={!(isNickname && nickCheck)}
          />
        </CheckBox>
      </form>
    </>
  );
}

export default KakaoForm;

const SubmitBox = styled.div`
  width: 63rem;
  height: 6rem;
  margin: 0rem auto;
  margin-top: 28rem;
  display: flex;
  div {
    width: 13rem;
  }
`;

const ChcekP = styled.p`
  display: flex;
  font-size: small;
  margin: 0 auto;
  justify-content: center;
  &.success {
    color: green;
  }
  &.error {
    color: red;
  }
`;

const CheckBox = styled.div`
  width: 55rem;
  height: 10rem;
  margin: 0rem auto;
  justify-content: center;
  display: flex;
  flex-direction: column;
  input[type="submit"] {
    justify-content: center;
    display: flex;
    margin: 0 auto;
    width: 12rem;
    height: 5rem;
    font-size: xx-large;
    font-weight: bold;
    color: white;
    border: none;
    background-color: #6627f5;
    &:disabled {
      background-color: gray;
    }
  }
`;

const CheckBtn = styled.button`
  width: 12rem;
  height: 5rem;
  background-color: #777777;
  border: solid white;
  color: white;
  font-size: medium;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #6627f5;
    transition: 0.5s ease-out;
  }
`;

const InputSt = styled.input`
  width: 48rem;
  height: 5rem;
  background-color: #f5f5f5;
  border: solid white;
  font-size: medium;
  outline: none;
  display: flex;
`;
