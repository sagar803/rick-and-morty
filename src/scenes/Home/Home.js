import React, { useState, useEffect, useRef } from 'react';
import CharacterGrid from '../../components/Character/CharacterGrid';
import styles from './Home.module.css'
import { Filters } from '../../components/Filter/Filters';
import Pagination from '../../components/Pagination/Pagination';
import { Loader } from '../../components/Loader/Loader';
import { Delete, Search } from 'react-feather';
import { FilterMoblie } from '../../components/Filter/FilterMoblie';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGender, setFilteredGender] = useState('')
  const [filteredStatus, setFilteredStatus] = useState('')
  const [filteredSpecies, setFilteredSpecies] = useState('')
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState({})
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('characters');

  const characterApi = `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchTerm}&status=${filteredStatus}&gender=${filteredGender}&species=${filteredSpecies}`;
  const episodeApi = `https://rickandmortyapi.com/api/episode/?name=${searchTerm}`;  

  useEffect(() => {
    const fetchCharacters = async () => {
    setLoading(true);
      try {
        const response = await fetch(characterApi);
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
  }, [characterApi]);
  
  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        const response = await fetch(episodeApi);
        const data = await response.json();
        setEpisodes(data.results);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [episodeApi]);

  useEffect(() => {
    inputRef.current.focus();
  },[])

  const changeTab = (currTab) => {
    setSearchTerm('')
    if(currTab === 'characters') setTab('episodes')
    else setTab('characters');
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if(page === 'characters') setPage(1);
  };


  return (
    <div className={styles.homeMain}>
      <div className={styles.header}>
        <div className={styles.overlay}>
          <h1>Rick And Morty World</h1>
          <div className={styles.searchContainer}>
            <input ref={inputRef} type="text" placeholder={`Type ${tab ==='characters' ? 'Character' : 'Episode' } names here...`} value={searchTerm} onChange={handleSearchChange} />
            <div className={styles.searchIcon} onClick={() => setSearchTerm('')}>{searchTerm ? <Delete size={15} /> : <Search size={15} />}</div>
          </div>

          <div className={styles.tabsContainer} >
              <span className={tab === 'characters' ? styles.active : ''} onClick={() => changeTab(tab)}>CHARACTERS</span>
              <span className={tab === 'episodes' ? styles.active : '' } onClick={() => changeTab(tab)}>EPISODES</span>
            </div>
        </div>
      </div>
      {
        (tab === 'characters') ? (
          <>
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
          </>
        ) : (
          <>
            <div className={styles.episodesPage}>        
              <h1>Rick and Morty Episodes</h1>
        
              {loading && <Loader />}
              {!loading && !episodes && <p>No episodes available.</p>}
              {!loading && episodes && episodes.length > 0 && (
                <div className={styles.episodesContainer}>
                  {/* Mapping through episodes and rendering episode cards */}
                  {episodes.map((episode) => (
                    <div onClick={() => navigate(`/episode/${episode.id}`)} key={episode.id} className={styles.episodeCard}>
                      <h4>{episode.name}</h4>
                      <p>Air Date: {episode.air_date}</p>
                      <p>Episode Code: {episode.episode}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>          

          </>
        )
      }
    </div>
  )
}
