import { OpenVidu } from "openvidu-browser";
import { Session } from "openvidu-browser/lib/OpenVidu/Session";
import { Subscriber } from "openvidu-browser/lib/OpenVidu/Subscriber";
import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import UserVideoCard from "./videoSection/UserVideoCard";
import apis from "../../api/api";
import { Publisher } from "openvidu-browser/lib/OpenVidu/Publisher";

const OPENVIDU_SERVER_URL = "https://" + window.location.hostname + ":4443";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

interface InitState {
  mySessionId: string;
  myUserName: string;
  session: undefined | Session;
  publisher: undefined | Publisher;
  subscribers: Subscriber[];
}

function VideoSection() {
  const [initialState, setInitialState] = useState<InitState>({
    mySessionId: "",
    myUserName: "",
    session: undefined,
    publisher: undefined,
    subscribers: [],
  });

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

  const joinSession = () => {
    apis.getOVToken(async (token: string) => {
      const OV = new OpenVidu();
      setInitialState({ ...initialState, session: OV.initSession() });
      if (initialState.session !== undefined) {
        let mySession = initialState.session;

        mySession.on("streamCreated", (event: any) => {
          const sub = mySession.subscribe(event.stream, "video_container");
          let subs = initialState.subscribers;
          subs.push(sub);
          setInitialState({ ...initialState, subscribers: subs });
        });

        mySession.on("streamDestroyed", (event: any) => {});
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });
        mySession
          .connect(token, { clientData: initialState.myUserName })
          .then(async () => {
            const devices = await OV.getDevices();
            const videoDevices = devices.filter(
              (device) => device.kind === "videoInput"
            );

            const publisher = OV.initPublisher("video_container", {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
              resolution: "640x480", // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
              mirror: false, // Whether to mirror your local video or not
            });

            mySession.publish(publisher);

            setInitialState({ ...initialState, publisher });
          })
          .catch((error) => {
            throw error;
          });
      }
    });
  };

  const leaveSession = () => {
    if (initialState.session) {
      initialState.session.disconnect();
    }
    setInitialState({
      mySessionId: "",
      myUserName: "",
      session: undefined,
      publisher: undefined,
      subscribers: [],
    });
  };
  useEffect(() => {
    joinSession();
    return () => {
      leaveSession();
    };
  });
  return (
    <StVideoSection>
      {initialState.subscribers.map((sub, i) => {
        return <UserVideoCard key={`${sub}`} streamManager={sub} />;
      })}
    </StVideoSection>
  );
}

const StVideoSection = styled.div`
  width: calc(100% - 64rem);
  height: 100%;
  min-height: 101.35rem;
  background-color: black;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-template-rows: auto auto auto auto;
  grid-gap: 0.1rem;
`;

export default VideoSection;
