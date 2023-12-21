import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './CharacterCard.module.css'

const CharacterCard = ({ character }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.container} onClick={() => navigate(`/character/${character.id}`)}>
      <img src={character.image} alt={character.name} />
      <i>{character.status.toUpperCase()}</i>
      <div className={styles.metadata}>
        <h5>{character.name.toUpperCase()}</h5>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
        <p>Location: {character.location?.name}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
