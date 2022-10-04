import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./SearchIng.scss";
import { getLeagues } from "apis/leagues/InfinityScroll";
import SearchIcon from "assets/images/searchIcon.svg";
import { CircularProgress } from "@mui/material";
import { CircularProgress } from "@mui/material";
import Poster from "./Poster";
import Loader from "./Loader";
import EndMessage from "./EndMessage";

function SearchIng() {
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState([] as any);
  const [hasMore, setHasMore] = useState(true);
  const [enterSubmit, setEnterSubmit] = useState(false);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `http://j7c208.p.ssafy.io:8080/api/league?field=id&keyword=${keyword}&page=${page}&size=8`
      );
      const data = await res.json();
      setItems(data.getLeagues);
    };
    getComments();
  }, [keyword]);

  const fetchComments = async () => {
    const res = await fetch(
      `http://j7c208.p.ssafy.io:8080/api/league?field=id&keyword=${keyword}&page=${
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

  return (
    <div id="search">
      <div className="search">
        <span className="search-container">
          <input
            type="text"
            className="search-container-input"
            onChange={e => setKeyword(e.target.value)}
          />
          <img
            src={SearchIcon}
            alt="searchIcon"
            className="search-container-input-icon"
          />
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
          {items
            .filter((item: any) => item.status < 2)
            .map((item: any) => {
              return <Poster key={item.leagueId} item={item} />;
            })}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default SearchIng;
