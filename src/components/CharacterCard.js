// src/components/CharacterCard.js

import React from 'react';
import { Link } from 'react-router-dom';

const CharacterCard = ({ character }) => {
  return (
    <div>
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <Link to={`/character/${character.id}`}>View Profile</Link>
    </div>
  );
};

export default CharacterCard;
