import React from 'react'
import { Status } from './Status';
import { Species } from './Species';
import { Gender } from './Gender';
import { RefreshCw } from 'react-feather';
import styles from './Filter.module.css'

export const Filters = ({setPage, filteredStatus, filteredSpecies, filteredGender, setFilteredStatus, setFilteredGender, setFilteredSpecies}) => {
    const resetFilters = () => {
        setFilteredGender("");
        setFilteredSpecies("");
        setFilteredStatus("");
        setPage(1);
//        window.location.reload(false);
    };

    return (
        <div className={styles.filterContainer}>
            <div className={styles.heading}>
                <h3 >Filters</h3>
                <RefreshCw className={styles.reset} onClick={resetFilters} size={14} />
            </div>
            <div>
                <Status            
                    setPage={setPage} 
                    filteredStatus={filteredStatus} 
                    setFilteredStatus={setFilteredStatus}/>
                <Species             
                    setPage={setPage}
                    filteredSpecies={filteredSpecies} 
                    setFilteredSpecies={setFilteredSpecies}/>
                <Gender             
                    setPage={setPage}
                    filteredGender={filteredGender} 
                    setFilteredGender={setFilteredGender}/>
            </div>
        </div>
    )
}
