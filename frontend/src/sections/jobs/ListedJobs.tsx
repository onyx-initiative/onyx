import React, { useState } from 'react'
import { Select, Pagination, Slider, RangeSlider, Drawer } from '@mantine/core';
import { DatePicker, DateRangePicker } from '@mantine/dates';
import { Job } from '../../../../backend/src/types/db.types';
import styles from '../../../styles/components/Jobs.module.css'
import loading_svg from '../../assets/loading_svg.svg';
import Image from 'next/image';

type ListedJobsProps = {
    jobs: Job[];
}

export default function ListedJobs(props: ListedJobsProps) {
  const { jobs } = props;
  const [activePage, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const jobsPerPage = 8;

  const numPages = loading ? 1 : Math.ceil(jobs.length / jobsPerPage);

  if (loading) {
    return (
      <div className={styles.loading}>
        <Image src={loading_svg} alt="Loading..." width={100} height={100}/>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div>
      {/* For the job listing */}
      <div>

      </div>
      {/* For the pages */}
      <div>
        <Pagination 
          page={activePage} 
          onChange={setPage} 
          total={numPages} 
          color="#806E53"
        />
      </div>
    </div>
  )
}

// Move to separate components file
