import React, { useState } from "react";
import "./Pagination.scss";
import Pagination from "react-js-pagination";

function Paging() {
  const [page, setPage] = useState(1);

  const handlePageChange = (p: number) => {
    setPage(p);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={450}
      pageRangeDisplayed={5}
      prevPageText="‹"
      nextPageText="›"
      onChange={handlePageChange}
    />
  );
}

export default Paging;
