import React, { useState } from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ page, setPage, info }) => {
  const { count, pages, next, prev } = info;
  const [jumpToPage, setJumpToPage] = useState('');

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleJumpToPage = () => {
    const parsedPage = parseInt(jumpToPage, 10);
    if (!isNaN(parsedPage) && parsedPage > 0 && parsedPage <= pages) {
      setPage(parsedPage);
      setJumpToPage('');
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = page - 1; i <= page + 1 && i <= pages; i++) {
      if (i > 0) {
        pageNumbers.push(
          <span
            key={i}
            className={i === page ? styles.active : ''}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </span>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <button className={styles.prevNextBtn} disabled={!prev} onClick={() => handlePageChange(page - 1)}>
        {'<'}
      </button>
      {renderPageNumbers()}
      <button disabled={!next} onClick={() => handlePageChange(page + 1)}>
        {'>'}
      </button>
      <p>
        Page {page} of {pages} ({count} items)
      </p>
      <div className={styles.jumpToPage}>
        <input
          type="number"
          placeholder="Jump to Page"
          value={jumpToPage}
          onChange={(e) => setJumpToPage(e.target.value)}
        />
        <button onClick={handleJumpToPage}>Go</button>
      </div>
    </div>
  );
};

export default Pagination;
