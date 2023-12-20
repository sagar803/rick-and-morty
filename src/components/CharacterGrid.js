// src/components/CharacterGrid.js

import React from 'react';
import CharacterCard from './CharacterCard';

const CharacterGrid = ({characters}) => {
  return (
    <div>
      {characters && characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CharacterGrid;
