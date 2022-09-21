import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import OfferBuyerModal from "../Modals/OfferBuyerModal";
// import OfferSellerModal from "../Modals/OfferSellerModal";
// import LiveNowUser from "../Modals/LiveNowUser";
import "./LiveChat.scss";

const LiveChat = (props) => {
  console.log("통신", props.props.subscribers);
  // console.log('섭스',this.state.subscribers)
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  // let store = useSelector((state) => { return state })
  const [nowUserModal, setNowUserModal] = useState(false);
  // const [buyofferModalOpen, setBuyOfferModalOpen] = useState(false);
  // const [sellofferModalOpen, setSellOfferModalOpen] = useState(false);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    props.props.session.on("signal:chat", (event) => {
      const data = JSON.parse(event.data);
      let messageListData = messageList;
      messageListData.push({
        connectionId: event.from.connectionId,
        nickname: data.nickname,
        message: data.message,
      });
      setMessageList([...messageListData]);
    });
    if (props.props.myUserName) {
      const welcome = {
        message: `${props.props.myUserName}님이 입장하셨습니다.`,
        nickname: props.props.myUserName,
        streamId: props.props.streamId,
      };
      props.props.session.signal({
        data: JSON.stringify(welcome),
        type: "chat",
      });
    }
  }, []);

  const handlePressKey = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (props.props.myUserName && message) {
      let messageData = message.replace(/ +(?= )/g, "");
      if (messageData !== "" && messageData !== " ") {
        const data = {
          message: messageData,
          nickname: props.props.myUserName,
          streamId: props.props.streamId,
        };
        props.props.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        });
      }
    }
    setMessage("");
  };

  function openNowUserModal() {
    setNowUserModal(true);
  }
  function closeNowUserModal() {
    setNowUserModal(false);
  }

  return (
    <>
      <div className="chatting">
        <div className="chatting-title">
          <p className="chatting-title-text">채팅방</p>
        </div>

        <div className="chatbox">
          <div className="">
            {messageList.map((data, i) => (
              <div key={i} id="remoteUsers" className="">
                <div className="liveChatItem">
                  <div className="livechatcontent">
                    <p className="chatnickname">{data.nickname}</p>
                    <p className="livechatbox2">{data.message}</p>
                  </div>
                </div>
              </div>
            ))}
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
          <button className="chatting-input-button" onClick={sendMessage}>
            전송
          </button>
        </div>
      </div>
    </>
  );
};

export default LiveChat;
