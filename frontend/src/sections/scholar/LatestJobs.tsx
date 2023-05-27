import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/components/LatestJobs.module.css'
import JobSnippet from '../../components/scholar/JobSnippet';
import { GET_NEW_JOBS } from '../../../graphql/queries/jobQueries';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import loading from '../../assets/loading.svg'
import { Job } from '../../../../backend/src/types/db.types';
import JobCard from '../../components/jobs/JobCard';

// Icon website: https://react-icons.github.io/react-icons

export default function LatestJobs(props: any) {
    const { data: jobData, loading: jobsLoading, error } = useQuery(GET_NEW_JOBS)
    const { employerData } = props

    // console.log(jobData)

    if (jobsLoading || error || !jobData) {
        return (
            <div className={styles.loading}>
                <Image
                    src={loading}
                    alt="Loading"
                    width={100}
                    height={100}
                />
        </div>
        )
    }

    return (
        <div className={styles.jobContainer}>
            <h2>Latest Jobs</h2>
            {jobData.getNewJobs.map((job: Job, index: number) => {
                return (
                    <JobCard job={job} email={false} key={index} employerData={employerData}/>
                )
            })}
        </div>
    )
}