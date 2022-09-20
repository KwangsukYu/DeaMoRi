import "./Rankings.scss";

function UniRankings() {
  const universities = [
    { rank: "1", name: "전남대학교", price: "5000000" },
    { rank: "2", name: "조선대학교", price: "4000000" },
    { rank: "3", name: "서울대학교", price: "3000000" },
    { rank: "4", name: "연세대학교", price: "2000000" },
    { rank: "5", name: "고려대학교", price: "1000000" },
  ];
  const RankMain = universities.map((uni) => {
    return (
      <div className="rank-main">
        <p className="rank-main-rank">{uni.rank}</p>
        <p className="rank-main-name">{uni.name}</p>
        <p className="rank-main-money">{uni.price} MOKO</p>
        {/* <h3 className="rank-main-rank">1</h3>
          <h3 className="rank-main-name">2</h3>
          <h3 className="rank-main-money">3</h3> */}
      </div>
    );
  });
  return (
    <div id="rank-box">
      <div className="rank-menu">
        <p className="rank-menu-rank">순위</p>
        <p className="rank-menu-name">학교명</p>
        <p className="rank-menu-money">획득상금</p>
      </div>
      {RankMain}
    </div>
  );
}
export default UniRankings;
