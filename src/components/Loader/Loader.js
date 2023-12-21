import React from 'react';
import styles from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles['three-body']}>
        <div className={styles['three-body__dot']}></div>
        <div className={styles['three-body__dot']}></div>
        <div className={styles['three-body__dot']}></div>
      </div>
    </div>
  );
};
