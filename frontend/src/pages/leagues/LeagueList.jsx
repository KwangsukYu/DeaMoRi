// import { React, useState, useCallback } from "react";
import React from "react";
import "./LeagueList.scss";
import posterSample from "assets/images/posterSample.png";
import Poster from "./Poster";

function LeagueList() {
  // type leagueData = {
  //   posterImage?: { posterSample: string };
  //   title: string;
  //   time: string;
  //   place: string;
  // };

  const leagueData = [
    {
      posterImage: { posterSample },
      title: "춘계 축구대회1",
      time: "22.09.21",
      place: "전남대체육관"
    },
    {
      posterImage: { posterSample },
      title: "춘계 축구대회2",
      time: "22.09.21",
      place: "전남대체육관"
    },
    {
      posterImage: { posterSample },
      title: "춘계 축구대회3",
      time: "22.09.21",
      place: "전남대체육관"
    },
    {
      posterImage: { posterSample },
      title: "춘계 축구대회4",
      time: "22.09.21",
      place: "전남대체육관"
    },
    {
      posterImage: { posterSample },
      title: "춘계 축구대회5",
      time: "22.09.21",
      place: "전남대체육관"
    },
    {
      posterImage: { posterSample },
      title: "춘계 축구대회6",
      time: "22.09.21",
      place: "전남대체육관"
    },
    {
      posterImage: { posterSample },
      title: "춘계 축구대회7",
      time: "22.09.21",
      place: "전남대체육관"
    },
    {
      posterImage: { posterSample },
      title: "춘계 축구대회8",
      time: "22.09.21",
      place: "전남대체육관"
    },
    {
      posterImage: { posterSample },
      title: "춘계 축구대회9",
      time: "22.09.21",
      place: "전남대체육관"
    },
    {
      posterImage: { posterSample },
      title: "춘계 축구대회10",
      time: "22.09.21",
      place: "전남대체육관"
    },
    {
      posterImage: { posterSample },
      title: "춘계 축구대회11",
      time: "22.09.21",
      place: "전남대체육관"
    },
    {
      posterImage: { posterSample },
      title: "춘계 축구대회12",
      time: "22.09.21",
      place: "전남대체육관"
    }
  ];

  return (
    <div id="leaguelist">
      {leagueData.map(item => {
        return <Poster item={item} key={item.title} />;
      })}
    </div>
  );
}
export default LeagueList;
