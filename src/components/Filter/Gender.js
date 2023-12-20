import React, { useState } from 'react';
import { RefreshCw } from 'react-feather';

export const Gender = ({ filteredGender, setFilteredGender }) => {
  const genders = ["female", "male", "genderless", "unknown"];

  const handleGenderChange = (gender) => {
    setFilteredGender(gender);
  };


  return (
    <div>
      <h5 style={{ display: 'inline' }}>Gender</h5>
      <div style={{ float: 'right', cursor:'pointer'}} onClick={() => setFilteredGender('')} ><RefreshCw size={15} /></div>
      {genders.map((gender) => (
        <div key={gender}>
          <input
            type="radio"
            id={gender}
            value={gender}
            checked={filteredGender === gender}
            onChange={() => handleGenderChange(gender)}
          />
          <label htmlFor={gender}>{gender}</label>
        </div>
      ))}
    </div>
  );
};

