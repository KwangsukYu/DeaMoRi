import React, { useEffect, Component, useState } from "react";
import axios from "axios";
import "./LivePage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { OpenVidu, Stream } from "openvidu-browser";
import closechat from "assets/images/closechat.png";
import openchat from "assets/images/openchat.png";
import { useSelector, useDispatch } from "react-redux";
import { infoType } from "Slices/userInfo";
import { io } from "socket.io-client";
import { v4 } from "uuid";
import UserVideoComponent from "./UserVideoComponent";
import LiveChat from "./LiveChat";
import Donation from "./Donation";

const OPENVIDU_SERVER_URL = "https://j7c208.p.ssafy.io:8443";
const OPENVIDU_SERVER_SECRET = "ohgwang12";

let OV;

const socket = io.connect(`https://j7c208.p.ssafy.io:3001`, {
  cors: { origin: "https://j7c208.p.ssafy.io:3001" }
});
export const SocketContext = React.createContext();

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
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  const sendMessageHandler = () => {
    socket.emit("message", message);
    setDonation(message);
    setMessage("");
  };

  const donaitonOff = () => {
    setDonationSwitch(false);
  };

  const donationOn = () => {
    setDonationSwitch(true);
    setTimeout(donaitonOff, 2000);
  };

  useEffect(() => {
    console.log("왜 중복실행", chat);
    socket.on("message", messageing => {
      setChat([messageing]);
      donationOn();
      const msg = new SpeechSynthesisUtterance(messageing);
      window.speechSynthesis.speak(msg);
    });
  }, [chat]);

  const location = useLocation();
  const navigate = useNavigate();
  const { leaguePk } = location.state;

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
          // document.location.href = '/'
        });
    });
  };

  const onSession = () => {
    getToken(leaguePk).then(token => {
      session.connect(token, { clientData: myUserName });
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
    console.log("내 세션아이디", mySessionId);

    getToken(leaguePk).then(token => {
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
          frameRate: 30,
          insertMode: "APPEND",
          mirror: false
        });
        newPublisher.once("accessAllowed", () => {
          try {
            newPublisher.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .applyConstraints({
                width: 640,
                height: 480
              });
          } catch (error) {
            console.error("Error applying constraints: ", error);
          }
        });

        session.publish(newPublisher);
        setMainStreamManager(newPublisher);
        setPublisher(newPublisher);
        setCurrentVideoDevice(videoDevices[0]);
        setLoading(true);
      });
    });
  };
  const shareSession = () => {
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

    getToken(leaguePk).then(token => {
      session.connect(token, { clientData: myUserName }).then(async () => {
        const devices = await OV.getDevices();
        const videoDevices = devices.filter(
          device => device.kind === "videoinput"
        );
        const newPublisher = OV.initPublisher(undefined, {
          audioSource: undefined,
          // videoSource: videoDevices[0].deviceId,
          videoSource: "screen",
          publishAudio: true,
          publishVideo: true,

          frameRate: 30,
          insertMode: "APPEND",
          mirror: false
        });
        newPublisher.once("accessAllowed", () => {
          try {
            newPublisher.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .applyConstraints({
                width: 640,
                height: 480
              });
          } catch (error) {
            console.error("Error applying constraints: ", error);
          }
        });

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
    onSession();
  });

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
  }, []);

  // const playTTS = e => {
  //   donationOn();
  //   const msg = new SpeechSynthesisUtterance(e);
  //   window.speechSynthesis.speak(msg);
  // };

  return (
    <div className="broad">
      <div className="main">
        {session !== null ? (
          <div className="live">
            <div className="live-box">
              <div className="donation">
                {donationSwitch === true ? (
                  <Donation
                    props={{
                      donation
                    }}
                  />
                ) : null}
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
                <div className="live-admin">
                  <button
                    type="button"
                    onClick={deleteSession}
                    className="d-button"
                  >
                    중계방 제거
                  </button>
                  <button
                    type="button"
                    onClick={CameraOff}
                    className="c-button"
                  >
                    카메라 전환
                  </button>
                  <button type="button" onClick={VoiceOff} className="v-button">
                    소리전환
                  </button>
                  <button
                    type="button"
                    onClick={shareSession}
                    className="s-button"
                  >
                    화면공유
                  </button>
                  <button
                    type="button"
                    onClick={joinSession}
                    className="j-button"
                  >
                    카메라공유
                  </button>
                </div>
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
                    <ul>
                      {/* {chat.map(data => {
                        return <li key={v4()}>{data}</li>;
                      })} */}
                    </ul>
                  </div>

                  <div className="donation-group">
                    {/* <input
                      value={coin}
                      onChange={e => setMessage(e.target.value)}
                    /> */}
                    <input
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="donation-input"
                    />
                    <button
                      onClick={sendMessageHandler}
                      type="button"
                      className="donation-button"
                    >
                      후원하기
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
    </div>
  );
}
