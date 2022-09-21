import React from "react";
import "./Leagues.scss";
import posterSample from "assets/images/posterSample.png";
import Carousel from "./Carousel";
import Poster from "./Poster";
import Pagination from "./Pagination";

// import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";

function Leagues() {
  type leagueData = {
    posterImage?: { posterSample: string };
    title: string;
    time: string;
    place: string;
  };
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
    }
  ];
  console.log(leagueData[0].posterImage);

  return (
    <div id="leagues">
      <div className="container">
        <div>
          <span>
            <button className="createLeague" type="button">
              대회 생성
            </button>
          </span>
        </div>
        <Carousel />
        <div>
          {leagueData.map(item => {
            return <Poster item={item} key={item.title} />;
          })}
        </div>
        <Pagination />
      </div>
    </div>
  );
}
export default Leagues;
