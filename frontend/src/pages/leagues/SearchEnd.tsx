import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./SearchIng.scss";
import axios from "axios";
import SearchIcon from "assets/images/searchIcon.svg";
import Poster from "./Poster";
import Loader from "./Loader";
import EndMessage from "./EndMessage";

function SearchEnd() {
  const [keyword, setKeyword] = useState("");

  const [items, setItems] = useState([] as any);

  // 끝까지 갈 경우 페이지를 더이상 불러오지 않도록 설정
  const [hasMore, setHasMore] = useState(true);
  const [enterSubmit, setEnterSubmit] = useState(false);
  const [page, setPage] = useState(0);

  const handleKeyword = (changeValue: string) => {
    setKeyword(changeValue);
  };

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `http://j7c208.p.ssafy.io:8080/api/league/closed?field=id&keyword=${keyword}&page=0&size=8`
      );
      const data = await res.json();
      setItems(data.getLeagues);
    };
    getComments();
  }, [keyword]);

  const fetchComments = async () => {
    const res = await fetch(
      `http://j7c208.p.ssafy.io:8080/api/league/closed?field=id&keyword=${keyword}&page=${
        page + 1
      }&size=8`
    );
    const data = await res.json();
    return data.getLeagues;
  };

  const fetchData = async () => {
    const commentsFormServer = await fetchComments();

    setItems([...items, ...commentsFormServer]);
    if (commentsFormServer.length === 0 || commentsFormServer.length < 8) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  const handleEnterSubmit = async () => {
    setPage(0);
    await fetchComments();
    setEnterSubmit(!enterSubmit);
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
        <div className="scroll">
          {items.map((item: any) => {
            return <Poster key={item.leagueId} item={item} />;
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default SearchEnd;
