import React, { useEffect, useState } from "react";
import "./UniList.scss";
import uniLogo1 from "assets/images/uni1.png";
import rankLogo1 from "assets/images/rank1.png";
import rankLogo2 from "assets/images/rank2.png";
import rankLogo3 from "assets/images/rank3.png";
import rankLogo4 from "assets/images/rank4.png";
import axios from "axios";
import Loading from "components/Loading/Loading";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchNum, setSearchNum] = useState(0);
  const [myUni, setMyUni] = useState({});

  const storeUser = useSelector(state => state.userInfo.userInfo);
  const navigate = useNavigate();
  const searchUni = async e => {
    setLoading(true);
    e.preventDefault();
    if (search) {
      await axios({
        url: `https://j7c208.p.ssafy.io:8080/api/univers/search/${search}`,
        method: "get"
        // params: { search }
      })
        .then(res => {
          setItems(res.data);
          setLoading(false);
          setSearchNum(res.data.length);
          setCurrentpage(1);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      await axios({
        url: "https://j7c208.p.ssafy.io:8080/api/univers/list",
        method: "get"
        // headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          setItems(res.data);
          setSearchNum(res.data.length);
          setLoading(false);
          setCurrentpage(1);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setLoading(true);

    axios({
      url: "https://j7c208.p.ssafy.io:8080/api/univers/list",
      method: "get"
      // headers: { Authorization: `Bearer ${localStorage.token}` }
    })
      .then(res => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // setLoading(true);
    setCount(items.length);
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));
    setSearchNum(items.slice(indexOfFirstPost, indexOfLastPost).length);

    // setTimeout(() => {
    //   setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));
    //   setLoading(false);
    // }, 500);
  }, [currentpage, indexOfFirstPost, indexOfLastPost, items, postPerPage]);

  useEffect(() => {
    if (localStorage.token) {
      axios({
        url: `https://j7c208.p.ssafy.io:8080/api/univers`,
        method: "get",
        headers: { Authorization: `Bearer ${localStorage.token}` },
        params: { id: storeUser.universityPk }
      })
        .then(res => {
          setMyUni(res.data);
        })
        .catch(err => err);
    }
  }, []);

  const setPage = e => {
    setCurrentpage(e);
  };

  // const myUni = { rank: 3, name: "싸피대학교", price: "53000000" };
  let rankImg = "";
  let rankClass = "";
  if (myUni.ranking === 1) {
    rankImg = rankLogo1;
    rankClass = "rankLogo1";
  } else if (myUni.ranking === 2) {
    rankImg = rankLogo2;
    rankClass = "rankLogo2";
  } else if (myUni.ranking === 3) {
    rankImg = rankLogo3;
    rankClass = "rankLogo3";
  } else {
    rankImg = rankLogo4;
    rankClass = "rankLogo4";
  }

  return (
    <div id="uni-list">
      {localStorage.token ? (
        <div className="uni-list">
          <p className="uni-list-title">내 대학교</p>
          <div className="uni-list-background">
            {storeUser.universityName ? (
              <div className="uni-list-background-my">
                <div type="button" className="uni-list-background-my-logo-box">
                  <button
                    type="button"
                    className="navi-button"
                    onClick={() => {
                      navigate(`/university/${storeUser.universityPk}`);
                    }}
                  >
                    <div className="uni-list-background-my-logo-box-logo">
                      <img
                        className="uni-list-background-my-logo-box-logo-unilogo"
                        src={myUni.logoUrl}
                        alt="asdf"
                      />
                    </div>
                    <p className="uni-list-background-my-logo-box-text">
                      {myUni.universityName}
                    </p>
                  </button>
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
                      <p className="uni-list-my-text-logo-box-text">
                        {myUni.ranking}
                      </p>
                    </div>
                    <p>
                      {Number(myUni.donation)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      WON
                    </p>
                    <p>
                      {Number(storeUser.donation)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      WON
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-uni-box">
                <p className="no-uni-box-text">등록된 대학이 없습니다.</p>
                <Link to="/mypage">
                  <button className="no-uni-box-button" type="button">
                    등록하러 가기
                  </button>
                </Link>
              </div>
            )}
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
            {loading ? (
              <Loading />
            ) : (
              <div>
                {currentPosts.length === 10 || items.length === searchNum ? (
                  <UniCompo currentPosts={currentPosts} />
                ) : (
                  <div className="uni-list-total-background-err">
                    <p className="search-err">없는 항목입니다.</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <Pagination page={currentpage} count={count} setPage={setPage} />
        </div>
      ) : (
        <div id="uni-list">
          <div className="uni-list">
            <p className="uni-list-title">내 대학교</p>
            <div className="uni-list-background">
              <div className="no-uni-box">
                <p className="no-uni-box-text">로그인이 필요합니다.</p>
                <div className="login-signup-box">
                  <Link to="/login">
                    <button className="no-uni-box-button" type="button">
                      로그인
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="no-uni-box-button" type="button">
                      회원가입
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="uni-list-total">
              <div className="uni-list-total-title-box">
                <div className="uni-list-total-title-box-title">
                  전체 대학교
                </div>
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
              {loading ? (
                <Loading />
              ) : (
                <div>
                  {currentPosts.length === 10 || items.length === searchNum ? (
                    <UniCompo currentPosts={currentPosts} />
                  ) : (
                    <div className="uni-list-total-background-err">
                      <p className="search-err">없는 항목입니다.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <Pagination page={currentpage} count={count} setPage={setPage} />
          </div>
        </div>
      )}
    </div>
  );
}
export default UniList;
