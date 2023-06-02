import React, { useEffect, useState } from 'react'
import Navbar from '../src/components/general/Navbar'
import Filter from '../src/sections/jobs/Filter'
import styles from '../styles/components/Jobs.module.css'
import { job_type, Job } from '../../backend/src/types/db.types'
import ListedJobs from '../src/sections/jobs/ListedJobs'

// To ensure unauthenticated people don't access
import getServerProps from "../src/utils/getServerProps";
import SearchBar from '../src/components/jobs/SearchBar'
import { GET_JOBS, GET_LOCATIONS, SEARCH_JOBS } from '../graphql/queries/jobQueries'
import { useLazyQuery, useQuery } from '@apollo/client'
import loading from '../src/assets/loading.svg'
import Image from 'next/image'

import { useRouter } from "next/router"
import { GET_EMPLOYERS } from '../graphql/queries/employerQueries'


// Design Ref: https://dribbble.com/shots/19880852-Jobite-Freelancing-Marketplace

export type filters = {
  location: string[];
  job_type: job_type[];
  applicant_year: number[];
  sort: "Newest" | "Oldest";
  tags: string[];
}

// @todo: Figure out how to handle the toggling
export type selected = {
  location: string;
  job_type: {
    full_time: boolean;
    part_time: boolean;
    internship: boolean;
    new_grad: boolean;
  };
  applicant_year: number[];
  sort: "Newest" | "Oldest";
  tags: string[];
}

type location = {
  location: string;
}

//@todo: fix filtering, add side menu, bookmarking, and fix double click to search
export default function Jobs() {
  const router = useRouter()
  const { query } = router
  const [search, setSearch] = useState('')
  const [jobs, setJobs] = useState([])
  const { data: jobData, loading: jobLoading } = useQuery(GET_JOBS)
  const { data: locationData, loading: locationLoading } = useQuery(GET_LOCATIONS)
  const {data: employerData, loading: loadingEmployers } = useQuery(GET_EMPLOYERS)

  const [filters, setFilters] = useState({
    // @todo: Update this list
    location: [],
    job_type: [],
    applicant_year: [
      new Date().getFullYear(),
      new Date().getFullYear() + 1,
      new Date().getFullYear() + 2,
      new Date().getFullYear() + 3,
      new Date().getFullYear() + 4,
    ],
    sort: "Newest",
    tags: []
  } as filters)
  const [selected, setSelected] = useState({
    location: "",
    job_type: {
      full_time: false,
      part_time: false,
      internship: false,
      new_grad: false
    },
    applicant_year: [],
    sort: "Newest",
    tags: []
  } as selected)

  useEffect(() => {
    if (!jobLoading) {
      if (!query.search) {
        setJobs(jobData?.getJobs)
      }
    }
    // Ignore, this is intentional
  }, [jobData, jobLoading])

  useEffect(() => {
    if (!locationLoading) {
      setFilters((prev) => ({ ...prev, location: getUniqueLocations(locationData?.getJobs) }))
    }
  }, [locationData, locationLoading])

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
            <div style={{ width: "100%", marginBottom: 0}}>
            <p style={{ marginBottom: "-15px", padding: 0, color: "grey" }}>{jobs.length + " result(s)"}</p>
            <ListedJobs jobs={jobs} employerData={employerData}/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

const getUniqueLocations = (locations: location[]) => {
  const uniqueLocations: any = []
  for (let i = 0; i < locations.length; i++) {
    if (!uniqueLocations.includes(locations[i].location.trim())) {
      uniqueLocations.push(locations[i].location.trim())
    }
  }
  return uniqueLocations
}

export { getServerProps };
