import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import OfferBuyerModal from "../Modals/OfferBuyerModal";
// import OfferSellerModal from "../Modals/OfferSellerModal";
// import LiveNowUser from "../Modals/LiveNowUser";

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

  // function openBuyOfferModal(){
  //   setBuyOfferModalOpen(true);
  // }
  // function closeBuyOfferModal(){
  //   setBuyOfferModalOpen(false);
  // }

  // function openSellOfferModal(){
  //   setSellOfferModalOpen(true);
  // }
  // function closeSellOfferModal(){
  //   setSellOfferModalOpen(false);
  // }

  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h5 style={{ marginInline: "1rem" }}>채팅방</h5>
        </div>
        <p className="watching">{props.props.subscribers.length}</p>
        <div></div>
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
      <div className="livechatInput">
        <input
          className="inputform3"
          placeholder="메세지를 입력하세요"
          id="chatInput"
          value={message}
          onChange={handleChange}
          onKeyPress={handlePressKey}
          autoComplete="off"
        />
        <button className="inputsubmitbutton" onClick={sendMessage}>
          전송
        </button>
      </div>
    </>
  );
};

export default LiveChat;
