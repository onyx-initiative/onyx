import React, { useEffect, useState } from 'react'
import Navbar from '../src/components/general/Navbar'
import Filter from '../src/sections/jobs/Filter'
import styles from '../styles/components/Jobs.module.css'
import { job_type, Job } from '../../backend/src/types/db.types'
import { AiOutlineSearch } from "react-icons/ai";
import ListedJobs from '../src/sections/jobs/ListedJobs'

// To ensure unauthenticated people don't access
import getServerProps from "../src/utils/getServerProps";
import SearchBar from '../src/components/jobs/SearchBar'
import { GET_JOBS } from '../graphql/queries/jobQueries'
import { useQuery } from '@apollo/client'


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
  location: string;
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
      setJobs(jobData?.getJobs)
    }
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
        />
        <div className={styles.jobList}>
          <SearchBar setJobs={setJobs}/>
          {jobLoading ? <div>Loading...</div> : <ListedJobs jobs={jobs} />}
        </div>
      </div>
    </div>
  )
}

// Sample data
const sampleJob: Job[] = [
  {
    job_id: '123',
    employer_id: '123',
    admin_id: '123',
    title: 'Software Engineer',
    description: "This is a sample job description for a software engineer in Toronto. Please visit www.mckinsey.com/careers to apply.",
    job_type: 'Full Time',
    location: 'Toronto, ON',
    applicant_year: [2023, 2024],
    deadline: new Date(),
    date_posted: new Date(),
    total_views: 0,
    tags: ['Software', 'Engineering', 'Internship', 'DevOps', 'Backend'],
    live: true,
  },
  {
    job_id: '456',
    employer_id: '456',
    admin_id: '456',
    title: 'Business Analyst',
    description: "This is a sample job description for a software engineer in Toronto. Please visit www.mckinsey.com/careers to apply.",
    job_type: 'Full Time',
    location: 'Toronto, ON',
    applicant_year: [2023, 2024],
    deadline: new Date(),
    date_posted: new Date(),
    total_views: 0,
    tags: ['Software', 'Engineering', 'Internship', 'DevOps', 'Backend'],
    live: true,
  },
]

export { getServerProps };
