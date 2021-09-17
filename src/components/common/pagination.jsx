import React from "react";
import _ from "lodash";

const Pagination = ({ totalItems, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) return null;
  const paged = _.range(1, totalPages + 1);
  return (
    <nav>
      <ul className="pagination">
        {paged.map((paged) => (
          <li
            onClick={() => onPageChange(paged)}
            key={paged}
            className={paged === currentPage ? "page-item active" : "page-item"}
          >
            <a href="#P" className="page-link">
              {paged}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
