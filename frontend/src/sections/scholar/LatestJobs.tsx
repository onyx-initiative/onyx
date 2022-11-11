import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/components/LatestJobs.module.css'
import JobSnippet from '../../components/scholar/JobSnippet';

// Icon website: https://react-icons.github.io/react-icons

export default function LatestJobs() {
    const jobs = sampleData.map(job => {
        return (
            <JobSnippet 
                logo={job.logo}
                positionTitle={job.positionTitle}
                companyName={job.companyName}
                location={job.location}
                type={job.type}
                deadline={job.deadline}
            />
        )
    })


  return (
    <div className={styles.jobContainer}>
        <h2>Latest Jobs</h2>
        {jobs}
    </div>
  )
}

const sampleData = [
    {
        logo: 'https://1000logos.net/wp-content/uploads/2018/10/RBC-Logo-500x281.png',
        positionTitle: 'Software Engineer',
        companyName: 'RBC',
        location: 'Toronto, ON',
        type: 'Full Time',
        deadline: '2021-12-31'
    },
    {
        logo: 'https://1000logos.net/wp-content/uploads/2018/10/RBC-Logo-500x281.png',
        positionTitle: 'Software Engineer',
        companyName: 'RBC',
        location: 'Toronto, ON',
        type: 'Full Time',
        deadline: '2021-12-31'
    },
    {
        logo: 'https://1000logos.net/wp-content/uploads/2018/10/RBC-Logo-500x281.png',
        positionTitle: 'Software Engineer',
        companyName: 'RBC',
        location: 'Toronto, ON',
        type: 'Full Time',
        deadline: '2021-12-31'
    },
    {
        logo: 'https://1000logos.net/wp-content/uploads/2018/10/RBC-Logo-500x281.png',
        positionTitle: 'Software Engineer',
        companyName: 'RBC',
        location: 'Toronto, ON',
        type: 'Full Time',
        deadline: '2021-12-31'
    },
]
