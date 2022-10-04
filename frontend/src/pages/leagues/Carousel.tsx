import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.scss";
import Poster from "./Poster";
import LeagueStart from "../../apis/leagues/LeagueStart";

function Carousel() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await LeagueStart();
      console.log(res);
      console.log(res[0].id);
      setItems(res);
    })();
  }, []);

  const settings = {
    dots: true,
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
    // nextArrow: true,
    // prevArrow: true,
  };

  return (
    <div id="carousel">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Slider className="carousel" {...settings}>
        {items.map(item => {
          return <Poster key={item.id} item={item} />;
        })}
        {/* <Poster item={item} /> */}
        {/* {items.map(item => {
          return <Poster key={item.id} item={item} />;
        })} */}
        {/* <div className="poster">Slide 1</div>
        <div className="poster">Slide 2</div>
        <div className="poster">Slide 3</div>
        <div className="poster">Slide 4</div>
        <div className="poster">Slide 5</div>
        <div className="poster">Slide 6</div>
        <div className="poster">Slide 7</div> */}
      </Slider>
    </div>
  );
}
export default Carousel;
