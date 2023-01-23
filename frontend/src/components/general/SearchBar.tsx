import React, { SetStateAction, useState } from 'react'
import styles from '../../../styles/components/Searchbar.module.css'
import { AiOutlineSearch } from 'react-icons/ai'
import { useRouter } from 'next/router'


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
            onChange={(e) => {
              setSearch(e.target.value);
            }}
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
  const router = useRouter()
  return (
    <button 
      onClick={() => {
        router.push({
          pathname: '/Jobs',
          query: { search: props.search },
        })
    }}>
      Search
    </button>
  )
}


