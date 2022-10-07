import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.scss";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { infoType } from "Slices/userInfo";
import Poster from "./Poster";
import MyUniversityLeague from "../../apis/leagues/MyUniversityLeague";

function Carousel() {
  const [items, setItems] = useState<any[]>([]);

  const userInfo = useSelector((state: infoType) => state.userInfo.userInfo);

  useEffect(() => {
    if (localStorage.token) {
      (async () => {
        const res = await MyUniversityLeague(userInfo.universityPk);
        setItems(res);
      })();
    }
  }, []);

  const settings = {
    dots: true,
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <div id="carousel">
      {items.length === 0 && (
        <div className="carousel-comment">현재 진행중인 대회가 없습니다.</div>
      )}
      {items.length !== 0 && (
        <Slider className="carousel" {...settings}>
          {items.map(item => {
            return <Poster key={v4()} item={item} />;
          })}
        </Slider>
      )}
    </div>
  );
}
export default Carousel;

// {
//   /* eslint-disable-next-line react/jsx-props-no-spreading */
// }
