import React, { useState, useEffect } from "react";
import "./LivePage.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import closechat from "assets/images/closechat.png";
import exit from "assets/images/exit.png";
import openchat from "assets/images/openchat.png";
import LiveSupport from "components/LiveSupport";
import LiveChat from "./LiveChat";
import UserVideoComponent from "./UserVideoComponent";

const OPENVIDU_SERVER_URL = "https://j7c208.p.ssafy.io:8443";
const OPENVIDU_SERVER_SECRET = "ohgwang12";
let OV;

export default function LivePage() {
  const [session, setSession] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [currentAudioDevice, setCurrentAudioDevice] = useState(null);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [mainStreamManager, setMainStreamManager] = useState(null);
  const [camera, setCamera] = useState(true);
  const [voice, setVoice] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [activeCameraAndAudio, setActiveCameraAndAudio] = useState(false);
  const [publisher, setPublisher] = useState(null);
  const { nickName } = useSelector(state => state.userInfo.userInfo);
  const [myUserName, setMyUserName] = useState(nickName);
  const [RoomTitle, setRoomTitile] = useState("title");
  const [message, setMessage] = useState("");
  const [chattingBox, setChattingBox] = useState(true);
  const { userPk } = useSelector(state => state.userInfo.userInfo);
  const location = useLocation();
  const navigate = useNavigate();
  const { leagueId } = location.state;

  const { leaguePk } = location.state;
  const { ownerPk } = location.state;
  const roomId = `broadcast${leaguePk}`;

  const sendMessageHandler = () => {
    // socket.emit("message", message);
    // setDonation(message);
    // setMessage("");
  };
  useEffect(() => {
    const id = location.state.leagueId;
    setRoomTitile(id);
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

  // const shareSession = () => {};

  const joinSession = () => {
    OV = new OpenVidu();
    setSession(OV.initSession());
  };
  useEffect(() => {
    joinSession();
  }, []);

  const createSession = sessionId => {
    return new Promise(resolve => {
      const data = JSON.stringify({
        customSessionId: sessionId
      });
      axios
        .post(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions`, data, {
          headers: {
            Authorization: `Basic ${btoa(
              `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
            )}`,
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          resolve(response.data.id);
        })
        .catch(response => {
          const error = { ...response };
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.warn(
              `No connection to OpenVidu Server. This may be a certificate error at ${OPENVIDU_SERVER_URL}`
            );
            if (
              window.confirm(
                `No connection to OpenVidu Server. This may be a certificate error at "${OPENVIDU_SERVER_URL}"\n\nClick OK to navigate and accept it.
                  If no certificate warning is shown, then check that your OpenVidu Server is up and running at "${OPENVIDU_SERVER_URL}"`
              )
            ) {
              window.location.assign(
                `${OPENVIDU_SERVER_URL}/accept-certificate`
              );
            }
          }
        });
    });
  };

  const createToken = sessionId => {
    return new Promise((resolve, reject) => {
      const data = {};
      axios
        .post(
          `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
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
          // console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch(error => reject(error));
    });
  };

  const getToken = () =>
    createSession(roomId).then(sessionId => createToken(sessionId));

  useEffect(() => {
    if (!session) return;

    session.on("streamCreated", event => {
      const subscriber = session.subscribe(event.stream, undefined);
      setSubscribers(prevSubscribers => [...prevSubscribers, subscriber]);
    });
    session.on("streamDestroyed", event => {
      setSubscribers(prevSubscribers => {
        return prevSubscribers.filter(
          stream => stream !== event.stream.streamManager
        );
      });
    });
    session.on("exception", exception => {
      console.warn(exception);
    });
    getToken().then(token => {
      session
        .connect(token, { clientData: nickName })
        .then(async () => {
          if (ownerPk === userPk) {
            const devices = await OV.getDevices();
            const videoDevices = devices.filter(
              device => device.kind === "videoinput"
            );
            const audioDevices = devices.filter(
              device => device.kind === "audioinput"
            );
            const tmpPublisher = OV.initPublisher(undefined, {
              audioSource: undefined,
              videoSource: videoDevices[0].deviceId,
              publishAudio: true,
              publishVideo: true,
              resolution: "640x480",
              frameRate: 30,
              insertMode: "APPEND",
              mirror: false
            });
            session.publish(tmpPublisher);
            setCurrentVideoDevice(videoDevices[0]);
            setCurrentAudioDevice(audioDevices[0]);

            setMainStreamManager(tmpPublisher);
            setPublisher(tmpPublisher);
          } else {
            const devices = await OV.getDevices();
            const videoDevices = devices.filter(
              device => device.kind === "videoinput"
            );
            const audioDevices = devices.filter(
              device => device.kind === "audioinput"
            );
            const tmpPublisher = OV.initPublisher(undefined, {
              audioSource: false,
              videoSource: false,
              publishAudio: true,
              publishVideo: true,
              resolution: "640x480",
              frameRate: 30,
              insertMode: "APPEND",
              mirror: false
            });
            session.publish(tmpPublisher);
            setCurrentVideoDevice(videoDevices[0]);
            setCurrentAudioDevice(audioDevices[0]);

            setMainStreamManager(tmpPublisher);
            setPublisher(tmpPublisher);
          }
        })
        .catch(error => {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        });
    });
  }, [session]);
  const deleteSession = () => {
    axios
      .delete(
        `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${`broadcast${leaguePk}`}`,
        {
          headers: {
            Authorization: `Basic ${btoa(
              `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
            )}`
          }
        }
      )
      .then(navigate(`/leagues/detail/${leaguePk}`));
  };
  const GoDetail = () => {
    navigate(`/leagues/detail/${leaguePk}`);
  };

  const ChattingOff = () => {
    if (chattingBox) {
      setChattingBox(false);
    } else {
      setChattingBox(true);
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

  return (
    <div className="broad">
      <div className="main">
        {session !== null ? (
          <div className="live">
            <div className="live-box">
              <button className="exit" type="button" onClick={GoDetail}>
                <img className="art" alt="open" src={exit} />
              </button>
              {mainStreamManager !== null && ownerPk === userPk ? (
                <UserVideoComponent
                  className="live-box-video"
                  streamManager={mainStreamManager}
                />
              ) : (
                <div className="empty-video" />
              )}
              {ownerPk !== userPk ? (
                <UserVideoComponent
                  className="live-box-video"
                  streamManager={subscribers[0]}
                />
              ) : (
                <div className="empty-video" />
              )}

              <div className="live-box-information">
                <h3 className="live-box-information-title">{RoomTitle}</h3>
                <p className="live-box-information-subscribers">
                  {/* 시청자 수 : {subscribers.length} */}
                </p>
                {ownerPk === userPk ? (
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
                    <button
                      type="button"
                      onClick={VoiceOff}
                      className="v-button"
                    >
                      소리전환
                    </button>
                    <button
                      type="button"
                      // onClick={shareSession}
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
                ) : null}
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
      <LiveSupport leaguePk={leaguePk} />
    </div>
  );
}
