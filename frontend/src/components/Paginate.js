import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  if (pages <= 1) return null;

  return (
    <div className="pagination-container">
      <Pagination>
        {/* Previous Button */}
        <LinkContainer
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${Math.max(1, page - 1)}`
                : `/page/${Math.max(1, page - 1)}`
              : `/admin/productlist/${Math.max(1, page - 1)}`
          }
        >
          <Pagination.Prev
            disabled={page === 1}
            className="pagination-nav-btn"
          />
        </LinkContainer>

        {/* Page Numbers */}
        {[...Array(pages).keys()].map((x) => {
          const pageNum = x + 1;
          // Show current page, first page, last page, and one page before and after current
          if (
            pageNum === 1 ||
            pageNum === pages ||
            (pageNum >= page - 1 && pageNum <= page + 1)
          ) {
            return (
              <LinkContainer
                key={pageNum}
                to={
                  !isAdmin
                    ? keyword
                      ? `/search/${keyword}/page/${pageNum}`
                      : `/page/${pageNum}`
                    : `/admin/productlist/${pageNum}`
                }
              >
                <Pagination.Item
                  active={pageNum === page}
                  className="pagination-item"
                >
                  {pageNum}
                </Pagination.Item>
              </LinkContainer>
            );
          }

          // Show ellipsis for gaps
          if (pageNum === page - 2 || pageNum === page + 2) {
            return <Pagination.Ellipsis key={`ellipsis-${pageNum}`} />;
          }

          return null;
        })}

        {/* Next Button */}
        <LinkContainer
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${Math.min(pages, page + 1)}`
                : `/page/${Math.min(pages, page + 1)}`
              : `/admin/productlist/${Math.min(pages, page + 1)}`
          }
        >
          <Pagination.Next
            disabled={page === pages}
            className="pagination-nav-btn"
          />
        </LinkContainer>
      </Pagination>
    </div>
  )
}

export default Paginate
