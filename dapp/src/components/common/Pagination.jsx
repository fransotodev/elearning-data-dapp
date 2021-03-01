import React, { Component } from "react";
import PropTypes from "prop-types";
class Pagination extends Component {
  render() {
    const pagesCount = Math.ceil(this.props.itemsCount / this.props.pageSize);
    if (pagesCount === 1) return null;

    const pages = Array(pagesCount)
      .fill(0)
      .map((e, index) => index + 1);

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {pages.map((page, index) => (
            <li
              key={index}
              style={{ cursor: "pointer" }}
              className={
                page === this.props.currentPage
                  ? "page-item active"
                  : "page-item"
              }
            >
              <button
                className="page-link"
                onClick={() => this.props.onPageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default Pagination;
