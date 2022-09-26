import React, { useEffect, Component, useState } from "react";
import axios from "axios";
import "./LivePage.scss";
import { OpenVidu, Stream } from "openvidu-browser";
import share from "assets/images/share.png";
import UserVideoComponent from "./UserVideoComponent";
import LiveChat from "./LiveChat";

const OPENVIDU_SERVER_URL = "https://localhost:4443";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

export default function LivePage() {
  const [ov, setOv] = useState(new OpenVidu());
  const [loading, setLoading] = useState(null);
  const [params, setParams] = useState(window.location.pathname.split("/"));
  const [title, setTitle] = useState(params[2]);
  const [myUserName, setMyUserName] = useState("user");
  const [session, setSession] = useState(null);
  const [mainStreamManager, setMainStreamManager] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [mySessionId, setMySessionId] = useState(null);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [currentAudioDevice, setCurrentAudioDevice] = useState(null);
  const [RoomTitle, setRoomTitile] = useState("제목입니다");
  const [camera, setCamera] = useState(true);
  const [voice, setVoice] = useState(true);
  const [chattingBox, setChattingBox] = useState(true);

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
      const subscriber = session.subscribe(event.stream, undefined);
      if (subscribers in subscriber) return;
      setSubscribers(preventSubscribers => [subscriber, ...preventSubscribers]);
    });
    session.on("streamDestroyed", event => {
      setSubscribers(prevSubscribers => {
        return prevSubscribers.filter(
          stream => stream !== event.stream.streamManager
        );
      });
    });

    getToken(mySessionId).then(token => {
      session.connect(token, { clientData: myUserName }).then(async () => {
        const devices = await ov.getDevices();
        console.log("오브이", ov);

        const videoDevices = devices.filter(
          device => device.kind === "videoinput"
        );
        const newPublisher = ov.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: videoDevices[0].deviceId,
          publishAudio: true,
          publishVideo: true,
          resolution: "800x500",
          frameRate: 30,
          insertMode: "APPEND",
          mirror: true
        });
        await session.publish(newPublisher);
        setMainStreamManager(newPublisher);
        setPublisher(newPublisher);
        setCurrentVideoDevice(videoDevices[0]);
        setLoading(true);
      });
    });
  };

  useEffect(() => {
    setOv(new OpenVidu());
    setSession(ov.initSession());
  }, []);

  useEffect(() => {
    if (!session) return;

    joinSession();
  }, [session]);

  const leaveSession = () => {
    if (session) session.disconnect();

    setOv(null);
    setSession(null);
    setSubscribers([]);
    setMySessionId("user");
    setMyUserName("user");
    setMainStreamManager(null);
    setPublisher(null);
  };

  const CameraOff = async () => {
    if (camera) {
      publisher.publishVideo(false);
      setCamera(false);
    } else {
      publisher.publishVideo(true);
      setCamera(true);
    }
  };

  const VoiceOff = async () => {
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
      .then((document.location.href = `/createroom/id`));
  };
  console.log("이건 시청자수 ", session);

  return (
    <div className="broad">
      <div className="main">
        {session !== null ? (
          <div className="live">
            <div className="live-box">
              {mainStreamManager !== null ? (
                <UserVideoComponent
                  className="live-box-video"
                  streamManager={mainStreamManager}
                />
              ) : null}

              <div className="live-box-information">
                <h3 className="live-box-information-title">{RoomTitle}</h3>
                <p className="live-box-information-subscribers">
                  시청자 수 : {subscribers.length}
                </p>
              </div>
            </div>
            <div className="live-chat">
              {chattingBox ? (
                <div>
                  <LiveChat
                    props={{
                      myUserName,
                      session
                    }}
                  />
                  <button type="button" onClick={ChattingOff}>
                    <img className="art" alt="open" src={share} />
                  </button>
                </div>
              ) : (
                <button type="button" onClick={ChattingOff}>
                  <img className="art2" alt="open" src={share} />
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
