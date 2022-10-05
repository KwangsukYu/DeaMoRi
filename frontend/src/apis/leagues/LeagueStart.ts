import React, { useState } from "react";
import axios from "axios";

async function LeagueStart() {
  // const [props, setProps] = useState('')

  const response = await axios({
    // url: `https://jsonplaceholder.typicode.com/comments?_page=0&_limit=20`,

    url: `https://j7c208.p.ssafy.io:8080/api/league?field=id&page=0&size=10000`,
    method: "get",
    headers: {
      // Authorization: `Bearer ${localStorage.token}`
      // "Content-Type": "multipart/form-data"
    }
  })
    .then(res => {
      console.log(res.data.getLeagues);
      return res.data.getLeagues;
    })
    .catch(err => {
      console.log(err);
    });
  return response;
}

export default LeagueStart;
