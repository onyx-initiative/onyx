import React, { useState, useEffect, useMemo } from 'react'
import { Select, Pagination, Slider, RangeSlider, Drawer } from '@mantine/core';
import { DatePicker, DateRangePicker } from '@mantine/dates';
import { Job } from '../../../../backend/src/types/db.types';
import styles from '../../../styles/components/Jobs.module.css'
import loading_svg from '../../assets/loading_svg.svg';
import Image from 'next/image';
import { IoLocationSharp } from "react-icons/io5";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

type ListedJobsProps = {
    jobs: Job[];
}

type Bookmarks = {
    [key: string]: boolean;
}

export default function ListedJobs(props: ListedJobsProps) {
  const { jobs } = props;
  const [activePage, setPage] = useState(1);

  // @todo: This should be changed when the backend is called
  // The current jobs variable should be cleared and then the new jobs should be added
  // with loading corresponding to those states
  const [loading, setLoading] = useState(false);

  // @todo: Change this to 10 for production
  const jobsPerPage = 1;

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
        {display.map((job: any) => {
          return (
            <JobCard 
              job={job} 
              key={job.job_id}
            />
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

// Move to separate components file
const JobCard = (props: any) => {
  const { job } = props;
  const [bookmarked, setBookmarked] = useState(false);
  const [opened, setOpened] = useState(false);
  const [logo, setLogo] = useState('');

  // @todo: Add a call to get the employer name based on the id
  // const company = GET_EMPLOYER_BY_ID(employer_id);
  const company = 'McKinsey & Company';

  // @todo: Add a call to get the employer website
  // let website = GET_EMPLOYER_WEBSITE(job.employer_id);
  let website = 'https://www.mckinsey.com/careers';
  website = removeProtocol(website)

  // @todo: this should store the logo in the database if not already there
  const fetchLogo = () => {
    fetch(`https://api.brandfetch.io/v2/brands/${website}`, {
      "method": "GET",
      "headers": {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_LOGO_API_KEY}`
      }
  })
  .then(response => response.json()).then(resp => setLogo(resp['logos'][0]['formats'][0]['src']))
  .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchLogo();
    console.log(logo)
  }, [job])

  return (
    <>
    <div className={styles.jobCard}>
      <div className={styles.jobCardHeader}>
        <Image 
          onClick={() => setOpened(!opened)}
          src={logo}
          alt="Company Logo"
          width={60}
          height={60}
        />
        <div className={styles.jobHeader}
          onClick={() => setOpened(!opened)}
        >
          <h3>{job.title}</h3>
          <div className={styles.additionalInfo}>
            <IoLocationSharp size={16} color='gray' />
            <h6>{job.location} • {job.job_type}</h6>
          </div>
        </div>
        <Bookmarked bookmarked={bookmarked} setBookmarked={setBookmarked} job_id={job.job_id} />
      </div>
      <div className={styles.jobCardBody}
        onClick={() => setOpened(!opened)}
      >
        <h4>{'Targetted Years: ' + job.applicant_year}</h4>
        <p>{job.description}</p>
      </div>
      <div className={styles.jobTags}>
        {job.tags.map((tag: string) => Tag(tag))}
      </div>
      <p className={styles.deadline}>{'Deadline: ' + job.deadline.toDateString()}</p>
    </div>
    {/* @todo: add other necessary info */}
    <Drawer
        opened={opened}
        onClose={() => setOpened(!opened)}
        padding="xl"
        size="30%"
        position='right'
      >
        <div className={styles.jobCardHeader}>
        <Image 
          src="https://media.licdn.com/dms/image/C560BAQHP1XsqU9L_XQ/company-logo_200_200/0/1656621713859?e=1680739200&v=beta&t=w9XMy8bqM8H4k_mdmvbaF_tI477gZ7HprwXLkRB2EhQ"
          alt="Company Logo"
          width={60}
          height={60}
        />
        <div className={styles.jobHeader}>
          <h3>{job.title}</h3>
          <div className={styles.additionalInfo}>
            <IoLocationSharp size={16} color='gray' />
            <h6>{job.location} • {job.job_type}</h6>
          </div>
        </div>
      </div>
      </Drawer>
    </>
  )
}

// @todo: Add logic so if there's more than x #, it renders +total - x more
const Tag = (tag: string) => {
  return (
    <div className={styles.tag}>
      {tag}
    </div>
  )
}

const Bookmarked = (props: any) => {
  const { bookmarked, setBookmarked, job_id } = props;
  return (
    <button 
      className={styles.bookmarkContainer}
      onClick={() => {
        // @todo: This should create a relation in the favourites table of the db
        setBookmarked(!bookmarked)
      }}
    >
      {bookmarked ? <FaBookmark size={24} color='#806E53' /> : <FaRegBookmark size={24} color='gray' />}
    </button>
  )
}

// Helper regex 
const removeProtocol = (url: string) => {
  const match = /https?:\/\/([\w.-]+)/i.exec(url);
  if (match) {
    return match[1];
  } else {
    return "";
  }
}