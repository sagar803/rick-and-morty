import React, { useState } from 'react'
import styles from './Filter.module.css'
import { Filter } from 'react-feather'
import { Filters } from './Filters';


export const FilterMoblie = ({ setPage, filteredStatus, filteredGender, filteredSpecies, setFilteredGender , setFilteredStatus , setFilteredSpecies }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={styles.mobileFiltersContainer}>
            <Filter onClick={() => setOpen(!open)} className={styles.filterIcon} color='grey'/>
            { open && (
                <Filters 
                    setPage={setPage}
                    filteredStatus={filteredStatus} 
                    filteredGender={filteredGender} 
                    filteredSpecies={filteredSpecies} 
                    setFilteredGender={setFilteredGender} 
                    setFilteredStatus={setFilteredStatus} 
                    setFilteredSpecies={setFilteredSpecies} 
                />
                )
            }
        </div>
    )
}
