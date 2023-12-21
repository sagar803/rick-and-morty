import React, { useState } from 'react';
import { RefreshCw } from 'react-feather';
import styles from './Filter.module.css'

export const Status = ({status, setStatus }) => {
  const statusOptions = ["Alive", "Dead", "Unknown"];

  const handleStatusChange = (s) => {
    setStatus(s);
  };


  return (
    <div className={styles.filter}>
      <h5 className={styles.subHeading}>STATUS</h5>
      <div className={styles.reset} onClick={() => setStatus('')} ><RefreshCw size={12} color='grey' /></div>
      <div className={styles.inputContainer}>
        {statusOptions.map((s) => (
          <div className={styles.option}>
            <input
              type="checkbox"
              id={s}
              value={s}
              checked={status === s}
              onChange={() => handleStatusChange(s)}
            />
            <label htmlFor={s}>{s}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

