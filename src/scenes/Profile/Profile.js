// Profile.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';

import styles from './Profile.module.css';

export const Profile = () => {
  const [character, setCharacter] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [location, setLocation] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  console.log(location)

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await response.json();
        setCharacter(data);

        // Fetch origin details
        if(data?.origin?.url){
          const originResponse = await fetch(data.origin.url);
          const originData = await originResponse.json();
          setOrigin(originData);
        }

        // Fetch location details
        if(data?.location?.url){
          const locationResponse = await fetch(data.location.url);
          const locationData = await locationResponse.json();
          setLocation(locationData);  
        }
        // Fetch episode details
        const episodeDetails = await Promise.all(
          data.episode.map(async (episodeUrl) => {
            const episodeResponse = await fetch(episodeUrl);
            const episodeData = await episodeResponse.json();
            return {
              id: episodeData.id,
              name: episodeData.name,
              airDate: episodeData.air_date,
              episodeCode: episodeData.episode,
            };
          })
        );

        // Update the character object with episode details
        setCharacter((prevCharacter) => ({
          ...prevCharacter,
          episodeDetails,
        }));
      } catch (error) {
        console.error('Error fetching character:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className={styles['profile-page']}>
      {character  && (
        <div className={styles.profile}>
          <div className={styles['profile-container']}>
            <div className={styles['metadata']}>
              <h1>{character.name}</h1>
              <p><span>Species:</span> {character.species}</p>
              <p><span>Gender:</span> {character.gender}</p>
              <p><span>Status:</span> {character.status}</p>
              <p><span>Origin:</span> {origin ? origin.name : 'Unknown'}</p>
              {
                location && (
                  <>
                    <p><span>Location:</span> {location.name }</p>
                    <p><span>Dimension:</span> {location.dimension}</p>
                    <p><span>No of residents:</span> {location.residents.length}</p>

                  </>
                )
              }
              {/* Display additional origin and location details if available */}
            </div>
            <div className={styles['image-container']}>
              <img className={styles['profile-image']} src={character.image} alt={character.name} />
            </div>
          </div>

          {character.episodeDetails && character.episodeDetails.length > 0 && (
            <div>
              <h3>Episodes starring the character:</h3>
              <ul className={styles['episode-list']}>
                {character.episodeDetails.map((episode, index) => (
                  <li key={index}>
                    <Link to={`/episode/${episode.id}`}>{episode.name}</Link>
                    <p>Air Date: {episode.airDate}</p>
                    <p>Episode Code: {episode.episodeCode}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Add other character details */}
        </div>
      )}
    </div>
  );
};