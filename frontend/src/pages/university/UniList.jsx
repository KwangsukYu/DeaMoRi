import React, { useEffect, useState } from "react";
import "./UniList.scss";
import uniLogo1 from "assets/images/uni1.png";
import rankLogo1 from "assets/images/rank1.png";
import rankLogo2 from "assets/images/rank2.png";
import rankLogo3 from "assets/images/rank3.png";
import rankLogo4 from "assets/images/rank4.png";
import axios from "axios";
import Pagination from "../../components/Pagination/Pagination";
import UniCompo from "./UniCompo";

function UniList() {
  const [items, setItems] = useState([]); //  리스트에 나타낼 아이템
  const [count, setCount] = useState(0); //  아이템 총 개수
  const [currentpage, setCurrentpage] = useState(1); // 현재페이지
  const [postPerPage] = useState(10); //  페이지당 아이템 개수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // const indexOfLast = currentPage * postsPerPage;
  // const indexOfFirst = indexOfLast - postsPerPage;

  // const currentPosts = (uniList: any) => {
  //   let currentPosts = 0;
  //   currentPosts = uniList.slice(indexOfFirst, indexOfLast);
  //   return currentPosts;
  // };
  const searchUni = e => {
    e.preventDefault();
    axios({
      url: `http://j7c208.p.ssafy.io:8080/api/univers/${search}`,
      method: "get"
      // params: { search }
    })
      .then(res => {
        setItems(res.data);
        document.getElementById("search-input").className.value = "";
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios({
      url: "http://j7c208.p.ssafy.io:8080/api/univers/list",
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.token}` }
    })
      .then(res => {
        setItems(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setCount(items.length);
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentpage, indexOfFirstPost, indexOfLastPost, items, postPerPage]);

  const setPage = e => {
    setCurrentpage(e);
  };

  const myUni = { rank: 3, name: "싸피대학교", price: "53000000" };
  let rankImg = "";
  let rankClass = "";
  if (myUni.rank === 1) {
    rankImg = rankLogo1;
    rankClass = "rankLogo1";
  } else if (myUni.rank === 2) {
    rankImg = rankLogo2;
    rankClass = "rankLogo2";
  } else if (myUni.rank === 3) {
    rankImg = rankLogo3;
    rankClass = "rankLogo3";
  } else {
    rankImg = rankLogo4;
    rankClass = "rankLogo4";
  }
  console.log(currentPosts);
  return (
    <div id="uni-list">
      <div className="uni-list">
        <p className="uni-list-title">내 대학교</p>
        <div className="uni-list-background">
          <div className="uni-list-background-my">
            <div className="uni-list-background-my-logo-box">
              <div className="uni-list-background-my-logo-box-logo">
                <img src={uniLogo1} alt="asdf" />
              </div>
              <p className="uni-list-background-my-logo-box-text">
                {myUni.name}
              </p>
            </div>
            <div className="uni-list-my-text-box">
              <div className="uni-list-my-text">
                <p>랭킹</p>
                <p>총 후원 받은 금액</p>
                <p>내가 후원 한 금액</p>
              </div>
              <div className="uni-list-my-text">
                <div className="uni-list-my-text-logo-box">
                  <img className={rankClass} src={rankImg} alt="" />
                  <p className="uni-list-my-text-logo-box-text">{myUni.rank}</p>
                </div>
                <p>{myUni.price}</p>
                <p>100,000 MOK</p>
              </div>
            </div>
          </div>
        </div>
        <div className="uni-list-total">
          <div className="uni-list-total-title-box">
            <div className="uni-list-total-title-box-title">전체 대학교</div>
            <form
              className="input-box"
              onSubmit={e => {
                searchUni(e);
              }}
            >
              <input
                className="search-input"
                type="text"
                onChange={e => {
                  setSearch(e.target.value);
                }}
              />
              <button type="submit" className="search-button">
                검색
              </button>
            </form>
          </div>
          {currentPosts ? (
            <UniCompo currentPosts={currentPosts} />
          ) : (
            <div className="uni-list-total-background-err">
              <p className="search-err">없는 항목입니다.</p>
            </div>
          )}
        </div>
        <Pagination page={currentpage} count={count} setPage={setPage} />
      </div>
    </div>
  );
}
export default UniList;
