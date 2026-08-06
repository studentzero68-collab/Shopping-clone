import { useProducts } from "../context/ProductsContext";
import "./Pagination.css";

function getPageNumbers(currentPage, totalPages) {
  // Show first, last, current, and a neighbour on each side; collapse the
  // rest behind an ellipsis so the control stays readable on mobile.
  const pages = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);

  return [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
}

function Pagination() {
  const { currentPage, totalPages, goToPage, filteredProducts } = useProducts();

  if (filteredProducts.length === 0 || totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="pagination" aria-label="Product pages">
      <button
        type="button"
        className="pagination-arrow"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        Prev
      </button>

      <ul className="pagination-list">
        {pageNumbers.map((page, index) => {
          const previousPage = pageNumbers[index - 1];
          const showEllipsisBefore = previousPage && page - previousPage > 1;

          return (
            <li key={page} className="pagination-item">
              {showEllipsisBefore && <span className="pagination-ellipsis">…</span>}
              <button
                type="button"
                className={`pagination-page${page === currentPage ? " active" : ""}`}
                onClick={() => goToPage(page)}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        className="pagination-arrow"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
