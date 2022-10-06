import React from "react";
import "./Pagination.scss";
import Pagination from "react-js-pagination";

function Paging({ page, count, setPage }) {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={15}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText="‹"
      nextPageText="›"
      onChange={setPage}
    />
  );
}

export default Paging;
