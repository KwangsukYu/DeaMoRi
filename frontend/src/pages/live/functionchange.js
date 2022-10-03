import React from "react";
import axios from "axios";

function CreateRoom({ leaguePk, leaguId }) {
  const pk = 2;

  // https://j7c208.p.ssafy.io:4443
  const OPENVIDU_SERVER_URL = "https://j7c208.p.ssafy.io:8443";
  const OPENVIDU_SERVER_SECRET = "ohgwang12";

  function createSession() {
    const data = JSON.stringify({ customSessionId: `broadcast${pk}` });
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
        // document.openvidution.href = `/live/broadcast${title}`;
        window.location.href = `/live/broadcast${pk}`;
      })
      .catch(err => {
        if (err.response.status === 409) {
          // document.location.href = `/live/sell1`
        }
      });
  }

  return (
    <button
      className="inputform submitbutton-able"
      type="button"
      onClick={createSession}
    >
      방 생성하기
    </button>
  );
}

export default CreateRoom;
