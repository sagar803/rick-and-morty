import CharacterGrid from '../../Character/CharacterGrid'
import { FilterMoblie } from '../../Filter/FilterMoblie'
import { Filters } from '../../Filter/Filters'
import { Loader } from '../../Loader/Loader'
import Pagination from '../../Pagination/Pagination'
import styles from './CharactersTab.module.css'
import { motion } from 'framer-motion'


export const CharactersTab = ({
    setPage,
    filteredStatus,
    filteredGender,
    filteredSpecies,
    setFilteredGender,
    setFilteredStatus,
    setFilteredSpecies,
    info,
    page,
    loading,
    characters,
  }) => {
    return (
      <motion.div initial={{x: -500 }} animate={{ x: 0, transition : {duration : 0.5} }} className={styles.charactersTab}>
        <div className={styles.filter}>
          <Filters
            setPage={setPage}
            filteredStatus={filteredStatus}
            filteredGender={filteredGender}
            filteredSpecies={filteredSpecies}
            setFilteredGender={setFilteredGender}
            setFilteredStatus={setFilteredStatus}
            setFilteredSpecies={setFilteredSpecies}
          />
        </div>
        <div className={styles.characterGrid}>
          <Pagination info={info} page={page} setPage={setPage} />
          {loading ? (
            <Loader />
          ) : characters ? (
            <>
              <CharacterGrid characters={characters} />
              <div className={styles.mobileFilters}>
                <FilterMoblie
                  setPage={setPage}
                  filteredStatus={filteredStatus}
                  filteredGender={filteredGender}
                  filteredSpecies={filteredSpecies}
                  setFilteredGender={setFilteredGender}
                  setFilteredStatus={setFilteredStatus}
                  setFilteredSpecies={setFilteredSpecies}
                />
              </div>
            </>
          ) : (
            <p>Search returned with no results</p>
          )}
        </div>
      </motion.div>
    )
  }
