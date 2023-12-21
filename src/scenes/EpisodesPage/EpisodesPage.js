import React, { useState, useEffect } from 'react';
import styles from './EpisodesPage.module.css'
import { useNavigate } from 'react-router-dom';
import {Loader} from '../../components/Loader/Loader'

export const EpisodesPage = () => {
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://rickandmortyapi.com/api/episode');
        const data = await response.json();
        setEpisodes(data.results);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  return (
    <div>
      <h2>Episodes Page</h2>
      {loading && <Loader />}
      {!loading && episodes.length === 0 && <p>No episodes available.</p>}
      {!loading && episodes.length > 0 && (
        <div className={styles.episodesContainer}>
          {episodes.map((episode) => (
            <div onClick={() => navigate(`/episode/${episode.id}`)} key={episode.id} className={styles.episodeCard}>
              <p>Name: {episode.name}</p>
              <p>Air Date: {episode.air_date}</p>
              <p>Episode Code: {episode.episode}</p>
              {/* Add other episode details as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
