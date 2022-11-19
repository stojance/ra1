import React from "react";
import PropTypes from "prop-types";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const DataPager = ({ currentPage, data, pageSize, onPageClick }) => {
  const _pagesCount = Math.ceil(data.length / pageSize);
  //console.log(_pagesCount);
  //console.log(pageSize);

  const handlePagingClick = (e, newCurrentPage) => {
    e.preventDefault();
    let sliceData = data.slice(
      newCurrentPage * pageSize,
      (newCurrentPage + 1) * pageSize
    );

    if (onPageClick) {
      onPageClick(sliceData, newCurrentPage);
    }
  };

  return (
    <div className="pagination-wrapper">
      <Pagination aria-label="Page navigation example">
        <PaginationItem disabled={currentPage === 0}>
          <PaginationLink
            onClick={(e) => handlePagingClick(e, 0)}
            first
            href="#"
          />
        </PaginationItem>

        <PaginationItem disabled={currentPage <= 0}>
          <PaginationLink
            onClick={(e) => handlePagingClick(e, currentPage - 1)}
            previous
            href="#"
          />
        </PaginationItem>

        {[...Array(_pagesCount)].map((page, i) => {
          const prevDots = i === currentPage - 3 && i > 0 ? "..." : null;
          const nextDots =
            i === currentPage + 3 && i < _pagesCount - 1 ? "..." : null;

          return i >= currentPage - 3 && i <= currentPage + 3 ? (
            <PaginationItem active={i === currentPage} key={i}>
              <PaginationLink onClick={(e) => handlePagingClick(e, i)} href="#">
                {prevDots}
                {i + 1}
                {nextDots}
              </PaginationLink>
            </PaginationItem>
          ) : null;
        })}

        <PaginationItem disabled={currentPage >= _pagesCount - 1}>
          <PaginationLink
            onClick={(e) => handlePagingClick(e, currentPage + 1)}
            next
            href="#"
          />
        </PaginationItem>
        <PaginationItem disabled={currentPage === _pagesCount - 1}>
          <PaginationLink
            onClick={(e) => handlePagingClick(e, _pagesCount - 1)}
            last
            href="#"
          />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

DataPager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  pageSize: PropTypes.number,
  onPageClick: PropTypes.func.isRequired,
};

DataPager.defaultProps = {
  currentPage: 0,
  pageSize: 10,
};

export default DataPager;
