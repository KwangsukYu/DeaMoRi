import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function CreateRoom() {
  const [title, setTitle] = useState("");
  const productid = useParams().id;

  const submitButton = (
    <button className="inputform submitbutton-able" type="submit">
      방 생성하기
    </button>
  );

  const OPENVIDU_SERVER_URL = "https://localhost:4443";
  const OPENVIDU_SERVER_SECRET = "MY_SECRET";

  function createSession(sessionId) {
    console.log("방제목", title);
    const data = JSON.stringify({ customSessionId: `broadcast${sessionId}` });
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
        console.log("CREATE SESION", response);
        console.log(response.data.id);
        // document.openvidution.href = `/live/broadcast${title}`;
        window.location.href = `/live/broadcast${title}`;
      })
      .catch(err => {
        console.log("createsessionerr", err);
        if (err.response.status === 409) {
          // document.location.href = `/live/sell1`
        }
      });
  }

  function goLive(e) {
    e.preventDefault();
    createSession(title);
  }

  return (
    <div>
      <div>
        <div className="test">
          <div className="test3">
            <h1 className="my-5">중계생성</h1>
            <form onSubmit={e => goLive(e)}>
              <input
                onChange={e => setTitle(e.target.value)}
                className="inputform"
                name="roomTitle"
                id="roomTitle"
                type="text"
                placeholder="방 제목"
                value={title}
              />
              {submitButton}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRoom;
