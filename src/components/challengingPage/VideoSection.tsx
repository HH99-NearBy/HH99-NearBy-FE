import { OpenVidu, StreamManager } from "openvidu-browser";
import { Session } from "openvidu-browser/lib/OpenVidu/Session";
import { Subscriber } from "openvidu-browser/lib/OpenVidu/Subscriber";
import React, { useState, useCallback, useEffect, useContext } from "react";
import styled from "styled-components";
import UserVideoCard from "./videoSection/UserVideoCard";
import apis from "../../api/api";
import ovApis from "../../api/openvidu/api";
import { Publisher } from "openvidu-browser/lib/OpenVidu/Publisher";
import { AppContext } from "../../api/context/index";
import { useParams } from "react-router-dom";

interface InitState {
  mySessionId: string;
  myUserName: string;
  session: undefined | Session;
  publisher: undefined | Publisher;
  subscribers: Subscriber[];
}

function VideoSection() {
  const { state, dispatch } = useContext(AppContext);
  const { challengeId } = useParams();
  console.log(challengeId);
  const [initialState, setInitialState] = useState<InitState>({
    mySessionId: "",
    myUserName: "",
    session: undefined,
    publisher: undefined,
    subscribers: [],
  });
  const [ov, setOv] = useState<OpenVidu | undefined>();
  const [session, setSession] = useState<Session | undefined>();
  const [initUserData, setInitUserData] = useState({
    mySessionId: "",
    myUserName: "",
  });
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscribers, setSubscribers] = useState<Array<StreamManager>>([]);
  // dispatch({ type: "READ_SUBSCRIBERS", payload: -1, subscribe: subscribers });
  const handleVideoStatus = () => {
    publisher?.publishVideo(!publisher.stream.videoActive);
    console.log(publisher);
  };
  const handleAudioStatus = () => {
    publisher?.publishAudio(!publisher.stream.audioActive);
  };
  const connection = useCallback(() => {
    if (session !== undefined && ov !== undefined) {
      ovApis.getOVToken(async (token: string) => {
        session
          .connect(token, { clientData: Math.random() })
          .then(async () => {
            console.log("session connect");
            await ov
              .getUserMedia({
                audioSource: false,
                videoSource: undefined,
                resolution: "640x480",
                frameRate: 60,
              })
              .then((mediaStream) => {
                const videoTrack = mediaStream.getVideoTracks()[0];
                console.log(mediaStream.getVideoTracks());
                const publisher = ov.initPublisher("video_container", {
                  audioSource: undefined,
                  videoSource: videoTrack,
                  publishAudio: true,
                  publishVideo: true,
                  insertMode: "APPEND",
                  mirror: true,
                });
                publisher.once("accessAllowed", () => {
                  session.publish(publisher);
                  setPublisher(publisher);
                });
              });
          })
          .catch((error) => {
            throw error;
          });
      }, Number(challengeId));
    }
  }, [session]);

  const joinSession = () => {
    const OV = new OpenVidu();
    OV.enableProdMode();
    const session = OV.initSession();
    session.on("streamCreated", (event: any) => {
      console.log("streamCreated");
      const sub = session.subscribe(event.stream, "video_container");
      console.log(state.ovSubscribers);
      // setSubscribers([...subscribers, sub]);
      dispatch({
        type: "READ_SUBSCRIBERS",
        payload: -1,
        subscribe: sub,
      });
    });
    session.on("streamDestroyed", (event: any) => {
      dispatch({
        type: "REMOVE_SUBSCRIBERS",
        targetOvSub: event.stream.streamId,
      });
      console.log("stream destroyed");
      console.log(event.stream);
    });
    session.on("exception", (exception) => {
      console.warn(exception);
    });
    setOv(OV);
    setSession(session);
    // if (initialState.session !== undefined) {
    //   const mySession = initialState.session;
    //   initialState.session.on("streamCreated", (event: any) => {
    //     console.log("streamCreated");
    //     const sub = mySession.subscribe(event.stream, "video_container");
    //     let subs = initialState.subscribers;
    //     console.log(sub);
    //     subs.push(sub);
    //     setInitialState({
    //       ...initialState,
    //       subscribers: subs,
    //     });
    //   });
    //   mySession.on("streamDestroyed", (event: any) => {});
    //   mySession.on("exception", (exception) => {
    //     console.warn(exception);
    //   });
    //   apis.getOVToken(async (token: string) => {
    //     mySession
    //       .connect(token, { clientData: initialState.myUserName })
    //       .then(async () => {
    //         console.log("session connect");
    //         const devices = await OV.getDevices();
    //         console.log(devices);
    //         const videoDevices = devices.filter(
    //           (device) => device.kind === "videoinput"
    //         );
    //         console.log(videoDevices);
    //         const publisher = OV.initPublisher("video_container", {
    //           audioSource: undefined, // The source of audio. If undefined default microphone
    //           videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
    //           publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
    //           publishVideo: true, // Whether you want to start publishing with your video enabled or not
    //           resolution: "320x220", // The resolution of your video
    //           frameRate: 60, // The frame rate of your video
    //           insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
    //           mirror: false, // Whether to mirror your local video or not
    //         });

    //         mySession.publish(publisher);
    //         console.log(publisher);
    //         console.log(initialState);
    //         setInitialState({ ...initialState, publisher });
    //       })
    //       .catch((error) => {
    //         throw error;
    //       });
    //   });
    // }
  };
  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
      dispatch({ type: "LEAVE_SESSION" });
      setSession(undefined);
      setOv(undefined);
    }
  }, [session]);
  useEffect(() => {
    joinSession();
  }, []);
  useEffect(() => {
    connection();
    return () => {
      leaveSession();
    };
  }, [session]);
  // console.log(ov);
  // console.log(session);
  // console.log(subscribers);
  // console.log(publisher);
  // console.log(state);

  window.onbeforeunload = function () {
    leaveSession();
  };
  return (
    <StVideoSection>
      <div className="video_wrapper">
        {publisher !== null ? (
          <UserVideoCard
            key={`pub`}
            streamManager={publisher}
            videoHandler={handleVideoStatus}
            audioHandler={handleAudioStatus}
          />
        ) : null}

        {state.ovSubscribers.map((sub: any, i: any) => {
          return <UserVideoCard key={`${i}`} streamManager={sub} />;
        })}
      </div>
    </StVideoSection>
  );
}

const StVideoSection = styled.div`
  min-width: 128rem;
  flex-grow: 1;
  height: 100%;
  min-height: 101.35rem;
  background-color: black;
  /* display: grid;
  grid-template-columns: calc(100% / 4) calc(100% / 4) calc(100% / 4) calc(
      100% / 4
    );
  grid-template-rows: calc(100% / 4) calc(100% / 4) calc(100% / 4) calc(
      100% / 4
    );
  grid-gap: 0.1rem; */

  .video_wrapper {
    width: 128rem;
    height: 108rem;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
  }
`;

export default VideoSection;

// const joinSession = useCallback(async () => {
//   const OV = new OpenVidu();
//   setInitialState({ ...initialState, session: OV.initSession() });
//   if (initialState.session !== undefined) {
//     let mySession = initialState.session;

//     mySession.on("streamCreated", (event: any) => {
//       const sub = mySession.subscribe(event.stream, "gg");
//       let subs = initialState.subscribers;
//       subs.push(sub);
//       setInitialState({ ...initialState, subscribers: subs });
//     });

//     mySession.on("streamDestroyed", (event: any) => {});
//     mySession.on("exception", (exception) => {
//       console.warn(exception);
//     });

//     const requestToken = await apis.getOVToken();
//     mySession
//       .connect(requestToken, { clientData: initialState.myUserName })
//       .then(async () => {
//         const devices = await OV.getDevices();
//         const videoDevices = devices.filter(
//           (device) => device.kind === "videoInput"
//         );

//         const publisher = OV.initPublisher("gg", {
//           audioSource: undefined, // The source of audio. If undefined default microphone
//           videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
//           publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
//           publishVideo: true, // Whether you want to start publishing with your video enabled or not
//           resolution: "640x480", // The resolution of your video
//           frameRate: 30, // The frame rate of your video
//           insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
//           mirror: false, // Whether to mirror your local video or not
//         });

//         mySession.publish(publisher);

//         setInitialState({ ...initialState, publisher });
//       })
//       .catch((error) => {
//         throw error;
//       });
//   }
// }, [initialState.session]);
