import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Scroll.scss";
import Poster from "./Poster";
import Loader from "./Loader";
import EndMessage from "./EndMessage";

function Scroll() {
  const [items, setItems] = useState([]);

  // 끝까지 갈 경우 페이지를 더이상 불러오지 않도록 설정
  const [hasMore, setHasMore] = useState(true);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=0&_limit=20`
      );
      const data = await res.json();
      setItems(data);
    };
    getComments();
  }, []);

  const fetchComments = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=20`
    );
    console.log(res);
    const data = await res.json();
    return data;
  };

  // fetchData : 화면이 아래까지 도착함을 감지할 경우 다음 페이지를 불러옴
  const fetchData = async () => {
    const commentsFormServer = await fetchComments();

    setItems([...items, ...commentsFormServer]);

    // 페이지를 끝까지 불러왔는지 확인
    if (commentsFormServer.length === 0 || commentsFormServer.length < 20) {
      // 화면이 끝까지 불러올 경우 false로 변경하여 더이상 불러오지 않음
      setHasMore(false);
    }

    setPage(page + 1);
  };
  return (
    <div id="scroll">
      <InfiniteScroll
        className="infinitescroll"
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Loader className="scroll-loader" />}
        endMessage={<EndMessage />}
      >
        <div className="scroll">
          {items.map(item => {
            return <Poster key={item.id} item={item} />;
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Scroll;
