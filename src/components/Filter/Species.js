import React from 'react';
import { RefreshCw } from 'react-feather';
import styles from './Filter.module.css'

export const Species = ({setPage, filteredSpecies, setFilteredSpecies }) => {
  const species = [
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
    setFilteredSpecies(species);
    setPage(1);
  };

  return (
    <div className={styles.filter}>
      <h5 className={styles.subHeading}>SPECIES</h5>
      <div className={styles.reset} onClick={() => setFilteredSpecies('')} ><RefreshCw size={12} color='grey' /></div>
      <div className={styles.inputContainer}>
        {species.map((s) => (
          <div className={styles.option}>
            <input
              type="checkbox"
              id={s}
              value={s}
              checked={filteredSpecies === s}
              onChange={() => handleSpeciesChange(s)}
            />
            <label htmlFor={s}>{s}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

