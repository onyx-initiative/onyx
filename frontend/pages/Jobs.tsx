import React, { useState } from 'react'
import Navbar from '../src/components/general/Navbar'
import Filter from '../src/sections/jobs/Filter'
import styles from '../styles/components/Jobs.module.css'
import { job_type } from '../../backend/src/types/db.types'
import { AiOutlineSearch } from "react-icons/ai";
import ListedJobs from '../src/sections/jobs/ListedJobs'

export enum sort {
  'Newest',
  'Oldest',
  'Most Popular',
  'Saved'
}

export type filters = {
  location: string[];
  job_type: job_type[];
  applicant_year: number[];
  sort: sort;
  tags: string[];
}

// @ todo: Figure out how to handle the toggling
export type selected = {
  location: string;
  job_type: {
    full_time: boolean;
    part_time: boolean;
    internship: boolean;
  };
  applicant_year: number[];
  sort: sort;
  tags: string[];
}

export default function Jobs() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    location: [],
    job_type: [],
    applicant_year: [
      new Date().getFullYear(),
      new Date().getFullYear() + 1,
      new Date().getFullYear() + 2,
      new Date().getFullYear() + 3,
      new Date().getFullYear() + 4,
    ],
    sort: sort.Newest,
    tags: []
  } as filters)
  const [selected, setSelected] = useState({
    location: '',
    job_type: {
      full_time: false,
      part_time: false,
      internship: false
    },
    applicant_year: [],
    sort: sort.Newest,
    tags: []
  } as selected)

  // @todo: Add call to the api to get the jobs
  const [jobs, setJobs] = useState([])

  return (
    <div>
      <Navbar />
      <div className={styles.jobContainer}>
        <Filter 
          filters={filters} 
          setFilters={setFilters} 
          selected={selected} 
          setSelected={setSelected}
        />
        <div className={styles.jobList}>
          <SearchBar search={search} setSearch={setSearch} />
          <ListedJobs jobs={jobs} />
        </div>
      </div>
    </div>
  )
}

// @todo: implement search. On press, there should be a loading animation
// Find the best way to handle searching with the backend
const SearchBar = (props: any) => {
  const { search, setSearch } = props
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search jobs, companies, and more..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={styles.searchButton}>
        <AiOutlineSearch size={18}/>
        <button
          type="button"
          onClick={() => alert('search')}
        >
          Search
        </button>
      </div>
    </div>
  )
}
