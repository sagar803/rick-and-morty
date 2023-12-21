import React, { useState } from 'react';
import { RefreshCw } from 'react-feather';
import styles from './Filter.module.css'

export const Status = ({setPage, filteredStatus, setFilteredStatus }) => {
  const statusOptions = ["Alive", "Dead", "Unknown"];

  const handleStatusChange = (status) => {
    setFilteredStatus(status);
    setPage(1);
  };


  return (
    <div className={styles.filter}>
      <h5 className={styles.subHeading}>STATUS</h5>
      <div className={styles.reset} onClick={() => setFilteredStatus('')} ><RefreshCw size={12} color='grey' /></div>
      <div className={styles.inputContainer}>
        {statusOptions.map((status) => (
          <div className={styles.option}>
            <input
              type="checkbox"
              id={status}
              value={status}
              checked={filteredStatus === status}
              onChange={() => handleStatusChange(status)}
            />
            <label htmlFor={status}>{status}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

