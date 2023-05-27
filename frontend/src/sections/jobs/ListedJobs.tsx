import React, { useState, useEffect, useMemo } from 'react'
import { Select, Pagination, Slider, RangeSlider, Drawer } from '@mantine/core';
import { DatePicker, DateRangePicker } from '@mantine/dates';
import { Job } from '../../../../backend/src/types/db.types';
import styles from '../../../styles/components/Jobs.module.css'
import loading_svg from '../../assets/loading.svg';
import Image from 'next/image';
import { IoLocationSharp } from "react-icons/io5";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_EMPLOYER_BY_ID } from '../../../graphql/queries/employerQueries';
import JobCard from '../../components/jobs/JobCard';


type ListedJobsProps = {
    jobs: Job[];
    employerData: any;
}

type Bookmarks = {
    [key: string]: boolean;
}

export default function ListedJobs(props: ListedJobsProps) {
  const { jobs, employerData } = props;
  const [activePage, setPage] = useState(1);

  // @todo: This should be changed when the backend is called
  // The current jobs variable should be cleared and then the new jobs should be added
  // with loading corresponding to those states
  const [loading, setLoading] = useState(false);

  // @todo: Change this to 10 for production
  const jobsPerPage = 4;

  // Uncomment this when backend is connected
  const numPages = loading ? 1 : Math.ceil(jobs.length / jobsPerPage);

  // The jobs to display beased on the current page
  const display = jobs.slice((activePage - 1) * jobsPerPage, activePage * jobsPerPage);

  if (loading) {
    return (
      <div className={styles.loading}>
        <Image src={loading_svg} alt="Loading..." width={100} height={100}/>
        <h1>Loading...</h1>
      </div>
    )
  }

  // @todo: Map over the job object and add ability to switch pages
  // @todo: fix bookmarking and make it so it doesnt slow down the page
  return (
    <div className={styles.cardContainer}>
      {/* For the job listing */}
      <div className={styles.job}>
        {display.map((job: any, index: number) => {
          return (
              <JobCard key={index} job={job} email={false} employerData={employerData}/>
          )
        })}
      </div>
      {/* For the pages */}
      <div>
        <Pagination 
          page={activePage} 
          onChange={setPage} 
          total={numPages} 
          color="gray"
        />
      </div>
    </div>
  )
}

const formatYears = (years: string[]) => {
  let formattedYears: string = '';
  const currentYear = new Date().getFullYear();
  for (let i = 0; i < years.length; i++) {
    if (i === years.length - 1) {
      formattedYears += (currentYear +parseInt(years[i]));
    } else {
      formattedYears += (currentYear +parseInt(years[i])) + ', ';
    }
  }
  return formattedYears;
}