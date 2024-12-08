import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import styles from '../styles/searchFilter.module.css'

interface SearchFilterProps {
  onSearch: (query: string) => void
  onReset: () => void
}

export default function SearchFilter({ onSearch, onReset }: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    onSearch(searchTerm.trim())
  }

  const handleReset = () => {
    setSearchTerm('')
    onReset()
  }

  return (
    <div className={styles.searchFilter}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search products by title here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className={styles.searchIcon} />
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
        <button className={styles.resetButton} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  )
}
