import "./Leagues.scss";
import Carousel from "./Carousel";
import Poster from "./Poster";
import BasicPagination from "./BasicPagenation";
// import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";

function Leagues() {
  return (
    <div id="leagues">
      <div className="container">
        <Carousel />
        <div>
          <Poster />
        </div>
        <BasicPagination />
      </div>
    </div>
  );
}
export default Leagues;
