import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component } from "react";
import UserVideoComponent from "./UserVideoComponent";
// import '../routers.css';
import { connect } from "react-redux";
import LiveChat from "./LiveChat";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
// import '../../components/Products/products.css'

const OPENVIDU_SERVER_URL = "https://j7c208.p.ssafy.io:4443";
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
      params: params,
      title: params[2],
      myUserName: "user",
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
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
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    console.log(subscribers);
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  joinSession() {
    this.OV = new OpenVidu();
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;
        mySession.on("streamCreated", (event) => {
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);
          console.log("마이세션", mySession);
          console.log("참여자", subscriber);
          console.log("참여자들", subscribers);

          this.setState({
            subscribers: subscribers,
          });
        });

        mySession.on("streamDestroyed", (event) => {
          console.log("딜리트");

          this.deleteSubscriber(event.stream.streamManager);
        });

        mySession.on("exception", (exception) => {});
        this.getToken(this.state.mySessionId).then((token) => {
          mySession
            .connect(token, {
              clientData: this.state.myUserName,
              clientId: this.state.myId,
            })
            .then(async () => {
              console.log("코넥투송공");
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );

              var publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined,
                videoSource: videoDevices[0].deviceId,
                publishAudio: true,
                publishVideo: true,
                resolution: "800x500",
                frameRate: 30,
                insertMode: "APPEND",
                mirror: true,
              });

              mySession.publish(publisher);

              this.setState({
                currentVideoDevice: videoDevices[0],
                mainStreamManager: publisher,
                publisher: publisher,
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

              //   mySession.publish(publisher2);

              //   this.setState({
              //     currentVideoDevice: videoDevices2[0],
              //     mainStreamManager: publisher2,
              //     publisher: publisher2,
              //   });

              // }
              this.setState({
                loading: true,
              });
            })
            .catch((error) => {
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
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "user",
      myUserName: "user",
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  async CameraOff() {
    if (this.state.nowCamera) {
      this.state.publisher.publishVideo(false);
      this.setState({
        nowCamera: false,
      });
    } else {
      this.state.publisher.publishVideo(true);
      this.setState({
        nowCamera: true,
      });
    }
  }

  async VoiceOff() {
    if (this.state.nowVoice) {
      console.log("보이스오프");
      this.state.publisher.publishAudio(false);
      this.setState({
        nowVoice: false,
      });
    } else {
      console.log("보이스온");
      this.state.publisher.publishAudio(true);
      this.setState({
        nowVoice: true,
      });
    }
  }

  deleteSession() {
    console.log(this.state);

    axios
      .delete(
        OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + this.state.title,
        {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          },
        }
      )
      .then((document.location.href = `/`));
  }
  render() {
    if (this.state.session === undefined) {
      this.joinSession();
    }
    return (
      <div>
        <div className="test">
          <p>{this.state.subscribers.length}</p>
          {this.state.session !== undefined ? (
            <div id="session">
              <div className="liveTitle my-3">
                <h3 id="session-title">{this.state.RoomTitle}</h3>
              </div>

              <button onClick={this.deleteSession} className="delete-button">
                중계방 제거
              </button>
              <button onClick={this.CameraOff}>카메라 전환</button>
              <button onClick={this.VoiceOff}>소리전환</button>

              {/*관리자 페이지 수정필요 */}
              <div className="live_container">
                <div>
                  {this.state.params[2] === this.state.myId ? (
                    <div
                      className="d-flex justify-content-between"
                      style={{ marginInline: "2rem" }}
                    >
                      {/* <div>
                        {this.state.nowCamera ? <FontAwesomeIcon style={{ color: 'rgba(58, 153, 74, 0.918)', cursor: 'pointer' }} className='exiticon mx-3 iconsize' onClick={this.CameraOff} icon={faVideo} size="1x" /> :
                          <FontAwesomeIcon className='mx-2 iconsize' style={{ color: 'rgba(238, 81, 81, 0.918)', cursor: 'pointer' }} onClick={this.CameraOff} icon={faVideoSlash} size="1x" />}
                        {this.state.nowVoice ? <FontAwesomeIcon style={{ color: 'rgba(58, 153, 74, 0.918)', cursor: 'pointer' }} className='exiticon mx-3 iconsize' onClick={this.VoiceOff} icon={faMicrophone} size="1x" /> :
                          <FontAwesomeIcon className='mx-2 iconsize' style={{ color: 'rgba(238, 81, 81, 0.918)', cursor: 'pointer' }} onClick={this.VoiceOff} icon={faMicrophoneSlash} size="1x" />}
                        <FontAwesomeIcon className='mx-2 iconsize' style={{ color: 'rgba(238, 81, 81, 0.918)', cursor: 'pointer' }} onClick={this.deleteSession} icon={faArrowRightFromBracket} />
                      </div> */}
                    </div>
                  ) : null}
                  <div>
                    <div className="livebox">
                      <UserVideoComponent
                        className="livebox2"
                        streamManager={this.state.mainStreamManager}
                      />
                    </div>
                    <div className="livebox">
                      <UserVideoComponent
                        className="livebox2"
                        streamManager={this.state.subscribers[0]}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <LiveChat props={this.state} />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  getToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = {};
      console.log("타이틀", this.state.title);
      console.log("서벼유알엘", OPENVIDU_SERVER_URL);
      axios
        .post(
          OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            this.state.title +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data.token);
          resolve(response.data.token);
        })
        .catch((error) => {
          console.log(error);
          // document.location.href = '/'
        });
    });
  }
}

const mapStateToProps = (state) => ({
  storeInfo: 1,
});

export default connect(mapStateToProps)(LivePage);
