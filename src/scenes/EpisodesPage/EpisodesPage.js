import React, { useState, useEffect } from 'react';
import styles from './EpisodesPage.module.css'
import { useNavigate } from 'react-router-dom';
import {Loader} from '../../components/Loader/Loader'
import { Delete, Search } from 'react-feather';

export const EpisodesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);


  const api = `https://rickandmortyapi.com/api/episode/?name=${searchTerm}`;

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        const response = await fetch(api);
        const data = await response.json();
        setEpisodes(data.results);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [api]);

  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

    return (
      <div className={styles.episodesPage}>
        <div className={styles.header}>
          <div className={styles.overlay}>
            <div className={styles.searchContainer}>
              <input type="text" placeholder='Type Episode names here...' value={searchTerm} onChange={handleSearchChange} />
              <div className={styles.searchIcon} onClick={() => setSearchTerm('')}>
                {searchTerm ? <Delete size={15} /> : <Search size={15} />}
              </div>
            </div>
            
            <div className={styles.tabsContainer}>
              <span onClick={() => navigate('/')}>CHARACTERS</span>
              <span className={styles.active}>EPISODES</span>
            </div>
          </div>
        </div>
  
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
    );
  };
  