import React from 'react';
import { RefreshCw } from 'react-feather';
import styles from './Filter.module.css'

export const Species = ({species, setSpecies }) => {
  const speciesOptions = [
    "Human",
    "Alien",
    "Humanoid",
    "Poopybutthole",
    "Mythological",
    "Unknown",
    "Animal",
    "Disease",
    "Robot",
    "Cronenberg",
    "Planet",
  ];

  const handleSpeciesChange = (species) => {
    setSpecies(species);
  };

  return (
    <div className={styles.filter}>
      <h5 className={styles.subHeading}>SPECIES</h5>
      <div className={styles.reset} onClick={() => setSpecies('')} ><RefreshCw size={12} color='grey' /></div>
      <div className={styles.inputContainer}>
        {speciesOptions.map((s) => (
          <div key={s} className={styles.option}>
            <input
              type="checkbox"
              id={s}
              value={s}
              checked={species === s}
              onChange={() => handleSpeciesChange(s)}
            />
            <label htmlFor={s}>{s}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

