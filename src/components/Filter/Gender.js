import React from 'react';
import { RefreshCw } from 'react-feather';
import styles from './Filter.module.css'

export const Gender = ({ setPage, filteredGender, setFilteredGender }) => {
  const genders = ["female", "male", "genderless", "unknown"];

  const handleGenderChange = (gender) => {
    setFilteredGender(gender);
    setPage(1);
  };


  return (
    <div className={styles.filter}>
      <h5 className={styles.subHeading}>GENDER</h5>
      <div className={styles.reset} onClick={() => setFilteredGender('')} ><RefreshCw size={12} color='grey' /></div>
      <div className={styles.inputContainer}>
        {genders.map((gender) => (
          <div className={styles.option}>
            <input
              type="checkbox"
              id={gender}
              value={gender}
              checked={filteredGender === gender}
              onChange={() => handleGenderChange(gender)}
              />
            <label htmlFor={gender}>{gender}</label>
          </div>
          ))}
        </div>
    </div>
  );
};

