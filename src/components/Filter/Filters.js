import React from 'react'
import { Status } from './Status';
import { Species } from './Species';
import { Gender } from './Gender';
import { RefreshCw } from 'react-feather';

export const Filters = ({filteredStatus, filteredSpecies, filteredGender, setFilteredStatus, setFilteredGender, setFilteredSpecies}) => {
    const status = ["Alive", "Dead", "Unknown"];
    const genders = ["female", "male", "genderless", "unknown"];
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

    const resetFilters = () => {
        setFilteredGender("");
        setFilteredSpecies("");
        setFilteredStatus("");
//        updatePageNumber(1);
//        window.location.reload(false);
    };

    return (
        <div 
            style={{
                border:'1px solid grey', 
                borderRadius: '15px', 
                padding: '10px',
                background: 'linear-gradient(145deg, #cacaca, #f0f0f0)',
                boxShadow:  '20px 20px 60px #bebebe, -20px -20px 60px #ffffff'
            }}>
            <h3 style={{ display: 'inline' }}>Filters</h3>
            <div style={{ float: 'right', cursor:'pointer'}} onClick={resetFilters} ><RefreshCw size={15} /></div>
            <hr style={{color: 'grey'}} />
            <div style={{padding: '30px 10px'}}>
                <Status filteredStatus={filteredStatus} setFilteredStatus={setFilteredStatus}/>
                <Species filteredSpecies={filteredSpecies} setFilteredSpecies={setFilteredSpecies}/>
                <Gender filteredGender={filteredGender} setFilteredGender={setFilteredGender}/>
            </div>
        </div>
    )
}
