import React, { useState, useEffect, useCallback } from 'react';
import styles from './Home.module.css'
import { Delete, Search } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { EpisodesTab } from '../../components/Tabs/EpisodesTab/EpisodesTab';
import { LocationsTab } from '../../components/Tabs/LocationTab/LocationsTab';
import { CharactersTab } from '../../components/Tabs/CharactersTab/CharactersTab';

export const Home = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGender, setFilteredGender] = useState('');
  const [filteredStatus, setFilteredStatus] = useState('');
  const [filteredSpecies, setFilteredSpecies] = useState('');
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('characters');
  const [page, setPage] = useState(() => {
    const storedPage = sessionStorage.getItem('currentPage');
    return storedPage ? parseInt(storedPage, 10) : 1;
  });

  useEffect(() => {
    sessionStorage.setItem('currentPage', page.toString());
  }, [page]);

  const characterApi = `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchTerm}&status=${filteredStatus}&gender=${filteredGender}&species=${filteredSpecies}`;
  const episodeApi = `https://rickandmortyapi.com/api/episode/?name=${searchTerm}`;
  const locationApi = `https://rickandmortyapi.com/api/location/?name=${searchTerm}`;

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
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [characterApi]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      try {
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
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const response = await fetch(locationApi);
        const data = await response.json();
        setLocations(data.results);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [locationApi]);

  const changeTab = useCallback((currTab) => {
    setSearchTerm('');
    setTab(currTab);
  }, [setSearchTerm, setTab]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (page === 'characters') setPage(1);
  };

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <div className={styles.overlay}>
          <h1>Rick And Morty World</h1>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder={`Type ${tab === 'characters' ? 'Character' : tab === 'episodes' ? 'Episode' : 'Location'} names here...`}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className={styles.searchIcon} onClick={() => setSearchTerm('')}>
              {searchTerm ? <Delete size={15} /> : <Search size={15} />}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tabsContainer}>
          <span className={tab === 'characters' ? styles.active : ''} onClick={() => changeTab('characters')}>
            CHARACTERS
          </span>
          <span className={tab === 'episodes' ? styles.active : ''} onClick={() => changeTab('episodes')}>
            EPISODES
          </span>
          <span className={tab === 'locations' ? styles.active : ''} onClick={() => changeTab('locations')}>
            LOCATIONS
          </span>
      </div>
      {tab === 'characters' ? (
        <CharactersTab
          setPage={setPage}
          filteredStatus={filteredStatus}
          filteredGender={filteredGender}
          filteredSpecies={filteredSpecies}
          setFilteredGender={setFilteredGender}
          setFilteredStatus={setFilteredStatus}
          setFilteredSpecies={setFilteredSpecies}
          info={info}
          page={page}
          loading={loading}
          characters={characters}
        />
      ) : tab === 'episodes' ? (
        <EpisodesTab episodes={episodes} loading={loading} navigate={navigate} />
      ) : (
        <LocationsTab locations={locations} loading={loading} navigate={navigate} />
      )}
    </div>
  );
};

