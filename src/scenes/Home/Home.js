import React, { useState, useEffect, useRef } from 'react';
import CharacterGrid from '../../components/Character/CharacterGrid';
import styles from './Home.module.css'
import { Filters } from '../../components/Filter/Filters';
import Pagination from '../../components/Pagination/Pagination';

export const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterField, setFilterField] = useState('name');
  const [filteredGender, setFilteredGender] = useState('')
  const [filteredStatus, setFilteredStatus] = useState('')
  const [filteredSpecies, setFilteredSpecies] = useState('')
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState({})
  const inputRef = useRef();
  
  const api = `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchTerm}&status=${filteredStatus}&gender=${filteredGender}&species=${filteredSpecies}`;
  
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        setCharacters(data.results);
        setInfo(data.info);
      } catch (error) {
        console.error('Error fetching characters:', error);
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

  const handleFilterChange = (e) => {
    setFilterField(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCharacters();
  };

  const fetchCharacters = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?${filterField}=${searchTerm}`);
      const data = await response.json();
      setCharacters(data.results);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };


  return (
    <div className={styles.homeMain}>
      <div className={styles.header}>
        <div className={styles.overlay}>
          <h1>Rick And Morty World</h1>
          <div className={styles.searchContainer}>
            <form className={styles.searchBar} onSubmit={handleSearchSubmit}>
              <div className={styles.searchIcon}>🔍</div>
              <input ref={inputRef} type="text" placeholder={`Search by`} value={searchTerm} onChange={handleSearchChange} />
              <select value={filterField} onChange={handleFilterChange}>
                <option value="name">Name</option>
                <option value="status">Status</option>
                <option value="location">Location</option>
                <option value="episode">Episode</option>
                <option value="gender">Gender</option>
                <option value="species">Species</option>
                <option value="type">Type</option>
              </select>
            </form>
            <div style={{display: searchTerm ? 'block' : 'none'}} onClick={() => setSearchTerm('')} className={styles.clear}>+</div>
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
          {
            characters && (
              <>
                <Pagination info={info} page={page} setPage={setPage}/>
                <CharacterGrid characters={characters} />
              </>
            )
          }
        </div>
      </div>
    </div>
    
  )
}
