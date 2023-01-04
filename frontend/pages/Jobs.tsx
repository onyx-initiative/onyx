import React, { useState } from 'react'
import Navbar from '../src/components/general/Navbar'
import Filter from '../src/sections/jobs/Filter'
import styles from '../styles/components/Jobs.module.css'
import { job_type } from '../../backend/src/types/db.types'

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
      </div>
    </div>
  )
}
