import React, {useState} from "react";
import styled from "styled-components";

function LoginForm() {

// const localToken = localStorage.getItem()

const [email, setEmail] = useState<string>('');
const [password, setPassword] = useState<string>('');
const [autoLogin, setAutoLogin] = useState<boolean>(false)

const onChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
  setEmail(e.target.value);
  console.log(email)
}

const onChange2 = (e : React.ChangeEvent<HTMLInputElement>) => {
  setPassword(e.target.value)
  console.log(password)
}


  return (
    <>
    <AllContainer>
    <InfoContainer>
      <img src ="https://ifh.cc/g/Qfz4QB.png"/>
    </InfoContainer>
    <LoginContainer>
      <TitleBox>로그인</TitleBox>
        <LoginBox>
          <LoginInput type = "text" placeholder="이메일" value={email} onChange ={onChange1}/>
          <LoginInput type = "text" placeholder="비밀번호" value={password} onChange ={onChange2}/>
          <LoginBtn>로그인</LoginBtn>
           <AutoLogin>
            <label htmlFor="chk">자동 로그인</label>
           <input type ='checkbox' id = "chk"/>
           </AutoLogin>
        </LoginBox>
      <UnderBox>
      <UnderBar/>SNS 계정으로 간편하게 로그인 하세요<UnderBar2/>
      </UnderBox>
      <SocialBox>
        <button><img src = "https://ifh.cc/g/17Vbfz.png"/></button>
        <button><img src = "https://ifh.cc/g/P3OtOC.png"/></button>
      </SocialBox>
      <SignUpBox>
          <p>아직 회원이 아니신가요?</p>
        <button>회원가입</button>
      </SignUpBox>
    </LoginContainer>
    </AllContainer>
    </>
  )
}

export default LoginForm

const AllContainer =styled.div`
  position: relative;
  display: flex;
`

const InfoContainer =styled.div`
  border: 1px solid red;
  width: 81.6rem;
  height: 57.5rem;
  float: left;
  background:linear-gradient(#F5F1FF, white) ;
  img {
    width: 50rem;
    margin: 9rem 7rem;
  }

`

const LoginContainer = styled.div`
  border: 1px solid black;
  width: 66rem;
  height: 58rem;
  float: right;
  left: 5rem;
`
const TitleBox = styled.div`
  border: 1px solid black;
  position: relative;
    top: 4rem;
    left: 20rem;
    width: 13rem;
    height: 4rem;
    font-size: xxx-large;
    font-weight: bold;
    text-align: center;
`
const UnderBar = styled.hr`
  position: relative;
  width: 5rem;
  float: left;
  top: 3px;
  left: 5rem;
  border: 1px solid white;
  border-top-color: black;
`

const UnderBar2 = styled.hr`
  position: relative;
  width: 5rem;
  float: right;
  top: 3px;
  right: 5rem;
  border: 1px solid white;
  border-top-color: black;
`

const UnderBox = styled.div`
  position: relative;
  top: 10rem;
  display: flex;
`

const LoginBox = styled.div`
  border: 1px solid green;
  position: relative;
  top: 7rem;
  display: flex;
  flex-direction: column;
`

const SocialBox = styled.div`
  border: 1px solid blue;
  position: relative;
  top: 12rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  button {
    position: relative;
    left: 12rem;
    width: 29rem;
    height: 4rem;
    margin: 0.5rem 0;
    background-color: white;
    border: solid white;
    cursor: pointer;
  }
  img{
    width: 29rem;
  }
`
const LoginInput = styled.input`
    width: 27rem;
    height: 3rem;
    margin: 0.5rem auto;
    background-color: #F5F5F5;
    border: solid white;
    font-size: medium;
`

const LoginBtn = styled.button`
    width: 27.5rem;
    height: 3.5rem;
    margin: 1rem 14rem;
    background-color:#6627F5 ;
    border: 1px solid white;
    color: white;
    font-size: large;
    font-weight: 600;
    cursor: pointer;
`
const AutoLogin = styled.div`
  border: 1px solid black;
  width: 7rem;
    height: 2rem;
    position: relative;
    top: 0rem;
    left: 14rem;
    label {
      font-size: medium;
      font-weight: 500;
    }
`

const SignUpBox = styled.div`
  border: 1px solid black;
  width: 13rem;
  position: relative;
  text-align: center;
  top: 14rem;
  left: 21rem;
  button {
    width: 27.5rem;
    height: 3.5rem;
    margin: 1rem -7rem;
    background-color: #6627F5;
    border: 1px solid white;
    color: white;
    font-size: large;
    font-weight: 600;
    cursor: pointer;
  }
  p {
    position: relative;
    top: 1rem;
  }
 
`
