import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

const MAX_VISIBLE_PAGES = 5;

const Pagination: React.FC<PaginationProps> = ({ currentPage, lastPage, onPageChange }) => {
  if (lastPage <= 1) return null;

  const getPageNumbers = (): (number | '...')[] => {
    if (lastPage <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: lastPage }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [1];

    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(lastPage - 1, currentPage + 1);

    if (rangeStart > 2) pages.push('...');
    for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
    if (rangeEnd < lastPage - 1) pages.push('...');
    pages.push(lastPage);

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav className={styles.wrapper} aria-label="Pagination">
      <button
        id="pagination-prev"
        className={styles.btn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        type="button"
        aria-label="Previous page"
      >
        ← Prev
      </button>

      <ul className={styles.pageList} role="list">
        {pages.map((page, index) =>
          page === '...' ? (
            <li key={`ellipsis-${index}`} className={styles.ellipsis} aria-hidden="true">
              …
            </li>
          ) : (
            <li key={page}>
              <button
                id={`page-btn-${page}`}
                className={`${styles.pageBtn} ${page === currentPage ? styles.active : ''}`}
                onClick={() => onPageChange(page as number)}
                type="button"
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            </li>
          )
        )}
      </ul>

      <button
        id="pagination-next"
        className={styles.btn}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        type="button"
        aria-label="Next page"
      >
        Next →
      </button>
    </nav>
  );
};

export default Pagination;
