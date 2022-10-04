import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// interface CreateRoomProps {
//   leaguePk: number;
//   leagueId: string;
// }

function CreateRoom() {
  //  { leaguePk, leagueId }: CreateRoomProps
  const pk = 2;
  const leaguePk = "3";

  // https://j7c208.p.ssafy.io:4443
  const OPENVIDU_SERVER_URL = "https://j7c208.p.ssafy.io:8443";
  const OPENVIDU_SERVER_SECRET = "ohgwang12";
  const navigate = useNavigate();

  function createSession() {
    const data = JSON.stringify({ customSessionId: `broadcast${leaguePk}` });
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
        // document.openvidution.href = `/live/broadcast${title}`;\
        navigate(`/live/broadcast${leaguePk}`);
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
