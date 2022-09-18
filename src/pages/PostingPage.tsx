import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import apis from "../api/api";
import { useNavigate } from "react-router";
import AWS from "aws-sdk";
import imageCompression from "browser-image-compression";

function PostingPage() {
  const [title, setTitle] = useState("");
  const [month, setMonth] = useState("");
  const [time, setTime] = useState("");
  const [targetTime, setTargetTime] = useState(0);
  const [desc, setDesc] = useState("");
  const [info, setInfo] = useState("");
  const [upload, setUpload] = useState<string>("");
  const [isImg, setIsimg] = useState<boolean>(false);
  const [profileImg, setProfileImg] = useState<File>();
  const [options, setOptions] = useState({
    mic: "",
    cam: "",
    atmosphere: "",
    Character: "",
    sexual: "",
  });
  const Config = {
    bucketName: "ssggwan",
    region: "ap-northeast-2",
    accessKeyId: "AKIA5ZVQVLLYCZKG6U5P",
    secretAccessKey: process.env.REACT_APP_AWS_KEY,
  };

  const region = "ap-northeast-2";
  const bucket = "ssggwan";

  AWS.config.update({
    region,
    accessKeyId: "AKIA5ZVQVLLYCZKG6U5P",
    secretAccessKey: process.env.REACT_APP_AWS_KEY,
  });
  const navigate = useNavigate();

  const postingMutation = useMutation(apis.postChallenge, {
    onMutate: (payload) => {},
    onError(error, variables, context) {
      throw error;
    },
    onSuccess: (res, variables, context) => {
      const { data, headers } = res;

      navigate("/");
    },
    onSettled: () => {
      console.log("end");
    },
  });
  const handleOnChange = (e: React.ChangeEvent) => {
    const input = e.currentTarget as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = input;
    if (input !== undefined) {
      switch (name) {
        case "title":
          return setTitle(value);
        case "month":
          return setMonth(value);
        case "time":
          return setTime(value);
        case "targetTime":
          return setTargetTime(Number(value));
        case "desc":
          return setDesc(value);
        case "info":
          return setInfo(value);
      }
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postingMutation.mutate({
      title,
      challengeImg: upload,
      startDay: month,
      startTime: time,
      targetTime: targetTime,
      content: desc,
      notice: info,
      challengeTag: [
        options.mic,
        options.cam,
        options.atmosphere,
        options.Character,
        options.sexual,
      ],
    });
  };
  const handleClickOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const siblings = e.currentTarget.parentElement?.children;
    if (typeof siblings !== "undefined") {
      for (let i = 1; i < siblings.length; i++) {
        siblings[i].classList.remove("selected_option");
      }
      e.currentTarget.classList.add("selected_option");
    }
    const name = e.currentTarget.classList[0];
    const body = e.currentTarget.textContent;

    if (body !== null) {
      switch (name) {
        case "mic":
          return setOptions({ ...options, mic: body });
        case "cam":
          return setOptions({ ...options, cam: body });
        case "atmosphere":
          return setOptions({ ...options, atmosphere: body });
        case "character":
          return setOptions({ ...options, Character: body });
        case "sexual":
          return setOptions({ ...options, sexual: body });
      }
    }
  };
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
  return (
    <StContentsWrapper onSubmit={handleSubmit}>
      <StTopContentsWrapper>
        <div className="title_input">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            name="title"
            placeholder="챌린지 제목을 입력해주세요"
            onChange={handleOnChange}
          />
        </div>
        <div className="day_input">
          <label htmlFor="startDate">시작일</label>
          <input type="date" name="month" onChange={handleOnChange} />
          <input type="time" name="time" onChange={handleOnChange} />
        </div>
        <div className="target_time_input">
          <label htmlFor="targetTime">목표시간</label>
          <input type="text" name="targetTime" onChange={handleOnChange} />
          <span>분</span>
        </div>
      </StTopContentsWrapper>
      <div className="center_wrapper">
        <StMainContentsWrapper>
          <div className="desc_section">
            <label htmlFor="desc">내용</label>
            <textarea
              name="desc"
              cols={50}
              rows={10}
              onChange={handleOnChange}
            ></textarea>
          </div>
          <div className="info_section">
            <label htmlFor="roomInfo">공지사항</label>
            <textarea
              name="info"
              cols={25}
              rows={7}
              onChange={handleOnChange}
            ></textarea>
          </div>
          <StOptionSelectContainer>
            <span className="option_title">옵션</span>
            <div>
              <div className="room_option">
                <label htmlFor="mic">마이크</label>
                <button name="mic" className="mic" onClick={handleClickOption}>
                  #마이크 ON
                </button>
                <button name="mic" className="mic" onClick={handleClickOption}>
                  #마이크 OFF
                </button>
                <button name="mic" className="mic" onClick={handleClickOption}>
                  #상관없음
                </button>
              </div>
              <div className="room_option">
                <label htmlFor="cam">화면</label>
                <button name="cam" className="cam" onClick={handleClickOption}>
                  #화면 ON
                </button>
                <button name="cam" className="cam" onClick={handleClickOption}>
                  #화면 OFF
                </button>
                <button name="cam" className="cam" onClick={handleClickOption}>
                  #상관없음
                </button>
              </div>
              <div className="room_option">
                <label htmlFor="atmosphere">분위기</label>
                <button
                  name="atmosphere"
                  className="atmosphere"
                  onClick={handleClickOption}
                >
                  #활발한
                </button>
                <button
                  name="atmosphere"
                  className="atmosphere"
                  onClick={handleClickOption}
                >
                  #조용한
                </button>
                <button
                  name="atmosphere"
                  className="atmosphere"
                  onClick={handleClickOption}
                >
                  #자유로운
                </button>
              </div>
              <div className="room_option">
                <label htmlFor="character">성격</label>
                <button
                  name="character"
                  className="character"
                  onClick={handleClickOption}
                >
                  #정보공유
                </button>
                <button
                  name="character"
                  className="character"
                  onClick={handleClickOption}
                >
                  #동기부여
                </button>
                <button
                  name="character"
                  className="character"
                  onClick={handleClickOption}
                >
                  #도전적인
                </button>
              </div>
              <div className="room_option">
                <label htmlFor="sexual">성별제한</label>
                <button
                  name="sexual"
                  className="sexual"
                  onClick={handleClickOption}
                >
                  #남성
                </button>
                <button
                  name="sexual"
                  className="sexual"
                  onClick={handleClickOption}
                >
                  #여성
                </button>
                <button
                  name="sexual"
                  className="sexual"
                  onClick={handleClickOption}
                >
                  #성별무관
                </button>
              </div>
            </div>
          </StOptionSelectContainer>
        </StMainContentsWrapper>
        <StSideContentsWrapper>
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
        </StSideContentsWrapper>
      </div>
      <StBottomContentsWrapper>
        <button>등록하기</button>
      </StBottomContentsWrapper>
    </StContentsWrapper>
  );
}

const StContentsWrapper = styled.form`
  min-height: 100vh;
  width: 128rem;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  .center_wrapper {
    display: flex;
    width: 100%;
    height: 70rem;
  }
`;

const StTopContentsWrapper = styled.div`
  width: 100%;
  height: 8rem;
  margin-top: 4rem;
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  label {
    padding-right: 3rem;
  }
  input {
    font-size: 2rem;
    background-color: #f5f5f5;
    border: none;
    height: 3.8rem;
    padding: 0.2rem;
    ::placeholder {
      font-size: 1.5rem;
      font-weight: 300;
    }
  }
  div {
    display: flex;
    align-items: center;
  }
  .title_input {
    input {
      width: 32rem;
    }
  }
  .day_input {
    padding-left: 8rem;
    input {
      font-size: 1.5rem;
      width: 13.5rem;
      :nth-of-type(1) {
        margin-right: 2rem;
      }
    }
  }
  .target_time_input {
    padding-left: 12rem;
    input {
      width: 12.5rem;
    }
    span {
      padding-left: 1rem;
      font-size: 1.6rem;
      align-self: flex-end;
    }
  }
`;

const StMainContentsWrapper = styled.div`
  width: 75%;
  label {
    font-size: 2.5rem;
    padding-right: 3rem;
  }
  textarea {
    outline: none;
    resize: none;
    :focus {
      outline: 0.1rem solid var(--purple-color);
    }
  }
  .desc_section {
    display: flex;
    padding-bottom: 3.9rem;
    label {
      padding-right: 8rem;
    }
  }
  .info_section {
    display: flex;
  }
`;

const StOptionSelectContainer = styled.div`
  display: flex;
  padding-top: 3rem;
  .option_title {
    padding-top: 0.2rem;
    padding-right: 8rem;
    font-size: 2.5rem;
  }
  .room_option {
    padding-bottom: 1rem;
    label {
      display: inline-block;
      font-size: 2.1rem;
      width: 11.2rem;
    }
    button {
      width: 13rem;
      height: 4rem;
      border: none;
      border-radius: 10rem;
      font-size: 1.5rem;
      cursor: pointer;
      margin-right: 2rem;
    }
  }
`;

const StSideContentsWrapper = styled.div`
  width: 25%;
`;

const FileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30rem;
  width: 100%;
  img {
    width: 100%;
  }
  label {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #6627f5;
    color: white;
    padding: 1rem 0;
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

const StBottomContentsWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  padding-top: 2rem;
  button {
    width: 40rem;
    height: 5rem;
    background-color: var(--purple-color);
    color: white;
    border: none;
    font-size: 2rem;
    cursor: pointer;
  }
`;

export default PostingPage;
