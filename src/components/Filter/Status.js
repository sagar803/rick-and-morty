import React, { useState } from 'react';
import styles from './Filter.module.css'

export const Status = ({status, setStatus }) => {
  const statusOptions = ["Alive", "Dead", "Unknown"];

  const handleStatusChange = (s) => {
    if(status === s) setStatus('')
    else setStatus(s);
  };


  return (
    <div className={styles.filter}>
      <h5 className={styles.subHeading}>STATUS</h5>
      <div className={styles.inputContainer}>
        {statusOptions.map((s) => (
          <div key={s} className={styles.option}>
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

