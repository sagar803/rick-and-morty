import React from 'react';
import styles from './Filter.module.css'

export const Gender = ({ gender, setGender }) => {
  const genders = ["female", "male", "genderless", "unknown"];

  const handleGenderChange = (g) => {
    if(gender === g) setGender('');
    else setGender(g);
  };


  return (
    <div className={styles.filter}>
      <h5 className={styles.subHeading}>GENDER</h5>
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

