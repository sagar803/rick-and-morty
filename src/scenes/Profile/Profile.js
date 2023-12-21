import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Profile = ({ match }) => {
  const [character, setCharacter] = useState(null);
  const {id} = useParams()
  console.log(id)

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };

    fetchCharacter();
  }, [id]);

  return (
    <div>
      {character && (
        <div>
          <img src={character.image} alt={character.name} />
          <h2>{character.name}</h2>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
          {/* Add other character details */}
        </div>
      )}
    </div>
  );
};
