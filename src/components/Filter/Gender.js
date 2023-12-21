import React from 'react';
import { RefreshCw } from 'react-feather';
import styles from './Filter.module.css'

export const Gender = ({ gender, setGender }) => {
  const genders = ["female", "male", "genderless", "unknown"];

  const handleGenderChange = (g) => {
    setGender(g);
  };


  return (
    <div className={styles.filter}>
      <h5 className={styles.subHeading}>GENDER</h5>
      <div className={styles.reset} onClick={() => setGender('')} ><RefreshCw size={12} color='grey' /></div>
      <div className={styles.inputContainer}>
        {genders.map((g) => (
          <div key={g} className={styles.option}>
            <input
              type="checkbox"
              id={g}
              value={g}
              checked={gender === g}
              onChange={() => handleGenderChange(g)}
              />
            <label htmlFor={g}>{g}</label>
          </div>
          ))}
        </div>
    </div>
  );
};

