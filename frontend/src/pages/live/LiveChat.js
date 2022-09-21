import React, { useState, useEffect } from "react";
import "./LiveChat.scss";
import { v4 } from "uuid";
// 고유키값

function LiveChat(props) {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  // const [nowUserModal, setNowUserModal] = useState(false);

  const handleChange = event => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    const myProps = { props }.props.props;
    console.log("프롭스", myProps.subscribers.length);
    myProps.session?.on("signal:chat", event => {
      const data = JSON.parse(event.data);
      const messageListData = messageList;
      messageListData.push({
        connectionId: event.from.connectionId,
        nickname: data.nickname,
        message: data.message
      });
      setMessageList([...messageListData]);
    });
    if (myProps.myUserName) {
      const welcome = {
        message: `${myProps.myUserName}님이 입장하셨습니다.`,
        nickname: myProps.myUserName,
        streamId: myProps.streamId
      };
      myProps.session.signal({
        data: JSON.stringify(welcome),
        type: "chat"
      });
    }
  }, []);

  const sendMessage = () => {
    const myProps = { props }.props.props;
    if (myProps.myUserName && message) {
      const messageData = message.replace(/ +(?= )/g, "");
      if (messageData !== "" && messageData !== " ") {
        const data = {
          message: messageData,
          nickname: myProps.myUserName,
          streamId: myProps.streamId
        };
        myProps.session.signal({
          data: JSON.stringify(data),
          type: "chat"
        });
      }
    }
    setMessage("");
  };

  const handlePressKey = event => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  // function openNowUserModal() {
  //   setNowUserModal(true);
  // }
  // function closeNowUserModal() {
  //   setNowUserModal(false);
  // }

  return (
    <div className="chatting">
      <div className="chatting-title">
        <p className="chatting-title-text">채팅방</p>
      </div>

      <div className="chatbox">
        <div className="">
          {messageList.map(data => (
            <div key={v4()} id="remoteUsers" className="">
              <div className="liveChatItem">
                <div className="livechatcontent">
                  <p className="chatnickname">{data.nickname}</p>
                  <p className="livechatbox2">{data.message}</p>
                </div>
              </div>
            </div>
          ))}
          to
        </div>
      </div>

      <div className="chatting-input">
        <input
          className="chatting-input-form"
          placeholder="메세지를 입력하세요"
          id="chatInput"
          value={message}
          onChange={handleChange}
          onKeyPress={handlePressKey}
          autoComplete="off"
        />
        <button
          type="button"
          className="chatting-input-button"
          onClick={sendMessage}
        >
          전송
        </button>
      </div>
    </div>
  );
}

export default LiveChat;
