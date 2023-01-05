import React, { useState } from 'react'
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

const sampleJob = [{
  job_id: '123',
  employer_id: '123',
  admin_id: '123',
  title: 'Software Engineer',
  description: "This is a sample job description for a software engineer in Toronto. Please visit www.mckinsey.com/careers to apply.",
  job_type: 'Full Time',
  location: 'Toronto, ON',
  applicant_year: [2023, 2024],
  deadline: new Date(),
  total_views: 0,
  tags: ['Software', 'Engineering', 'Internship'],
}]

export default function ListedJobs(props: ListedJobsProps) {
  const { jobs } = props;
  const [activePage, setPage] = useState(1);
  // @todo: Bookmarked will need to be an object corresponding to the job id
  const [bookmarked, setBookmarked] = useState(false);

  // @todo: This should be changed when the backend is called
  // The current jobs variable should be cleared and then the new jobs should be added
  // with loading corresponding to those states
  const [loading, setLoading] = useState(false);
  const jobsPerPage = 8;

  // Uncomment this when backend is connected
  // const numPages = loading ? 1 : Math.ceil(jobs.length / jobsPerPage);
  const numPages = 2

  if (loading) {
    return (
      <div className={styles.loading}>
        <Image src={loading_svg} alt="Loading..." width={100} height={100}/>
        <h1>Loading...</h1>
      </div>
    )
  }

  // @todo: Map over the job object and add ability to switch pages
  return (
    <div className={styles.cardContainer}>
      {/* For the job listing */}
      <div className={styles.job}>
        <JobCard job={sampleJob[0]} bookmarked={bookmarked} setBookmarked={setBookmarked} />
      </div>
      {/* For the pages */}
      <div>
        {/* <Pagination 
          page={activePage} 
          onChange={setPage} 
          total={numPages} 
          color="gray"
        /> */}
      </div>
    </div>
  )
}

// Move to separate components file
const JobCard = (props: any) => {
  const { job, bookmarked, setBookmarked } = props;
  const [opened, setOpened] = useState(false);

  // @todo: Add a call to get the employer name based on the id
  // const company = GET_EMPLOYER_BY_ID(employer_id);
  const company = 'McKinsey & Company';

  return (
    <div className={styles.jobCard}
      onClick={() => setOpened(!opened)}
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
        <Bookmarked bookmarked={bookmarked} setBookmarked={setBookmarked} />
      </div>
      <div className={styles.jobCardBody}>
        <h4>{'Targetted Years: ' + job.applicant_year}</h4>
        <p>{job.description}</p>
      </div>
      <div className={styles.jobTags}>
        {job.tags.map((tag: string) => Tag(tag))}
      </div>
      <p className={styles.deadline}>{'Deadline: ' + job.deadline.toDateString()}</p>
      <Drawer
        opened={opened}
        onClose={() => setOpened(!opened)}
        title="Register"
        padding="xl"
        size="xl"
        position='right'
      >
        <h1>Sample</h1>
      </Drawer>
    </div>
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
  const { bookmarked, setBookmarked } = props;
  return (
    <button 
      className={styles.bookmarkContainer}
      onClick={() => setBookmarked(!bookmarked)}
    >
      {bookmarked ? <FaBookmark size={24} color='#806E53' /> : <FaRegBookmark size={24} color='gray' />}
    </button>
  )
}
