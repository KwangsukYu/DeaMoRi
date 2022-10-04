import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./Carousel.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { infoType } from "Slices/userInfo";
// import CarouselPoster from "./CarouselPoster";
import Poster from "./Poster";

function Carousel() {
  // Redux 안에 universityPk 확인 가능
  const userInfo = useSelector((state: infoType) => state.userInfo.userInfo);
  const [items, setItems] = useState([] as any);

  // console.log("여기지롱");
  // console.log(userInfo);

  useEffect(() => {
    function getMyLeagues() {
      if (userInfo.universityPk) {
        axios({
          url: `http://j7c208.p.ssafy.io:8080/api/univers/league/${userInfo.universityPk}`,
          method: "get",
          headers: { Authorization: `Bearer ${localStorage.token}` }
        })
          .then(res => {
            console.log(res, "내 대학 리그");
            // console.log(res);
            const data = res.data.getLeagues;
            setItems(data);
          })
          .catch(err => {
            console.error(err);
          });
      } else setItems([]);
    }
    getMyLeagues();
  }, []);

  const scroll = Math.ceil(items.length / 3);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: scroll,
    arrows: false
  };

  return (
    <div id="carousel">
      {userInfo.universityPk ? (
        <Slider {...settings}>
          <div className="poster">
            {items
              .filter((item: any) => item.status < 2)
              .map((item: any) => {
                return <Poster key={item.leagueId} item={item} />;
              })}
          </div>
        </Slider>
      ) : (
        <div>대학을 등록해주세요</div>
      )}
    </div>
  );
}
export default Carousel;
