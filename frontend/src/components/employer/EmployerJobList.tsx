import React from 'react'
import JobSnippet from '../scholar/JobSnippet'
import { job_type, Job } from '../../../../backend/src/types/db.types';
import styles from '../../../styles/components/AllEmployers.module.css';
import { IoLocationSharp } from "react-icons/io5";
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client';
import { GET_EMPLOYER_BY_ID } from '../../../graphql/queries/employerQueries';


type EmployerJobList = {
    jobs: Job[]
}

function EmployerJobList(props: EmployerJobList) {
    const { jobs } = props
    // console.log(jobs)
    const employersJobs = jobs?.map((job: Job) => <div key={job.job_id}><JobBlock job={job} /></div> )


    return (
       <div className={styles.employerJobList}>
           {employersJobs}
       </div>
    )
}

export default EmployerJobList


export function JobBlock(props: any) {
    const {job} = props
    const router = useRouter()

    const {data: employer_name, loading, error: queryError} = useQuery(GET_EMPLOYER_BY_ID, {variables: {
        employerId: job.employer_id
    }})

    return(
        <button className={styles.employerJobButton} onClick={() => {
            router.push({
              pathname: '/Jobs',
              query: { search: employer_name.getEmployerById.name },
            })
        }}>
                <h3 className={styles.title}>{props.job.title}</h3>
                <div className={styles.additionalInfo}>
                    <IoLocationSharp size={20} color='gray' />
                    <h5>{job.location} | {job.job_type} | Deadline: {new Date(parseInt(job.deadline)).toDateString()}  </h5>
                </div>
                <div className={styles.jobTags}>
                        {job.tags.map((tag: string) => Tag(tag))}
                </div>
        </button>
                
            
    )
    
}

const Tag = (tag: string) => {
    return (
      <div className={styles.tag}>
        {tag}
      </div>
    )
  }

