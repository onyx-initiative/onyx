import React from 'react'
import JobSnippet from '../scholar/JobSnippet'
import { job_type, Job } from '../../../../backend/src/types/db.types';
import styles from '../../../styles/components/AllEmployers.module.css';
import { IoLocationSharp } from "react-icons/io5";
import Link from 'next/link';


type EmployerJobList = {
    jobs: Job[]
}

function EmployerJobList(props: EmployerJobList) {
    const { jobs } = props
    console.log(jobs)
    const employersJobs = jobs.map((job: Job, index: number) => <JobBlock job={job} key={index}/> )


    return (
       <div className={styles.employerJobList}>
           {employersJobs}
       </div>
    )
}

export default EmployerJobList


export function JobBlock(props: any) {
    const {job} = props
    return(
        <Link href="">
        <div className={styles.jobBlockContainer}>
            <h3 className={styles.title}>{props.job.title}</h3>
            <div className={styles.additionalInfo}>
                    <IoLocationSharp size={20} color='gray' />
                    <h5>{job.location} | {job.job_type} | Deadline: {new Date(parseInt(job.deadline)).toDateString()}  </h5>
            </div>
            <div className={styles.jobTags}>
                    {job.tags.map((tag: string) => Tag(tag))}
            </div>
        </div>
        </Link>
                
            
    )
    
}

const Tag = (tag: string) => {
    return (
      <div className={styles.tag}>
        {tag}
      </div>
    )
  }

