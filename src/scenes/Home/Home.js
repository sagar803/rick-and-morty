import React, { useState, useEffect, useRef } from 'react';
import CharacterGrid from '../../components/Character/CharacterGrid';
import styles from './Home.module.css'
import { Filters } from '../../components/Filter/Filters';
import Pagination from '../../components/Pagination/Pagination';
import { Loader } from '../../components/Loader/Loader';
import { Delete, Search } from 'react-feather';
import { FilterMoblie } from '../../components/Filter/FilterMoblie';


export const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGender, setFilteredGender] = useState('')
  const [filteredStatus, setFilteredStatus] = useState('')
  const [filteredSpecies, setFilteredSpecies] = useState('')
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState({})
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);

  const api = `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchTerm}&status=${filteredStatus}&gender=${filteredGender}&species=${filteredSpecies}`;
  
  useEffect(() => {
    const fetchCharacters = async () => {
    setLoading(true);
      try {
        const response = await fetch(api);
        const data = await response.json();
        setCharacters(data.results);
        setInfo(data.info);
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally{
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [api]);

  useEffect(() => {
    inputRef.current.focus();
  },[])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  return (
    <div className={styles.homeMain}>
      <div className={styles.header}>
        <div className={styles.overlay}>
          <h1>Rick And Morty World</h1>
          <div className={styles.searchContainer}>
            <input ref={inputRef} type="text" placeholder='Type names here...' value={searchTerm} onChange={handleSearchChange} />
            <div className={styles.searchIcon} onClick={() => setSearchTerm('')}>{searchTerm ? <Delete size={15} /> : <Search size={15} />}</div>
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.filter}>
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
        <div className={styles.characterGrid}>
          <Pagination info={info} page={page} setPage={setPage}/>
          {
            loading ? (
              <Loader />
            ) : (
              characters ? (
                <>
                  <CharacterGrid characters={characters} /> 
                  <div className={styles.mobileFilters}>
                    <FilterMoblie 
                      setPage={setPage}
                      filteredStatus={filteredStatus} 
                      filteredGender={filteredGender} 
                      filteredSpecies={filteredSpecies} 
                      setFilteredGender={setFilteredGender} 
                      setFilteredStatus={setFilteredStatus} 
                      setFilteredSpecies={setFilteredSpecies} 
                    />
                  </div>
                </>
              ) :  <p>Search returned with no results</p>              
            )
          }
        </div>
      </div>
    </div>
    
  )
}
