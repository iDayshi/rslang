import React, { useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import PropTypes from "prop-types";

const PaginationComponent = ({
  currentPage,
  setCurrentPage,
  handlePageChange,
  alwaysShown = true
}) => {
  const pagesCount = 30;
  const isPaginationShown = alwaysShown ? true : pagesCount > 1;
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pagesCount;

  const changePage = (number) => {
    if (currentPage === number) return;
    handlePageChange(number - 1);
    setCurrentPage(number - 1);
  };

  const onPageNumberClick = (pageNumber) => {
    changePage(pageNumber);
  };

  const onPreviousPageClick = () => {
    changePage(currentPage - 1);
  };

  const onNextPageClick = () => {
    changePage(currentPage + 1);
  };

  const setLastPageAsCurrent = () => {
    if (currentPage > pagesCount) {
      setCurrentPage(pagesCount - 1);
    }
  };

  let isPageNumberOutOfRange;

  const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pagesCount;
    const isCurrentPageWithinTwoPageNumbers =
      Math.abs(pageNumber - currentPage) <= 2;

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false;
      return (
        <Pagination.Item
          key={pageNumber}
          onClick={() => onPageNumberClick(pageNumber)}
          active={pageNumber === currentPage}
        >
          {pageNumber}
        </Pagination.Item>
      );
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      return <Pagination.Ellipsis key={pageNumber} className="muted" />;
    }

    return null;
  });

  useEffect(setLastPageAsCurrent, [pagesCount]);

  return (
    <>
      {isPaginationShown && (
        <Pagination className="d-flex align-items-center justify-content-center">
          <Pagination.Prev
            onClick={onPreviousPageClick}
            disabled={isCurrentPageFirst}
          />
          {pageNumbers}
          <Pagination.Next
            onClick={onNextPageClick}
            disabled={isCurrentPageLast}
          />
        </Pagination>
      )}
    </>
  );
};

PaginationComponent.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  alwaysShown: PropTypes.bool
};

export default PaginationComponent;

// import React from "react";
// import _ from "lodash";
// import PropTypes from "prop-types";
// import Pagination from "react-bootstrap/Pagination";

// const PaginationView = ({ onPageChange, currentPage }) => {
//   const pageCount = 30;
//   const pages = _.range(1, pageCount + 1);

//   return (
//     <Pagination className="d-flex align-items-center justify-content-center">
//       <Pagination.First />
//       <Pagination.Prev />
//       <Pagination.Item>{1}</Pagination.Item>
//       <Pagination.Ellipsis />

//       <Pagination.Item>{10}</Pagination.Item>
//       <Pagination.Item>{11}</Pagination.Item>
//       <Pagination.Item active>{12}</Pagination.Item>
//       <Pagination.Item>{13}</Pagination.Item>

//       <Pagination.Ellipsis />
//       <Pagination.Item>{20}</Pagination.Item>
//       <Pagination.Next />
//       <Pagination.Last />
//     </Pagination>
//     // <nav className="d-flex align-items-center justify-content-center">
//     //   <ul className="pagination">
//     //     {pages.map((page) => (
//     //       <li
//     //         className={"page-item " + (page === currentPage ? "active" : "")}
//     //         key={"page_" + page}
//     //       >
//     //         <button
//     //           className="page-link"
//     //           onClick={() => onPageChange(page - 1)}
//     //         >
//     //           {page}
//     //         </button>
//     //       </li>
//     //     ))}
//     //   </ul>
//     // </nav>
//   );
// };

// PaginationView.propTypes = {
//   onPageChange: PropTypes.func.isRequired,
//   currentPage: PropTypes.number.isRequired
// };
// export default PaginationView;
