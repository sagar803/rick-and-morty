import React, { useState } from 'react';
import styles from './Filter.module.css';
import { Filter, X } from 'react-feather';
import { Filters } from './Filters';

export const FilterMoblie = ({
  setPage,
  filteredStatus,
  filteredGender,
  filteredSpecies,
  setFilteredGender,
  setFilteredStatus,
  setFilteredSpecies,
}) => {
  const [open, setOpen] = useState(false);

  const toggleFilter = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.mobileFiltersContainer}>
      <div onClick={toggleFilter} className={styles.filterIcon}>
        {open ? <X color='grey' /> : <Filter color='grey' />}
      </div>
      {open && (
        <div className={styles.mFilter}>
          <div onClick={toggleFilter} className={styles.filterIcon}>
            {open ? <X color='grey' /> : <Filter color='grey' />}
          </div>
          <Filters
            setPage={setPage}
            filteredStatus={filteredStatus}
            filteredGender={filteredGender}
            filteredSpecies={filteredSpecies}
            setFilteredGender={setFilteredGender}
            setFilteredStatus={setFilteredStatus}
            setFilteredSpecies={setFilteredSpecies}
          />
        </div>
      )}
    </div>
  );
};
