import React from "react";

export default function Pagination({ postPerPage, totalPosts, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li style={{ cursor: "pointer" }} key={number} className="page-item">
            <div onClick={() => paginate(number)} className="page-link">
              {number}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
