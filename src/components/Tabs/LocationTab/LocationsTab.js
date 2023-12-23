import styles from './LocationsTab.module.css'
import { Loader } from '../../Loader/Loader'
import { motion } from 'framer-motion'


export const LocationsTab = ({ locations, loading, navigate }) => {
    return (
      <motion.div initial={{opacity : 0 }} animate={{ opacity: 1, transition : {duration : 0.7}}} className={styles.locationsPage}>
        <h1>Rick and Morty Locations</h1>
  
        {loading && <Loader />}
        {!loading && !locations && <p>No locations available.</p>}
        {!loading && locations && locations.length > 0 && (
          <div className={styles.locationsContainer}>
            {locations.map((location) => (
              <div onClick={() => navigate(`/location/${location.id}`)} key={location.id} className={styles.locationCard}>
                <h4>{location.name}</h4>
                <p>Type: {location.type}</p>
                <p>Dimension: {location.dimension}</p>
              </div>
            ))}
          </div>
        )}
    </motion.div>
    )
} 