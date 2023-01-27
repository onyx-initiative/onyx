import React from 'react'
import JobSnippet from '../scholar/JobSnippet'
import { job_type, Job } from '../../../../backend/src/types/db.types';
import styles from '../../../styles/components/AllEmployers.module.css';
import { IoLocationSharp } from "react-icons/io5";



function EmployerJobList(props: any) {
    const { jobs } = props
    const jobList = jobs.map((job: Job) => <JobBlock job={job}/> )


    return (
       <div>
           {jobList}
       </div>
    )
}

export default EmployerJobList


export function JobBlock(props: any) {
    return(
        <div className={styles.jobBlockContainer}>
            <h3 className={styles.title}>{props.job.title}</h3>
            <div className={styles.additionalInfo}>
                <IoLocationSharp size={20} color='gray' />
                <h5>{props.job.location} | {props.job.job_type} | Deadline: {props.job.deadline.toDateString()} </h5>
                
            </div>
            
           
        </div>
    )
    
}

