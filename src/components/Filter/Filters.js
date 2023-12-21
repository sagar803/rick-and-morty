import React, { useState } from 'react'
import { Status } from './Status';
import { Species } from './Species';
import { Gender } from './Gender';
import { RefreshCw } from 'react-feather';
import styles from './Filter.module.css'

export const Filters = ({setPage, filteredStatus, filteredSpecies, filteredGender, setFilteredStatus, setFilteredGender, setFilteredSpecies}) => {
    const [status, setStatus] = useState(filteredStatus)
    const [species, setSpecies] = useState(filteredSpecies)
    const [gender, setGender] = useState(filteredGender)

    const resetFilters = () => {
        setFilteredGender("");
        setFilteredSpecies("");
        setFilteredStatus("");
        setStatus('');
        setSpecies('');
        setGender('');
        setPage(1);
    };

    const applyFilters = () => {
        setFilteredGender(gender);
        setFilteredSpecies(species);
        setFilteredStatus(status);
        setPage(1);
    }

    return (
        <div className={styles.filterContainer}>
            <div className={styles.heading}>
                <h3 >Filters</h3>
                <RefreshCw className={styles.reset} onClick={resetFilters} size={14} />
            </div>
            <div>
                <Status            
                    status={status} 
                    setStatus={setStatus}/>
                <Species             
                    species={species} 
                    setSpecies={setSpecies}/>
                <Gender             
                    gender={gender} 
                    setGender={setGender}/>
            </div>
            <div onClick={applyFilters} className={styles.submitButton}>Apply Filters</div>
        </div>
    )
}
