import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component } from "react";
import { connect } from "react-redux";
import UserVideoComponent from "./UserVideoComponent";
import "./LivePage.scss";
// import '../routers.css';
import LiveChat from "./LiveChat";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
// import '../../components/Products/products.css'

const OPENVIDU_SERVER_URL = "https://localhost:4443";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

class LivePage extends Component {
  constructor(props) {
    super(props);
    const params = window.location.pathname.split("/");
    console.log("params", params);
    params[2] = decodeURI(params[2]);

    this.state = {
      loading: false,
      myId: "user",
      params,
      title: params[2],
      myUserName: "user",
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      chatSwitch: true
    };

    this.state.myId = "user";
    this.state.myUserName = "user";

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.deleteSession = this.deleteSession.bind(this);
    this.CameraOff = this.CameraOff.bind(this);
    this.VoiceOff = this.VoiceOff.bind(this);
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value
    });
  }

  handleMainVideoStream(stream) {
    const { mainStreamManager } = this.state;
    if (mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream
      });
    }
  }

  getToken(sessionId) {
    return new Promise((resolve, reject) => {
      const data = {};
      const { title } = this.state;
      console.log("타이틀", title);
      console.log("서벼유알엘", OPENVIDU_SERVER_URL);
      console.log(
        `Basic ${btoa(
          `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
        )}Content-Type:application/json`
      );
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
          console.log(response.data.token);
          resolve(response.data.token);
        })
        .catch(error => {
          console.log(error);
          // document.location.href = '/'
        });
    });
  }

  joinSession() {
    this.OV = new OpenVidu();
    console.log("이닛세션", this.OV.initSession());
    this.setState(
      {
        session: this.OV.initSession()
      },
      () => {
        const { session } = this.state;
        session.on("streamCreated", event => {
          const subscriber = session.subscribe(event.stream, undefined);
          const { subscribers } = this.state;
          subscribers.push(subscriber);

          this.setState({
            subscribers
          });
        });

        session.on("streamDestroyed", event => {
          console.log("딜리트");

          this.deleteSubscriber(event.stream.streamManager);
        });

        // session.on("exception",exception => {});
        const { mySessionId } = this.state;
        const { myUserName } = this.state;
        const { myId } = this.state;

        this.getToken(mySessionId).then(token => {
          session
            .connect(token, {
              clientData: myUserName,
              clientId: myId
            })
            .then(async () => {
              const devices = await this.OV.getDevices();
              const videoDevices = devices.filter(
                device => device.kind === "videoinput"
              );

              const publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined,
                videoSource: videoDevices[0].deviceId,
                publishAudio: true,
                publishVideo: true,
                resolution: "800x500",
                frameRate: 30,
                insertMode: "APPEND",
                mirror: true
              });

              session.publish(publisher);

              this.setState({
                currentVideoDevice: videoDevices[0],
                mainStreamManager: publisher,
                publisher
              });

              // else {
              //   var devices2 = await this.OV.getDevices();
              //   var videoDevices2 = devices2.filter(device => device.kind === 'videoinput');

              //   var publisher2 = this.OV.initPublisher(undefined, {
              //     audioSource: undefined,
              //     videoSource: undefined,
              //     publishAudio: true,
              //     publishVideo: true,
              //     resolution: '800x500',
              //     frameRate: 30,
              //     insertMode: 'APPEND',
              //     mirror: true,
              //   });

              //   session.publish(publisher2);

              //   this.setState({
              //     currentVideoDevice: videoDevices2[0],
              //     mainStreamManager: publisher2,
              //     publisher: publisher2,
              //   });

              // }
              this.setState({
                loading: true
              });
            })
            .catch(error => {
              console.log(error);
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  leaveSession() {
    const { session } = this.state;

    if (session) {
      session.disconnect();
    }

    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "user",
      myUserName: "user",
      mainStreamManager: undefined,
      publisher: undefined
    });
  }

  async CameraOff() {
    const { nowCamera } = this.state;
    const { publisher } = this.state;
    if (nowCamera) {
      publisher.publishVideo(false);
      this.setState({
        nowCamera: false
      });
    } else {
      publisher.publishVideo(true);
      this.setState({
        nowCamera: true
      });
    }
  }

  async VoiceOff() {
    const { nowVoice } = this.state;
    const { publisher } = this.state;
    if (nowVoice) {
      console.log("보이스오프");
      publisher.publishAudio(false);
      this.setState({
        nowVoice: false
      });
    } else {
      console.log("보이스온");
      publisher.publishAudio(true);
      this.setState({
        nowVoice: true
      });
    }
  }

  deleteSubscriber(streamManager) {
    const { subscribers } = this.state;
    console.log(subscribers);
    const index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers
      });
    }
  }

  deleteSession() {
    console.log(this.state);
    const { title } = this.state;
    axios
      .delete(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${title}`, {
        headers: {
          Authorization: `Basic                ${btoa(
            `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
          )}`
        }
      })
      .then((document.location.href = `/`));
  }

  // changeChat(chatSwitch) {
  //   const { title } = this.state;
  //   console.log("챗", chatSwitch);
  //   if (chatSwitch) {
  //     chatSwitch = false;
  //   }
  //   chatSwitch = true;
  // }

  render() {
    const { session } = this.state;
    const { subscribers } = this.state;
    // const { RoomTitle } = this.state;
    const RoomTitle = "제목입니다.";
    const { params } = this.state;
    const { myId } = this.state;
    const { mainStreamManager } = this.state;
    const { chatSwitch } = this.state;

    if (session === undefined) {
      this.joinSession();
    }

    return (
      <div className="broad">
        <div className="main">
          {session !== undefined ? (
            <div className="live">
              <div className="live-box">
                <UserVideoComponent
                  className="live-box-video"
                  streamManager={mainStreamManager}
                />
                <div className="live-box-information">
                  <h3 className="live-box-information-title">{RoomTitle}</h3>
                  <p className="live-box-information-subscribers">
                    시청자 수 : {subscribers.length}
                  </p>
                </div>
              </div>
              <div className="live-chat">
                {chatSwitch === true ? <LiveChat props={this.state} /> : null}
              </div>
              {/* <button type="button" onClick={this.changeChat(chatSwitch)}>
                채팅창끄기
              </button> */}
            </div>
          ) : null}
        </div>
        <div className="live-admin">
          <button
            type="button"
            onClick={this.deleteSession}
            className="delete-button"
          >
            중계방 제거
          </button>
          <button type="button" onClick={this.CameraOff}>
            카메라 전환
          </button>
          <button type="button" onClick={this.VoiceOff}>
            소리전환
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  storeInfo: 1
});

export default connect(mapStateToProps)(LivePage);

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
