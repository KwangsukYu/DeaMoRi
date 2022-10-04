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

function Carousel({ sliders }: any) {
  // Redux 안에 universityPk 확인 가능
  const userInfo = useSelector((state: infoType) => state.userInfo.userInfo);
  const [items, setItems] = useState([] as any);

  // console.log("여기지롱");
  // console.log(userInfo);

  useEffect(() => {
    function getMyLeagues() {
      axios({
        url: `http://j7c208.p.ssafy.io:8080/api/univers/league/${userInfo.universityPk}`,
        method: "get",
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          console.log(res.data, "내 대학 리그");
          // console.log(res);
          const data = res.data.getLeagues;
          setItems(data);
        })
        .catch(err => {
          console.error(err);
        });
    }
    getMyLeagues();
  }, []);

  console.log(items);
  const settings = {
    dots: true,
    infinite: true,
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    centerPadding: "0px"
  };

  return (
    <div id="carousel">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {/* <Slider {...settings} className="carousel"> */}
      {/* <div className="carousel"> */}
      <Slider {...settings} className="carousel">
        {items
          .filter((item: any) => item.status < 2)
          .map((item: any) => {
            return <Poster key={item.leagueId} item={item} />;
          })}
      </Slider>
      {/* </div> */}
      {/* <div className="poster">Slide 1</div>
        <div className="poster">Slide 2</div>
        <div className="poster">Slide 3</div>
        <div className="poster">Slide 4</div>
        <div className="poster">Slide 5</div>
        <div className="poster">Slide 6</div>
        <div className="poster">Slide 7</div> */}
      {/* </Slider> */}
    </div>
  );
}

//   return (
//     <div id="carousel">
//       {/* eslint-disable-next-line react/jsx-props-no-spreading */}
//       <Slider {...settings} className="carousel">
//         {/* <div className="carousel"> */}
//         {items
//           .filter((item: any) => item.status < 2)
//           .map((item: any) => {
//             return <Poster key={item.leagueId} item={item} />;
//           })}
//         {/* </div> */}
//         {/* <div className="poster">Slide 1</div>
//         <div className="poster">Slide 2</div>
//         <div className="poster">Slide 3</div>
//         <div className="poster">Slide 4</div>
//         <div className="poster">Slide 5</div>
//         <div className="poster">Slide 6</div>
//         <div className="poster">Slide 7</div> */}
//       </Slider>
//     </div>
//   );
// }
export default Carousel;
