import styles from './LocationsTab.module.css'
import { Loader } from '../../Loader/Loader'

export const LocationsTab = ({ locations, loading, navigate }) => {
    return (
        <div className={styles.locationsPage}>
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
      </div>
    )
} 