import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import apis from "../api/api";
import { useNavigate, useParams } from "react-router";
import AWS from "aws-sdk";
import imageCompression from "browser-image-compression";
import { getChallengeDetail } from "../api/challengeDetail/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../elements/Button";
import AlertBody from "../components/alerts/NeedLoginAlert";

function PostingPage() {
  const now = new Date();
  const { challengeId } = useParams();
  const [title, setTitle] = useState("");
  const [month, setMonth] = useState("");
  const [time, setTime] = useState("");
  const [targetTime, setTargetTime] = useState(0);
  const [desc, setDesc] = useState("");
  const [info, setInfo] = useState("");
  const [upload, setUpload] = useState<string>("https://ifh.cc/g/RCtOo7.png");
  const [isImg, setIsimg] = useState<boolean>(false);
  const [profileImg, setProfileImg] = useState<File>();
  const [options, setOptions] = useState({
    mic: "",
    cam: "",
    atmosphere: "",
    Character: "",
    sexual: "",
  });
  const titleRef = useRef<HTMLInputElement | null>(null);
  const monthRef = useRef<HTMLInputElement | null>(null);
  const timeRef = useRef<HTMLInputElement | null>(null);
  const targetTimeRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const infoRef = useRef<HTMLTextAreaElement | null>(null);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
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

  const modifyingMutation = useMutation(apis.modifyChallenge, {
    onMutate: async (payload) => {
      await queryClient.cancelQueries(["ALL_CHALLENGE"]);
    },
    onSuccess: (res) => {
      console.log(res);
      navigate("/");
    },
    onError: (error) => {
      throw error;
    },
    onSettled: () => {
      queryClient.invalidateQueries(["ALL_CHALLENGE"]);
    },
  });

  const postingMutation = useMutation(apis.postChallenge, {
    onMutate: async (payload) => {
      await queryClient.cancelQueries(["ALL_CHALLENGE"]);
    },
    onError(error, variables, context) {
      throw error;
    },
    onSuccess: (res, variables, context) => {
      const { data, headers } = res;

      navigate("/");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["ALL_CHALLENGE"]);
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
    if (challengeId) {
      console.log("modify!");
      modifyingMutation.mutate({
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
        challengeId: Number(challengeId),
      });
    } else {
      console.log("post!");
      if (title.length === 0) {
        titleRef.current?.classList.add("error_focus");
        setTimeout(() => {
          titleRef.current?.classList.remove("error_focus");
        }, 1200);
        toast.error("챌린지 제목을 입력해주세요.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "toast_alert",
        });

        return;
      }

      if (month.length === 0) {
        monthRef.current?.classList.add("error_focus");
        setTimeout(() => {
          monthRef.current?.classList.remove("error_focus");
        }, 1200);
        return toast.error("챌린지 시작일을 입력해주세요.", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "light",
          className: "toast_alert",
        });
      } else if (
        Date.parse(
          `${now.getFullYear()}-${
            now.getMonth() + 1 < 10
              ? `0${now.getMonth() + 1}`
              : now.getMonth() + 1
          }-${now.getDate()}T00:00`
        ) > Date.parse(`${month}T00:00`)
      ) {
        monthRef.current?.classList.add("error_focus");
        setTimeout(() => {
          monthRef.current?.classList.remove("error_focus");
        }, 1200);
        return toast.error("과거날짜는 선택하실 수 없어요.", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "light",
          className: "toast_alert",
        });
      }
      if (time.length === 0) {
        timeRef.current?.classList.add("error_focus");
        setTimeout(() => {
          timeRef.current?.classList.remove("error_focus");
        }, 1200);
        console.log(Date.parse(`${month}T00:00`));
        return toast.error("챌린지 시작시간을 입력해주세요.", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "light",
          className: "toast_alert",
        });
      } else if (now.getTime() > Date.parse(`${month}T${time}`)) {
        timeRef.current?.classList.add("error_focus");
        setTimeout(() => {
          timeRef.current?.classList.remove("error_focus");
        }, 1200);
        return toast.error("과거시각은 선택할 수 없어요.", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "light",
          className: "toast_alert",
        });
      }
      if (targetTime === 0) {
        targetTimeRef.current?.classList.add("error_focus");
        setTimeout(() => {
          targetTimeRef.current?.classList.remove("error_focus");
        }, 1200);
        return toast.error("챌린지 목표시간을 입력해주세요.", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "light",
          className: "toast_alert",
        });
      } else if (targetTime < 30) {
        targetTimeRef.current?.classList.add("error_focus");
        setTimeout(() => {
          targetTimeRef.current?.classList.remove("error_focus");
        }, 1200);
        return toast.error("챌린지 시간이 너무 짧아요!", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "light",
          className: "toast_alert",
        });
      }
      if (desc.length === 0) {
        descRef.current?.classList.add("error_focus");
        setTimeout(() => {
          descRef.current?.classList.remove("error_focus");
        }, 1200);
        return toast.error("챌린지 내용을 입력해주세요.", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "light",
          className: "toast_alert",
        });
      }
      if (info.length === 0) {
        infoRef.current?.classList.add("error_focus");
        setTimeout(() => {
          infoRef.current?.classList.remove("error_focus");
        }, 1200);
        return toast.error("챌린지 공지사항을 입력해주세요.", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "light",
          className: "toast_alert",
        });
      }
      if (
        options.mic === "" ||
        options.cam === "" ||
        options.atmosphere === "" ||
        options.Character === "" ||
        options.sexual === ""
      ) {
        return toast.error("챌린지 옵션을 모두 선책해주세요.", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "light",
          className: "toast_alert",
        });
      }
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
    }
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
  console.log(month);
  console.log(now.getFullYear());
  console.log(now.getMonth() + 1);
  console.log(now.getDate());
  console.log(time);
  console.log(Date.parse(`${month}T${time}`));
  useQuery(
    "MP_DETAIL",
    async () => {
      if (challengeId) {
        const res = await getChallengeDetail(Number(challengeId));
        const target = res.detailModal;
        const tags = target.challengeTag;
        setTitle(target.title);
        setDesc(target.content);
        setMonth(target.startDay);
        setTime(target.startTime);
        setTargetTime(target.targetTime);
        setInfo(target.notice);
        setUpload(target.challengeImg);
        setOptions({
          ...options,
          mic: tags[0],
          cam: tags[1],
          atmosphere: tags[2],
          Character: tags[3],
          sexual: tags[4],
        });
      }
    },
    {
      retry: 2,
    }
  );
  useEffect(() => {
    if (optionsRef.current && challengeId) {
      for (let i = 0; i < 5; i++) {
        const target = optionsRef.current.children[i];
        console.log(target);
        const siblings = target.children;
        if (typeof siblings !== "undefined") {
          for (let i = 1; i < siblings.length; i++) {
            siblings[i].classList.remove("selected_option");
            console.log(siblings[i].innerHTML);
            switch (siblings[i].classList[0]) {
              case "mic":
                if (options.mic === siblings[i].innerHTML)
                  siblings[i].classList.add("selected_option");
                continue;
              case "cam":
                if (options.cam === siblings[i].innerHTML)
                  siblings[i].classList.add("selected_option");
                continue;
              case "atmosphere":
                if (options.atmosphere === siblings[i].innerHTML)
                  siblings[i].classList.add("selected_option");
                continue;
              case "character":
                if (options.Character === siblings[i].innerHTML)
                  siblings[i].classList.add("selected_option");
                continue;
              case "sexual":
                if (options.sexual === siblings[i].innerHTML)
                  siblings[i].classList.add("selected_option");
                continue;
            }
          }
        }
      }
    }
  }, [optionsRef.current]);
  return (
    <>
      <StContentsWrapper onSubmit={handleSubmit}>
        <StTopContentsWrapper>
          <div className="title_input">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              name="title"
              placeholder="챌린지 제목을 입력해주세요 {30자 이내}"
              value={title}
              onChange={handleOnChange}
              ref={titleRef}
            />
          </div>
          <div className="day_input">
            <label htmlFor="startDate">시작일</label>
            <input
              type="date"
              name="month"
              onChange={handleOnChange}
              value={month}
              ref={monthRef}
            />
            <input
              type="time"
              name="time"
              onChange={handleOnChange}
              value={time}
              ref={timeRef}
            />
          </div>
          <div className="target_time_input">
            <label htmlFor="targetTime">목표시간</label>
            <input
              type="number"
              name="targetTime"
              onChange={handleOnChange}
              value={targetTime}
              ref={targetTimeRef}
            />
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
                value={desc}
                placeholder="챌린지 목적, 내용을 작성해주세요 {300자 이내}"
                ref={descRef}
              ></textarea>
            </div>
            <div className="info_section">
              <label htmlFor="roomInfo">공지사항</label>
              <textarea
                name="info"
                cols={25}
                rows={7}
                onChange={handleOnChange}
                value={info}
                placeholder="챌린지 진행 시 유의 사항, 공지를 작성해주세요 {100자 이내}"
                ref={infoRef}
              ></textarea>
            </div>
            <StOptionSelectContainer>
              <span className="option_title">옵션</span>
              <div className="option_container" ref={optionsRef}>
                <div className="room_option">
                  <label htmlFor="mic">마이크</label>
                  <button
                    name="mic"
                    className="mic"
                    onClick={handleClickOption}
                  >
                    #마이크 ON
                  </button>
                  <button
                    name="mic"
                    className="mic"
                    onClick={handleClickOption}
                  >
                    #마이크 OFF
                  </button>
                  <button
                    name="mic"
                    className="mic"
                    onClick={handleClickOption}
                  >
                    #상관없음
                  </button>
                </div>
                <div className="room_option">
                  <label htmlFor="cam">화면</label>
                  <button
                    name="cam"
                    className="cam"
                    onClick={handleClickOption}
                  >
                    #화면 ON
                  </button>
                  <button
                    name="cam"
                    className="cam"
                    onClick={handleClickOption}
                  >
                    #화면 OFF
                  </button>
                  <button
                    name="cam"
                    className="cam"
                    onClick={handleClickOption}
                  >
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
              <img src={upload} />

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
          {challengeId && (
            <button onClick={() => navigate("/")}>취소하기</button>
          )}
        </StBottomContentsWrapper>
        <ToastContainer autoClose={2000} position="bottom-right" />
      </StContentsWrapper>
    </>
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
    border: 0.2rem solid transparent;
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
  padding-top: 3rem;
  button {
    width: 40rem;
    height: 5rem;
    :nth-of-type(1) {
      background-color: var(--purple-color);
      color: white;
    }
    :nth-of-type(2) {
      background-color: white;
      border: 0.4rem solid #ffa115;
      color: #ffa115;
      :hover {
        background-color: #ffa115;
        color: white;
      }
    }

    border: none;
    font-size: 2rem;
    cursor: pointer;
  }
`;

export default PostingPage;
