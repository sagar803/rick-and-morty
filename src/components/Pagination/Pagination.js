import React from 'react';
import styles from './Pagination.module.css';
import { ArrowLeft, ArrowRight } from 'react-feather';

const Pagination = ({ page, setPage, info }) => {
  if(!info) return null;
  const { count, pages, next, prev } = info;
  
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const displayRange = 5;
    const start = Math.max(1, Math.min(page - 2, pages - displayRange + 1));
    const end = Math.min(start + displayRange - 1, pages);
  
    for (let i = start; i <= end; i++) {
      pageNumbers.push(
        <div
          key={i}
          onClick={() => setPage(i)}
          className={i === page ? `${styles.active} ${styles.index}` : styles.index}
        >
          {i}
        </div>
      );
    }
  
    return pageNumbers;
  };
  

  return (
    <div className={styles.pagination}>
      <p> Page {page} of {pages} ({count} items)</p>
      <div className={styles.indexGroup}>
        <button className={styles.prevNextBtn} disabled={!prev} onClick={() => setPage(page - 1)}><ArrowLeft size={15} /></button>
        {renderPageNumbers()}
        <button className={styles.prevNextBtn} disabled={!next} onClick={() => setPage(page + 1)}><ArrowRight size={15} /></button>
      </div>
    </div>
  );
};

export default Pagination;
