import React, { useState } from 'react';
import { RefreshCw } from 'react-feather';

export const Species = ({ filteredSpecies, setFilteredSpecies }) => {
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
  };

  return (
    <div>
      <h5 style={{ display: 'inline' }}>Species</h5>
      <div style={{ float: 'right', cursor:'pointer'}} onClick={() => setFilteredSpecies('')} ><RefreshCw size={15} /></div>
      {species.map((s) => (
        <div key={s}>
          <input
            type="radio"
            id={s}
            value={s}
            checked={filteredSpecies === s}
            onChange={() => handleSpeciesChange(s)}
          />
          <label htmlFor={s}>{s}</label>
        </div>
      ))}
    </div>
  );
};

