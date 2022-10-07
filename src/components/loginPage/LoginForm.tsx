import axios from "axios";
import React, { useState, useCallback, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { KAKAO_AUTH_URL } from "./KakaoLogin";
import apis from "../../api/api";
import { useMutation, useQuery } from "react-query";
import { AppContext } from "../../api/context";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [autoLogin, setAutoLogin] = useState<boolean>(false);
  const { state, dispatch } = useContext(AppContext);

  const onChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const loginMutation = useMutation(apis.userLogin, {
    onMutate: (payload) => {},
    onError(error: any, variables, context) {
      toast.error(error.response.data.errorMsg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast_alert",
      });
      throw error;
    },
    onSuccess: (res, variables, context) => {
      const { data, headers } = res;
      sessionStorage.setItem("accessToken", headers.authorization);
      sessionStorage.setItem("userName", data.data.nickname);
      sessionStorage.setItem("userLevel", data.data.level);
      sessionStorage.setItem("userProfile", data.data.profileImg);
      sessionStorage.setItem("userTime", data.data.totalTime);
      sessionStorage.setItem("remainTime", data.data.remainingTime);

      navigate("/");
    },
    onSettled: () => {},
  });

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      loginMutation.mutate({ email, password });
    },
    [email, password]
  );
  const handleToRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <AllContainer>
        <InfoContainer>
          <img src="https://ifh.cc/g/Qfz4QB.png" />
        </InfoContainer>
        <LoginContainer>
          <TitleBox>로그인</TitleBox>
          <form onSubmit={onSubmit}>
            <LoginBox>
              <LoginInput
                type="text"
                placeholder="이메일"
                value={email}
                onChange={onChange1}
              />
              <LoginInput
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={onChange2}
              />
              <LoginBtn type="submit">로그인</LoginBtn>
              {/* <AutoLogin>
                <label htmlFor="chk">자동 로그인</label>
                <input type="checkbox" id="chk" />
              </AutoLogin> */}
            </LoginBox>
          </form>
          <UnderBox>
            <UnderBar />
            SNS 계정으로 간편하게 로그인 하세요
            <UnderBar2 />
          </UnderBox>
          <SocialBox>
            <a
              onClick={() => {
                alert("아직 구현중인 서비스입니다.");
              }}
            >
              <img src="https://ifh.cc/g/17Vbfz.png" />
            </a>
            <a href={KAKAO_AUTH_URL}>
              <img src="https://ifh.cc/g/P3OtOC.png" />
            </a>
          </SocialBox>
          <SignUpBox>
            <p>아직 회원이 아니신가요?</p>
            <button onClick={handleToRegister}>회원가입</button>
          </SignUpBox>
        </LoginContainer>
      </AllContainer>
      <ToastContainer />
    </>
  );
}

export default LoginForm;

const AllContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const InfoContainer = styled.div`
  width: 100rem;
  height: 94rem;
  float: left;
  background: linear-gradient(#f5f1ff, white);
  img {
    width: 88rem;
    margin: 9rem 7rem;
  }
`;

const LoginContainer = styled.div`
  width: 90rem;
  height: 94rem;
  float: right;
  left: 5rem;
`;
const TitleBox = styled.div`
  position: relative;
  top: 5rem;
  margin: 0 37rem;
  width: 16rem;
  height: 6rem;
  font-size: xxx-large;
  font-weight: bold;
  text-align: center;
`;
const UnderBar = styled.hr`
  position: relative;
  width: 11rem;
  float: left;
  top: 16px;
  left: -2rem;
  border: 1px solid white;
  border-top-color: black;
`;

const UnderBar2 = styled.hr`
  position: relative;
  width: 11rem;
  float: right;
  top: 16px;
  left: 2rem;
  border: 1px solid white;
  border-top-color: black;
`;

const UnderBox = styled.div`
  position: relative;
  top: 8rem;
  margin: 0 16rem;
  font-size: 2rem;
  display: flex;
`;

const LoginBox = styled.div`
  position: relative;
  top: 7rem;
  display: flex;
  flex-direction: column;
`;

const SocialBox = styled.div`
  position: relative;
  top: 12rem;
  left: 0rem;
  display: flex;
  flex-direction: column;
  a {
    position: relative;
    left: 12rem;
    width: 43rem;
    height: 6rem;
    margin: 1rem 11rem;
    background-color: white;
    border: solid white;
    cursor: pointer;
  }
  img {
    width: 43rem;
  }
`;
const LoginInput = styled.input`
  width: 44rem;
  height: 6rem;
  margin: 0.5rem auto;
  background-color: #f5f5f5;
  outline: none;
  border: solid white;
  font-size: medium;
`;

const LoginBtn = styled.button`
  width: 44rem;
  height: 5rem;
  margin: 2rem 23rem;
  background-color: #6627f5;
  border: 1px solid white;
  color: white;
  font-size: large;
  font-weight: 600;
  cursor: pointer;
`;
const AutoLogin = styled.div`
  width: 10rem;
  height: 2rem;
  position: relative;
  top: -1rem;
  left: 23rem;
  label {
    font-size: medium;
    font-weight: 500;
  }
`;

const SignUpBox = styled.div`
  width: 48rem;
  position: relative;
  text-align: center;
  top: 14rem;
  left: 21rem;
  button {
    width: 45rem;
    height: 5rem;
    margin: 1rem 1rem;
    background-color: #6627f5;
    border: 1px solid white;
    color: white;
    font-size: large;
    font-weight: 600;
    cursor: pointer;
  }
  p {
    position: relative;
    top: 1rem;
    font-size: 2rem;
  }
`;
