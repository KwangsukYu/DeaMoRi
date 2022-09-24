import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.scss";

function Carousel() {
  const settings = {
    dots: true,
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
      <Slider {...settings}>
        <div className="poster">Slide 1</div>
        <div className="poster">Slide 2</div>
        <div className="poster">Slide 3</div>
        <div className="poster">Slide 4</div>
        <div className="poster">Slide 5</div>
        <div className="poster">Slide 6</div>
      </Slider>
    </div>
  );
}
export default Carousel;
