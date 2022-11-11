import React, { SetStateAction, useState } from 'react'
import styles from '../../../styles/components/Searchbar.module.css'
import { AiOutlineSearch } from 'react-icons/ai'


export default function SearchBar(props: any) {
  const [search, setSearch] = useState('')


  return (
    <div className={styles.box}>
        <div className={styles.inputContainer}>
          <AiOutlineSearch className={styles.icon} />
          <input 
            className={styles.input}
            type='text' 
            placeholder='Search by job title, company, etc..' // Update once finalized
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div 
          className={styles.searchButton}
        >
          <Search search={search}/>
        </div>
    </div>
  )
}

const Dropdown = () => {
  return (
    <div></div>
  )
}

type Search = {
  search: string
}
const Search = (props: Search) => {
  return (
    <button 
      onClick={() => {
      alert("Searching for " + props.search)
    }}>
      Search
    </button>
  )
}


