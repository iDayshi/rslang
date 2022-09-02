import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ onPageChange, currentPage }) => {
  const pageCount = 30;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav className="d-flex align-items-center justify-content-center">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={"page-item " + (page === currentPage ? "active" : "")}
            key={"page_" + page}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(page - 1)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};
export default Pagination;
