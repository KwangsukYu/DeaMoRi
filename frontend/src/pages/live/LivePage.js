import React, { useEffect, Component, useState } from "react";
import axios from "axios";
import "./LivePage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { OpenVidu, Stream } from "openvidu-browser";
import closechat from "assets/images/closechat.png";
import openchat from "assets/images/openchat.png";
import { useSelector, useDispatch } from "react-redux";
import { infoType } from "Slices/userInfo";

import UserVideoComponent from "./UserVideoComponent";
import LiveChat from "./LiveChat";
import Donation from "./Donation";

const OPENVIDU_SERVER_URL = "https://j7c208.p.ssafy.io:8443";
const OPENVIDU_SERVER_SECRET = "ohgwang12";

let OV;

export default function LivePage() {
  // const [ov, setOv] = useState(null);
  const [loading, setLoading] = useState(null);
  const [params, setParams] = useState(window.location.pathname.split("/"));
  const [title, setTitle] = useState(params[2]);
  const { nickName } = useSelector(state => state.userInfo.userInfo);
  const [myUserName, setMyUserName] = useState(nickName);
  const [session, setSession] = useState(null);
  const [mainStreamManager, setMainStreamManager] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [mySessionId, setMySessionId] = useState(null);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [RoomTitle, setRoomTitile] = useState(
    "제목입니다아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아"
  );
  const [camera, setCamera] = useState(true);
  const [voice, setVoice] = useState(true);
  const [chattingBox, setChattingBox] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [activeCameraAndAudio, setActiveCameraAndAudio] = useState(false);
  const [donation, setDonation] = useState("text");
  const [donationSwitch, setDonationSwitch] = useState("false");
  const location = useLocation();
  const navigate = useNavigate();
  const { leaguePk } = location.state;

  useEffect(() => {
    const id = location.state.leaguePk;
    setRoomTitile(id);
  });

  const getToken = sessionId => {
    return new Promise((resolve, reject) => {
      const data = {};
      axios
        .post(
          `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${title}/connection`,
          data,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
              )}`,
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          resolve(response.data.token);
        })
        .catch(error => {
          console.log(error);
          // document.location.href = '/'
        });
    });
  };

  const joinSession = () => {
    session.on("streamCreated", event => {
      // const subscriber = session.subscribe(event.stream, undefined);
      // setSubscribers(prevSubscribers => [subscriber, ...prevSubscribers]);
    });
    session.on("streamDestroyed", event => {
      // setSubscribers(prevSubscribers => {
      //   return prevSubscribers.filter(
      //     stream => stream !== event.stream.streamManager
      //   );
      // });
    });

    getToken(mySessionId).then(token => {
      session.connect(token, { clientData: myUserName }).then(async () => {
        const devices = await OV.getDevices();
        const videoDevices = devices.filter(
          device => device.kind === "videoinput"
        );
        const newPublisher = OV.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: videoDevices[0].deviceId,
          publishAudio: true,
          publishVideo: true,
          resolution: "1280x960",
          frameRate: 30,
          insertMode: "APPEND",
          mirror: false
        });
        console.log("여기체크", OV.initPublisher);
        session.publish(newPublisher);
        setMainStreamManager(newPublisher);
        setPublisher(newPublisher);
        setCurrentVideoDevice(videoDevices[0]);
        setLoading(true);
      });
    });
  };

  useEffect(() => {
    OV = new OpenVidu();
    setSession(OV.initSession());
  }, []);

  useEffect(() => {
    if (!session) return;

    joinSession();
    console.log("셋션", session);
    console.log("세션", session.subscribe);
  }, [session]);

  const leaveSession = () => {
    if (session) session.disconnect();

    OV = null;
    setSession(null);
    // setSubscribers([]);
    setMySessionId("user");
    setMyUserName(nickName);
    setMainStreamManager(null);
    setPublisher(null);
  };

  const reqCameraAndAudio = async () => {
    try {
      const res = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      });
      // { audio: true, video: { facingMode: { exact: "environment" } } } // 후면
      setActiveCameraAndAudio(res.active);
    } catch (err) {
      if (err.message === "Permission denied") {
        setPermissionDenied(true);
      }
    }
  };

  const CameraOff = async () => {
    reqCameraAndAudio();
    if (camera) {
      publisher.publishVideo(false);
      setCamera(false);
    } else {
      publisher.publishVideo(true);
      setCamera(true);
    }
  };

  const VoiceOff = async () => {
    reqCameraAndAudio();
    if (voice) {
      publisher.publishAudio(false);
      setVoice(false);
    } else {
      publisher.publishAudio(true);
      setVoice(true);
    }
  };

  const ChattingOff = () => {
    if (chattingBox) {
      setChattingBox(false);
    } else {
      setChattingBox(true);
    }
  };

  const deleteSession = () => {
    leaveSession();
    axios
      .delete(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${title}`, {
        headers: {
          Authorization: `Basic                ${btoa(
            `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
          )}`
        }
      })
      .then(navigate(`/leagues/detail/${leaguePk}`));
  };

  useEffect(() => {
    reqCameraAndAudio();
    // window.location.replace(`/live/${title}`);
    console.log("타이틀", title);
  }, []);

  const donaitonOff = () => {
    setDonationSwitch(false);
  };

  const donationOn = () => {
    setDonationSwitch(true);
    setTimeout(donaitonOff, 2000);
  };

  const playTTS = e => {
    donationOn();
    console.log("컨설", e);
    const msg = new SpeechSynthesisUtterance(e);
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="broad">
      <div className="main">
        {session !== null ? (
          <div className="live">
            <div className="live-box">
              <div className="donation">
                {donationSwitch === true ? <Donation /> : null}
              </div>
              {mainStreamManager !== null ? (
                <UserVideoComponent
                  className="live-box-video"
                  streamManager={mainStreamManager}
                />
              ) : null}

              <div className="live-box-information">
                <h3 className="live-box-information-title">{RoomTitle}</h3>
                <p className="live-box-information-subscribers">
                  {/* 시청자 수 : {subscribers.length} */}
                </p>
              </div>
            </div>
            <div className="live-chat">
              {chattingBox ? (
                <div>
                  <button className="art3" type="button" onClick={ChattingOff}>
                    <img className="art" alt="open" src={closechat} />
                  </button>
                  <LiveChat
                    props={{
                      myUserName,
                      session
                    }}
                  />
                  <div>
                    <input
                      type="text"
                      onChange={event => setDonation(event.target.value)}
                    />
                    ;
                    <button
                      type="submit"
                      onClick={() => {
                        playTTS(donation);
                      }}
                    >
                      도네이션
                    </button>
                  </div>
                </div>
              ) : (
                <button className="art4" type="button" onClick={ChattingOff}>
                  <img className="art2" alt="open" src={openchat} />
                </button>
              )}
            </div>
          </div>
        ) : null}
      </div>
      <div className="live-admin">
        <button type="button" onClick={deleteSession} className="delete-button">
          중계방 제거
        </button>
        <button type="button" onClick={CameraOff}>
          카메라 전환
        </button>
        <button type="button" onClick={VoiceOff}>
          소리전환
        </button>
      </div>
    </div>
  );
}
