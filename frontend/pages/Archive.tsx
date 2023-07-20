import React, { useEffect, useState } from 'react'
import Navbar from '../src/components/general/Navbar'
import Filter from '../src/sections/jobs/Filter'
import styles from '../styles/components/Jobs.module.css'
import { job_type, Job } from '../../backend/src/types/db.types'
import ListedJobs from '../src/sections/jobs/ListedJobs'

// To ensure unauthenticated people don't access
import getServerProps from "../src/utils/getServerProps";
import SearchBar from '../src/components/jobs/SearchBar'
import { VIEW_ARCHIVED_JOBS } from '../graphql/queries/jobQueries'
import { useLazyQuery, useQuery } from '@apollo/client'
import loading from '../src/assets/loading.svg'
import Image from 'next/image'

import { useRouter } from "next/router"
import { GET_EMPLOYERS } from '../graphql/queries/employerQueries'
import BackButton from '../src/components/admin/BackButton'


//@todo: fix filtering, add side menu, bookmarking, and fix double click to search
export default function Jobs() {
  const router = useRouter()
  const { query } = router
  const [search, setSearch] = useState('')
  const [jobs, setJobs] = useState([])
  const { data: jobData, loading: jobLoading } = useQuery(VIEW_ARCHIVED_JOBS)
  const {data: employerData, loading: loadingEmployers } = useQuery(GET_EMPLOYERS)

  useEffect(() => {
    if (!jobLoading) {
      if (!query.search) {
        setJobs(jobData?.viewArchivedJobs)
      }
    }
    // Ignore, this is intentional
  }, [jobData, jobLoading])


  return (
    <div>
      <Navbar />
      <div style={{ marginLeft: 90 }}>
        <BackButton />
      </div>
      <div className={styles.jobContainer}>
        <div className={styles.jobList}>
          
          <SearchBar setJobs={setJobs} initialQuery={query.search as string} query={search} setSearch={setSearch}/>
          {jobLoading ? 
            <div className={styles.loading}>
              <Image src={loading} alt="Loading..." width={80} height={80}/>
            </div> : 
            <div style={{ width: "100%", marginBottom: 0}}>
            <p style={{ marginBottom: "-15px", padding: 0, color: "grey" }}>{jobs.length + " result(s)"}</p>
            <ListedJobs jobs={jobs} employerData={employerData} archive={true}/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export { getServerProps };
