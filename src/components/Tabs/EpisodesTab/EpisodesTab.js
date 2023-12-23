import { Loader } from '../../Loader/Loader';
import styles from './EpisodesTab.module.css'
import { motion } from 'framer-motion'

export const EpisodesTab = ({ episodes, loading, navigate }) => (
      <motion.div initial={{opacity : 0 }} animate={{ opacity: 1, transition : {duration : 0.7}}} className={styles.episodesPage}>
        <h1>Rick and Morty Episodes</h1>
  
        {loading && <Loader />}
        {!loading && !episodes && <p>No episodes available.</p>}
        {!loading && episodes && episodes.length > 0 && (
          <div className={styles.episodesContainer}>
            {episodes.map((episode) => (
              <div onClick={() => navigate(`/episode/${episode.id}`)} key={episode.id} className={styles.episodeCard}>
                <h4>{episode.name}</h4>
                <p>Air Date: {episode.air_date}</p>
                <p>Episode Code: {episode.episode}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
  );