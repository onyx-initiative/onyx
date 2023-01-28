import React, { useEffect, useState } from 'react'
import Navbar from '../src/components/general/Navbar'
import Filter from '../src/sections/jobs/Filter'
import styles from '../styles/components/Jobs.module.css'
import { job_type, Job } from '../../backend/src/types/db.types'
import ListedJobs from '../src/sections/jobs/ListedJobs'

// To ensure unauthenticated people don't access
import getServerProps from "../src/utils/getServerProps";
import SearchBar from '../src/components/jobs/SearchBar'
import { GET_JOBS, SEARCH_JOBS } from '../graphql/queries/jobQueries'
import { useLazyQuery, useQuery } from '@apollo/client'
import loading from '../src/assets/loading.svg'
import Image from 'next/image'

import { useRouter } from "next/router"


// Design Ref: https://dribbble.com/shots/19880852-Jobite-Freelancing-Marketplace

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
  location: string[];
  job_type: {
    full_time: boolean;
    part_time: boolean;
    internship: boolean;
    new_grad: boolean;
  };
  applicant_year: number[];
  sort: sort;
  tags: string[];
}

//@todo: fix filtering, add side menu, bookmarking, and fix double click to search
export default function Jobs() {
  const router = useRouter()
  const { query } = router
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    location: ['Toronto', 'New York', 'London'],
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
    location: [],
    job_type: {
      full_time: false,
      part_time: false,
      internship: false,
      new_grad: false
    },
    applicant_year: [],
    sort: sort.Newest,
    tags: []
  } as selected)

  // @todo: Add call to the api to get the jobs
  const [jobs, setJobs] = useState([])
  const { data: jobData, loading: jobLoading } = useQuery(GET_JOBS)

  useEffect(() => {
    if (!jobLoading) {
      if (!query.search) {
        setJobs(jobData?.getJobs)
      }
    }
    // Ignore, this is intentional
  }, [jobData, jobLoading])

  return (
    <div>
      <Navbar />
      <div className={styles.jobContainer}>
        <Filter 
          filters={filters} 
          setFilters={setFilters} 
          selected={selected} 
          setSelected={setSelected}
          setJobs={setJobs}
        />
        <div className={styles.jobList}>
          <SearchBar setJobs={setJobs} initialQuery={query.search as string} query={search} setSearch={setSearch}/>
          {jobLoading ? 
            <div className={styles.loading}>
              <Image src={loading} alt="Loading..." width={80} height={80}/>
            </div> : 
            <ListedJobs jobs={jobs} />
          }
        </div>
      </div>
    </div>
  )
}

export { getServerProps };
