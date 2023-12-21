import React from 'react';
import CharacterCard from './CharacterCard';
import styles from './CharacterGrid.module.css'; // Import your CSS module

const CharacterGrid = ({ characters }) => {
  return (
    <div className={styles.characterGrid}>
      {characters && characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CharacterGrid;
