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
  console.log(characters)

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
          <h2>{episode.name}</h2>
          <p>Air Date: {episode.air_date}</p>
          <p>Episode Code: {episode.episode}</p>
          <h3>Characters:</h3>
          <CharacterGrid characters={characters} />
        </div>
      )}
    </div>
  );
};

export default Episode;
