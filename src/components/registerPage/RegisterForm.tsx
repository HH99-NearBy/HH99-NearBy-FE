import React, { useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import AWS from "aws-sdk";
import imageCompression from "browser-image-compression";
import { useMutation, useQuery } from "react-query";
import apis from "../../api/api";
import { useNavigate } from "react-router";
import MAINLOGO from "../../static/main_logo.png";

function RegisterForm() {
  // interface Config {
  //   bucket : string,
  //   region : string,
  //   accessKeyId : string,
  //   secretAccessKey : string
  // }
  const navigate = useNavigate();
  const Config = {
    bucketName: "ssggwan",
    region: "ap-northeast-2",
    accessKeyId: "AKIA5ZVQVLLYCZKG6U5P",
    secretAccessKey: process.env.REACT_APP_AWS_KEY,
  };

  const regin = "ap-northeast-2";
  const bucket = "ssggwan";

  AWS.config.update({
    region: regin,
    accessKeyId: "AKIA5ZVQVLLYCZKG6U5P",
    secretAccessKey: process.env.REACT_APP_AWS_KEY,
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      const options: any = {
        maxSizeMb: 1,
        maxWidthOrHeight: 300,
        useWebWorker: true,
      };
      const reImg = await imageCompression(fileList[0], options);
      setProfileImg(reImg);
      console.log(reImg);

      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: bucket,
          Key: reImg.name,
          Body: reImg,
        },
      });

      const promise = upload.promise();

      promise.then(
        function (data) {
          alert("이미지 업로드에 성공했습니다.");
          setUpload(data.Location);
          setIsimg(true);
          console.log(data.Location);
        },
        function (err) {
          return alert(err);
        }
      );
    }
  };

  //이메일,닉네임,비밀번호,비밀번호 확인,이미지UrL
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkpw, setCheckpw] = useState<string>("");
  const [profileImg, setProfileImg] = useState<File>();
  const [upload, setUpload] = useState<string>("https://ifh.cc/g/RCtOo7.png");

  //오류메세지 상태저장
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [NicknameMessage, setNicknameMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [checkpwMessage, setCheckpwMessage] = useState<string>("");

  //유효성 검사
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isNickname, setIsNick] = useState<boolean>(false);
  const [isPassword, setIspassword] = useState<boolean>(false);
  const [isCheckpw, setIsCheckpw] = useState<boolean>(false);
  const [isImg, setIsimg] = useState<boolean>(false);

  //중복확인
  const [emailCheck, setEmailCheck] = useState<boolean>(false);
  const [nickCheck, setNickCheck] = useState<boolean>(false);

  //비밀번호 보이기,숨기기
  const [showPw, setShowpw] = useState<boolean>(false);

  //이메일
  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);

      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage("이메일 형식이 틀렸습니다!");
        setIsEmail(false);
      } else {
        setEmailMessage("올바른 이메일 형식입니다");
        if (isEmail === false) setIsEmail(true);
      }
    },
    []
  );

  //닉네임
  const onChangeNick = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNickname(e.target.value);

    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNicknameMessage("2글자 이상 5글자 미만으로 입력해주세요.");
      setIsNick(false);
    } else {
      setNicknameMessage("올바른 닉네임 형식입니다.");
      if (isNickname === false) setIsNick(true);
    }
  }, []);

  //비밀번호
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage(
          "숫자+영문자+특수문자 조합 8자리 이상 입력해주세요."
        );
        setIspassword(false);
      } else {
        setPasswordMessage("안전한 비밀번호 입니다.");
        setIspassword(true);
      }
    },
    []
  );

  //비밀번호 확인
  const onChangeCheckpw = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value;
      setCheckpw(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setCheckpwMessage("비밀번호가 같습니다");
        setIsCheckpw(true);
      } else {
        setCheckpwMessage("비밀번호가 다릅니다. 다시 확인해주세요.");
        setIsCheckpw(false);
      }
    },
    [password]
  );

  // const onChangeImg = useCallback((e: React.ChangeEvent<HTMLInput>) => {
  //   const
  // })
  const EmailCheck = useCallback(
    async (e : React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      try {
        const response = await axios.post('http://ssggwan.site/api/emailcheck',{
          email: email
        })
          setEmailCheck(true)
          alert('가입 가능한 이메일입니다.')
          console.log(response)
      }catch (err) {
        setEmailCheck(false)
        alert('중복된 이메일입니다.')
        console.error(err)
      }
    },[email])

  // const EmailCheck =  (
  //   async (e: React.MouseEvent<HTMLButtonElement>) => {
  //     e.preventDefault();
  //     let result;
  //     try {
  //       result = await emailMutation();
  //     } catch (error) {
  //       console.log(error)
  //       // error handler
  //     }
  //   });

  const NicknameCheck = useCallback(
    async (e : React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      try {
       const response = await axios.post('http://ssggwan.site/api/nicknamecheck',{
          nickname: nickname
        })
          setNickCheck(true)
          alert('가입 가능한 닉네임입니다.')
          console.log(response)
      }catch (err) {
        alert('중복된 닉네임 입니다.')
        setNickCheck(false)
        console.error(err)
      }
    },[nickname])

  // const NicknameCheck = useCallback(
  //   (e: React.MouseEvent<HTMLButtonElement>) => {
  //     e.preventDefault();
  //     nickNameMutation.mutate(nickname);
  //   },
  //   [nickname]
  // );

  const registerMutation = useMutation(apis.userRegister, {
    onMutate: (payload) => {
      console.log("onmutate", payload);
    },
    onError(error, variables, context) {
      console.log(error)
      throw error;
    },
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
      const rrs = "인증 메일이 발송되었습니다.\n"
      const aar = "인증을 완료해 주십시오."
      alert(rrs+aar);
      navigate("/login");
    },
    onSettled: () => {
      console.log("end");
    },
  });
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      registerMutation.mutate({
        email,
        nickname,
        password,
        profileImg: upload,
      });
    },
    [email, nickname, password, upload]
  );

  // const onSubmit = useCallback(
  //   async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     try {
  //       const response = await axios.post("http://ssggwan.site/api/signup", {
  //         email: email,
  //         nickname: nickname,
  //         password: password,
  //         profileImg: upload,
  //       });
  //       alert("회원가입을 축하드립니다!");
  //       navigate("/login")
  //       console.log(response);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   },
  //   [email, nickname, password, upload]
  // );

  const toggleHidePassword = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowpw(!showPw);
  };

  return (
    <>
      <SignupContainer>
        <LogoBox>
          <img src={MAINLOGO} />
        </LogoBox>
        <FormBox onSubmit={onSubmit}>
          <SignupBox>
            <ImgBox>
              <TitleBox>회원가입</TitleBox>
              <FileBox>
                {isImg ? (
                  <img src={upload} />
                ) : (
                  <img src="https://ifh.cc/g/RCtOo7.png" />
                )}
                <label htmlFor="input-file">사진 등록하기</label>
                <input
                  type="file"
                  id="input-file"
                  placeholder="사진추가"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </FileBox>
            </ImgBox>
            <TetxBox>
              <TextP>이메일</TextP>
              <TextP>닉네임</TextP>
              <TextP>비밀번호</TextP>
              <TextP>비밀번호 확인</TextP>
            </TetxBox>
            <SignBox2>
              <CheckBox>
                <div>
                  <InputSt
                    name="email"
                    id="eamil"
                    type="id"
                    placeholder="이메일을 입력해 주세요."
                    value={email}
                    onChange={onChangeEmail}
                  />
                  <CheckBtn onClick={EmailCheck} disabled={!(isEmail)}>중복확인</CheckBtn>
                  {email.length > 0 && (
                    <p className={`message ${isEmail ? "success" : "error"}`}>
                      {emailMessage}
                    </p>
                  )}
                </div>
              </CheckBox>
              <CheckBox>
                <div>
                  <InputSt
                    type="text"
                    placeholder="닉네임을 입력해 주세요."
                    value={nickname}
                    onChange={onChangeNick}
                  />
                  <CheckBtn onClick={NicknameCheck} disabled={!(isNickname)}>중복확인</CheckBtn>
                  {nickname.length > 0 && (
                    <p
                      className={`message ${isNickname ? "success" : "error"}`}
                    >
                      {NicknameMessage}
                    </p>
                  )}
                </div>
              </CheckBox>
              <CheckBox>
                <div>
                  <InputSt
                    type={showPw ? "text" : "password"}
                    placeholder="비밀번호를 입력해 주세요."
                    value={password}
                    onChange={onChangePassword}
                  />
                  {showPw ? (
                    <CheckBtn onClick={toggleHidePassword}>HIDE</CheckBtn>
                  ) : (
                    <CheckBtn onClick={toggleHidePassword}>SHOW</CheckBtn>
                  )}
                  {password.length > 0 && (
                    <p
                      className={`message ${isPassword ? "success" : "error"}`}
                    >
                      {passwordMessage}
                    </p>
                  )}
                </div>
              </CheckBox>
              <CheckBox>
                <div>
                  <InputSt
                    type={showPw ? "text" : "password"}
                    placeholder="비밀번호 확인"
                    value={checkpw}
                    onChange={onChangeCheckpw}
                  />
                  {showPw ? (
                    <CheckBtn onClick={toggleHidePassword}>HIDE</CheckBtn>
                  ) : (
                    <CheckBtn onClick={toggleHidePassword}>SHOW</CheckBtn>
                  )}
                  {checkpw.length > 0 && (
                    <p className={`message ${isCheckpw ? "success" : "error"}`}>
                      {checkpwMessage}
                    </p>
                  )}
                </div>
              </CheckBox>
            </SignBox2>
          </SignupBox>
          <SubmitBtn>
            <input
              type="submit"
              value="확인"
              disabled={
                !(
                  isEmail &&
                  isNickname &&
                  isPassword &&
                  isCheckpw &&
                  emailCheck &&
                  nickCheck
                )
              }
            />
          </SubmitBtn>
        </FormBox>
      </SignupContainer>
    </>
  );
}

export default RegisterForm;

const SignupContainer = styled.div`
  width: 167rem;
  padding-top: 15rem;
  padding-right: 0rem;
  padding-bottom: 14rem;
  padding-left: 28rem;
  margin: 8rem auto;
  display: flex;
`;

const SignupBox = styled.div`
  width: 150rem;
  height: 49rem;
  margin: auto 2rem;
  display: flex;
`;

const ImgBox = styled.div`
  float: left;
  width: 44rem;
  padding: 5rem;
  margin: 0 8rem;
`;

const FileBox = styled.div`
  display: inline-block;
  height: 30rem;
  width: 45rem;
  vertical-align: middle;
  border: 1px solid white;
  img {
    width: 36rem;
  }
  label {
    background-color: #6627f5;
    color: white;
    padding: 1rem 12.5rem;
    position: relative;
    font-size: large;
    font-weight: bold;
    cursor: pointer;
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

const SignBox2 = styled.div`
  width: 74rem;
  padding: 5rem;
  float: right;
  margin: auto;
  flex-direction: row;
  align-items: center;
`;

const CheckBox = styled.div`
  position: relative;
  p {
    font-size: small;
    margin: -10px auto;
    &.success {
      color: green;
    }
    &.error {
      color: red;
    }
  }
`;

const CheckBtn = styled.button`
  position: absolute;
  width: 12rem;
  height: 6rem;
  margin: 2.2rem 0;
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
  width: 50rem;
  height: 6rem;
  margin: 2.2rem -5rem;
  background-color: #f5f5f5;
  border: solid white;
  font-size: medium;
  outline: none;
`;

const LogoBox = styled.div`
  width: 20rem;
  height: 10rem;
  position: relative;
  top: -13rem;
  left: 48rem;
  text-align: center;
`;

const TetxBox = styled.div`
  width: 12rem;
  margin: 1rem 0;
`;

const TextP = styled.p`
  font-size: large;
  font-weight: bold;
  margin: 8rem auto;
`;
const TitleBox = styled.div`
  width: 160px;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const SubmitBtn = styled.div`
  margin: 1rem 53rem;
  input[type="submit"] {
    width: 45rem;
    height: 4rem;
    background-color: #6627f5;
    border: 1px solid white;
    color: white;
    font-size: xx-large;
    font-weight: bold;
    &:disabled {
      background-color: gray;
    }
    cursor: pointer;
  }
`;
const FormBox = styled.form`
  position: relative;
  right: 21rem;
`;
