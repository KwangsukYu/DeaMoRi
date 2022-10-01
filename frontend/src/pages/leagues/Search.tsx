import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Search.scss";
import SearchIcon from "assets/images/searchIcon.svg";
import Poster from "./Poster";
import Loader from "./Loader";
import EndMessage from "./EndMessage";

interface searchProps {
  leagueStatus: boolean;
}

// function Search({ keyword, change }: searchProps) {
function Search({ leagueStatus }: searchProps) {
  const [keyword, setKeyword] = useState("");

  console.log(keyword);
  const [items, setItems] = useState([] as any);

  // 끝까지 갈 경우 페이지를 더이상 불러오지 않도록 설정
  const [hasMore, setHasMore] = useState(true);
  const [enterSubmit, setEnterSubmit] = useState(false);
  const [page, setPage] = useState(0);
  // const [page, setPage] = useState(1);

  const handleKeyword = (changeValue: string) => {
    setKeyword(changeValue);
  };

  // const handlePage = () => {
  //   setPage(1);
  // };

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        // `http://j7c208.p.ssafy.io:8080/api/league?field=id&_page=0&size=8`
        // `http://j7c208.p.ssafy.io:8080/api/league?field=id&keyword=${keyword}&page=0&size=8`
        `http://j7c208.p.ssafy.io:8080/api/league?field=id&keyword=${keyword}&page=0&size=1000`
      );
      const data = await res.json();
      setEnterSubmit(false);
      setItems(data.getLeagues);
    };
    getComments();
    // if (keyword) {
    //   setItems([]);
    // }
  }, [enterSubmit]);

  // useEffect(() => {
  //   // console.log(items.length);
  //   const getComments = async () => {
  //     const res = await fetch(
  //       // `http://j7c208.p.ssafy.io:8080/api/league?field=id&_page=0&size=8`
  //       // `http://j7c208.p.ssafy.io:8080/api/league?field=id&keyword=${keyword}&page=0&size=8`
  //       `http://j7c208.p.ssafy.io:8080/api/league?field=id&keyword=${keyword}&page=0&size=8`
  //     );
  //     const data = await res.json();
  //     setEnterSubmit(false);
  //     setItems(data.getLeagues);
  //   };
  //   getComments();
  // }, [keyword]);

  const fetchComments = async () => {
    // if (keyword.length > 0 && page) {
    // }
    const res = await fetch(
      // `http://j7c208.p.ssafy.io:8080/api/league?field=id&page=${page}&size=8`
      // `http://j7c208.p.ssafy.io:8080/api/league?field=id&keyword=${keyword}&page=${page}&size=8`
      `http://j7c208.p.ssafy.io:8080/api/league?field=id&keyword=${keyword}&page=${
        page + 1
      }&size=8`
    );
    console.log(res);
    const data = await res.json();
    console.log(data, "22");
    console.log(data.getLeagues);
    return data.getLeagues;
  };

  // fetchData : 화면이 아래까지 도착함을 감지할 경우 다음 페이지를 불러옴
  const fetchData = async () => {
    const commentsFormServer = await fetchComments();

    setItems([...items, ...commentsFormServer]);

    // 페이지를 끝까지 불러왔는지 확인
    if (commentsFormServer.length === 0 || commentsFormServer.length < 8) {
      // 화면이 끝까지 불러올 경우 false로 변경하여 더이상 불러오지 않음
      setHasMore(false);
    }
    setPage(page + 1);
  };

  const handleEnterSubmit = () => {
    setEnterSubmit(!enterSubmit);
    setItems([]);
    fetchComments();
  };
  return (
    <div id="search">
      <div className="search">
        <span className="search-container">
          <input
            type="text"
            className="search-container-input"
            onChange={e => handleKeyword(e.target.value)}
          />
          <img
            src={SearchIcon}
            alt="searchIcon"
            className="search-container-input-icon"
          />
          <button
            className="search-container-input-button"
            type="button"
            onClick={handleEnterSubmit}
          >
            검색
          </button>
        </span>
      </div>

      <InfiniteScroll
        className="infinitescroll"
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={<EndMessage />}
      >
        {/* 대회 진행중 */}
        {leagueStatus && (
          <div className="scroll">
            {items
              .filter((item: any) => item.status < 2)
              .map((item: any) => {
                return <Poster key={item.leagueId} item={item} />;
              })}
          </div>
        )}
        {/* 대회 종료 */}
        {!leagueStatus && (
          <div className="scroll">
            {items
              .filter((item: any) => item.status > 1)
              .map((item: any) => {
                return <Poster key={item.leagueId} item={item} />;
              })}
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}

export default Search;
