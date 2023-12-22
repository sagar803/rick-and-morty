// Episode.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import styles from './Episode.module.css';
import CharacterGrid from '../../components/Character/CharacterGrid';

const Episode = () => {
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
        const data = await response.json();
        setEpisode(data);

        // Fetch details for each character in the episode
        const characterDetails = await Promise.all(
          data.characters.map(async (characterUrl) => {
            const characterResponse = await fetch(characterUrl);
            const characterData = await characterResponse.json();
            return characterData;
          })
        );

        setCharacters(characterDetails);
      } catch (error) {
        console.error('Error fetching episode:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisode();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className={styles['episode-container']}>
      {episode && (
        <div className={styles.episode}>
          <div className={styles.metadata}>        
            <h1>{episode.name}</h1>
            <p><span>Air Date:</span> {episode.air_date}</p>
            <p><span>Episode Code:</span> {episode.episode}</p>
          </div>
          <h3>Characters starred in episode:</h3>
          <CharacterGrid characters={characters} />
        </div>
      )}
    </div>
  );
};

export default Episode;
