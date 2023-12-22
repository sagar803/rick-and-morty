import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import styles from './Location.module.css'; // Ensure you have the corresponding CSS module
import CharacterGrid from '../../components/Character/CharacterGrid';

const Location = () => {
  const [location, setLocation] = useState(null);
  const [residents, setResidents] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
        const data = await response.json();
        setLocation(data);

        // Fetch details for each resident in the location
        const residentDetails = await Promise.all(
          data.residents.map(async (residentUrl) => {
            const residentResponse = await fetch(residentUrl);
            const residentData = await residentResponse.json();
            return residentData;
          })
        );

        setResidents(residentDetails);
      } catch (error) {
        console.error('Error fetching location:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className={styles['location-container']}>
      {location && (
        <div className={styles.location}>
          <div className={styles.metadata}>
            <h1>{location.name}</h1>
            <p><span>Type:</span> {location.type}</p>
            <p><span>Dimension:</span> {location.dimension}</p>
          </div>
          <h3>Residents in this location:</h3>
          <CharacterGrid characters={residents} />
        </div>
      )}
    </div>
  );
};

export default Location;
